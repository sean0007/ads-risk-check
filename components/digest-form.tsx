"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import { readLocalDigest, rememberLocalDigest } from "@/lib/digest";

type Status = "idle" | "loading" | "ok" | "error";

const LOCAL_CHANGE = "ads-risk-digest";

function subscribe(onStoreChange: () => void) {
  window.addEventListener(LOCAL_CHANGE, onStoreChange);
  return () => window.removeEventListener(LOCAL_CHANGE, onStoreChange);
}

function getLocalCount() {
  return readLocalDigest(window.localStorage).length;
}

export function DigestForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const localCount = useSyncExternalStore(subscribe, getLocalCount, () => 0);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") ?? "");
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/digest", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        mode?: string;
        error?: string;
      };
      if (!response.ok || !payload.ok) {
        setStatus("error");
        setMessage(payload.error ?? "Could not save that email.");
        return;
      }
      if (payload.mode === "local") {
        rememberLocalDigest(window.localStorage, email.trim().toLowerCase());
        window.dispatchEvent(new Event(LOCAL_CHANGE));
        setStatus("ok");
        setMessage("Saved locally in this browser only. Nothing was stored on our server.");
        form.reset();
        return;
      }
      setStatus("ok");
      setMessage("Sent to the digest webhook. This site does not keep a copy.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Could not reach the server. Nothing was saved.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <label className="sr-only" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="h-12 rounded-full border border-white/15 bg-black/40 px-5 text-sm text-foreground outline-none placeholder:text-muted focus:border-amber"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-12 rounded-full bg-amber px-6 text-sm font-semibold text-black hover:bg-amber/90 disabled:opacity-60"
        >
          {status === "loading" ? "Sending…" : "Save my email"}
        </button>
      </div>
      {message ? (
        <p role="status" className={`text-sm ${status === "error" ? "text-rose-200" : "text-teal-200"}`}>
          {message}
        </p>
      ) : (
        <p className="text-sm text-muted">
          No webhook is required. Without DIGEST_WEBHOOK_URL, the server forgets the address and
          this browser keeps it.
        </p>
      )}
      {localCount && localCount > 0 ? (
        <p className="text-xs text-muted">
          This browser has {localCount} digest {localCount === 1 ? "address" : "addresses"} saved locally.
        </p>
      ) : null}
    </form>
  );
}
