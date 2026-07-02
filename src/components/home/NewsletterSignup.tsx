"use client";

import { useState, FormEvent } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Subscription failed. Please try again.");
        setStatus("error");
      }
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-foreground">
          Get the good stuff in your inbox
        </h2>
        <p className="mt-2 text-muted">
          Weekly tips, real talk about money, and exclusive content you won&apos;t
          find on the blog.
        </p>

        {status === "success" ? (
          <p className="mt-6 text-lg font-semibold text-foreground">
            You&apos;re in! Check your inbox for a confirmation.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-hidden"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-xs transition-all hover:bg-primary-dark hover:shadow-md disabled:opacity-50"
            >
              {status === "loading" ? "Subscribing..." : "Join Free"}
            </button>
          </form>
        )}

        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
        {status !== "success" && (
          <p className="mt-3 text-xs text-muted">
            No spam, ever. Unsubscribe anytime.
          </p>
        )}
      </div>
    </section>
  );
}
