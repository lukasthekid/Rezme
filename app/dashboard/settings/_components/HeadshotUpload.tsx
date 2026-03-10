"use client";

import { useState, useEffect } from "react";
import { Loader2, Trash2, Camera } from "lucide-react";

type HeadshotUploadProps = {
  userName?: string | null;
};

const ACCEPT = "image/jpeg,image/png,image/webp";
const MAX_MB = 2;

export function HeadshotUpload({ userName }: HeadshotUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasHeadshot, setHasHeadshot] = useState<boolean | null>(null);
  const [imageVersion, setImageVersion] = useState(0);

  const headshotUrl = "/api/profile/headshot";

  useEffect(() => {
    let cancelled = false;
    fetch(headshotUrl, { method: "GET" })
      .then((res) => {
        if (!cancelled) setHasHeadshot(res.ok);
      })
      .catch(() => {
        if (!cancelled) setHasHeadshot(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_MB * 1024 * 1024) {
      setError(`Image too large (max ${MAX_MB}MB).`);
      return;
    }

    const mime = file.type;
    if (
      !["image/jpeg", "image/png", "image/webp"].includes(mime)
    ) {
      setError("Invalid format. Use JPG, PNG, or WebP.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const form = new FormData();
      form.append("image", file);

      const res = await fetch(headshotUrl, {
        method: "POST",
        body: form,
      });

      const json = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

      if (!res.ok || !json?.ok) {
        setError(json?.error ?? `Upload failed (HTTP ${res.status}).`);
        return;
      }

      setHasHeadshot(true);
      setImageVersion((v) => v + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      (e.target as HTMLInputElement).value = "";
    }
  };

  const handleRemove = async () => {
    if (!window.confirm("Remove your resume photo?")) return;

    setRemoving(true);
    setError(null);

    try {
      const res = await fetch(headshotUrl, { method: "DELETE" });
      const json = (await res.json().catch(() => null)) as { ok?: boolean } | null;

      if (!res.ok || !json?.ok) {
        setError("Failed to remove photo.");
        return;
      }

      setHasHeadshot(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove.");
    } finally {
      setRemoving(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start gap-6 pb-6 border-b border-border">
      <div className="flex-shrink-0">
        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-slate-100 border-2 border-border flex items-center justify-center">
          {hasHeadshot === null ? (
            <Loader2 className="h-8 w-8 text-foreground-muted animate-spin" />
          ) : hasHeadshot ? (
            <img
              src={`${headshotUrl}?v=${imageVersion}`}
              alt="Your photo"
              className="w-full h-full object-cover"
              onError={() => setHasHeadshot(false)}
            />
          ) : (
            <span className="text-2xl font-semibold text-foreground-muted">
              {userName?.charAt(0)?.toUpperCase() ?? "?"}
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 min-w-0 space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Resume Photo</h3>
        <p className="text-xs text-foreground-muted">
          Used on European-style resumes. Cropped to 1:1, max {MAX_MB}MB.
        </p>

        <div className="flex flex-wrap gap-2">
          <label className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary-hover px-4 py-2 text-sm font-medium text-white cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transition-all">
            <input
              type="file"
              accept={ACCEPT}
              onChange={handleFileInput}
              disabled={uploading}
              className="sr-only"
            />
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Camera className="h-4 w-4" />
                Upload Photo
              </>
            )}
          </label>

          {hasHeadshot === true && (
            <button
              type="button"
              onClick={handleRemove}
              disabled={removing || uploading}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface hover:bg-slate-50 px-4 py-2 text-sm font-medium text-foreground-muted hover:text-red-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {removing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
              Remove
            </button>
          )}
        </div>

        {error && (
          <p className="text-xs text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
}
