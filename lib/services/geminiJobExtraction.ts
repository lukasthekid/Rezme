import { ApiError, GoogleGenAI, Type } from "@google/genai";

import { SYSTEM_PROMPT, USER_PROMPT } from "@/config/prompts";

const DEFAULT_MODEL = "gemini-2.5-flash-lite";
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1_500;
const MAX_JITTER_MS = 500;

const RETRYABLE_STATUS_CODES = new Set([429, 500, 502, 503, 504]);

/** Matches the seven fields in `types/jobPosting.ts` (SDK-enforced JSON shape). */
const JOB_POSTING_RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    company_name: { type: Type.STRING },
    company_logo: { type: Type.STRING },
    job_title: { type: Type.STRING },
    location_city: { type: Type.STRING },
    country: { type: Type.STRING },
    number_of_applicants: { type: Type.INTEGER },
    job_description: { type: Type.STRING },
  },
  required: [
    "company_name",
    "company_logo",
    "job_title",
    "location_city",
    "country",
    "number_of_applicants",
    "job_description",
  ],
};

export class GeminiJobExtractionError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly responseBody?: string,
  ) {
    super(message);
    this.name = "GeminiJobExtractionError";
  }

  get isRateLimited(): boolean {
    return this.statusCode === 429;
  }

  get isRetryable(): boolean {
    if (this.statusCode === 0) return true;
    return RETRYABLE_STATUS_CODES.has(this.statusCode);
  }
}

function getApiKey(): string {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error("GEMINI_API_KEY environment variable is not set.");
  }
  return key;
}

function toExtractionError(error: unknown): GeminiJobExtractionError {
  if (error instanceof GeminiJobExtractionError) return error;
  if (error instanceof ApiError) {
    return new GeminiJobExtractionError(
      error.message,
      error.status,
      error.message,
    );
  }
  if (error instanceof Error) {
    return new GeminiJobExtractionError(error.message, 0);
  }
  return new GeminiJobExtractionError(String(error), 0);
}

function computeBackoff(attempt: number): number {
  const exponential = BASE_DELAY_MS * Math.pow(2, attempt);
  const jitter = Math.random() * MAX_JITTER_MS;
  return exponential + jitter;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Call Gemini once: prefer thinking disabled (`thinkingBudget: 0`). If the API
 * rejects thinking settings for this model, retry the same request without `thinkingConfig`.
 */
async function generateJobPostingJsonOnce(
  ai: GoogleGenAI,
  model: string,
  userText: string,
): Promise<string> {
  const baseConfig = {
    systemInstruction: SYSTEM_PROMPT,
    temperature: 0,
    responseMimeType: "application/json" as const,
    responseSchema: JOB_POSTING_RESPONSE_SCHEMA,
    httpOptions: { timeout: 60_000 },
  };

  const run = async (includeThinking: boolean) => {
    const response = await ai.models.generateContent({
      model,
      contents: userText,
      config: {
        ...baseConfig,
        ...(includeThinking ? { thinkingConfig: { thinkingBudget: 0 } } : {}),
      },
    });
    const text = response.text?.trim();
    if (!text) {
      throw new GeminiJobExtractionError("Empty model response.", 200);
    }
    return text;
  };

  try {
    return await run(true);
  } catch (first) {
    if (first instanceof ApiError && first.status === 429) {
      throw toExtractionError(first);
    }
    try {
      return await run(false);
    } catch (second) {
      throw toExtractionError(second);
    }
  }
}

/**
 * Send cleaned HTML to Gemini and return raw JSON text (seven job-posting fields).
 */
export async function extractJobPostingJson(html: string): Promise<string> {
  const apiKey = getApiKey();
  const model =
    process.env.GEMINI_JOB_MODEL?.trim() || DEFAULT_MODEL;
  const ai = new GoogleGenAI({ apiKey });

  const userText = USER_PROMPT.replace("{HTML_CONTENT}", html);

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await generateJobPostingJsonOnce(ai, model, userText);
    } catch (error) {
      const mapped = toExtractionError(error);

      if (mapped instanceof GeminiJobExtractionError && !mapped.isRetryable) {
        throw mapped;
      }

      lastError = mapped;

      if (attempt < MAX_RETRIES) {
        await sleep(computeBackoff(attempt));
        continue;
      }

      throw mapped;
    }
  }

  throw lastError ?? new GeminiJobExtractionError(
    "Job extraction failed after retries.",
    500,
  );
}
