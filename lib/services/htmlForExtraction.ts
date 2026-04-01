/**
 * Max length of cleaned HTML passed to the job extraction model (cost control).
 * Gemini allows much larger contexts; keeping a cap limits spend on noisy pages.
 */
export const MAX_HTML_LENGTH_FOR_EXTRACTION = 60_000;

/**
 * Final pass on HTML/text already compressed by `fetchHtml`: trim very long blank runs
 * and enforce `MAX_HTML_LENGTH_FOR_EXTRACTION`.
 */
export function prepareHtmlForExtraction(html: string): string {
  const collapsed = html.replace(/\n{4,}/g, "\n\n\n").trim();
  if (collapsed.length <= MAX_HTML_LENGTH_FOR_EXTRACTION) {
    return collapsed;
  }
  return collapsed.slice(0, MAX_HTML_LENGTH_FOR_EXTRACTION);
}
