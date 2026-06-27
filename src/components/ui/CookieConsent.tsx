"use client";

import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-xl rounded-xl border border-border bg-surface p-4 shadow-lg">
      <p className="text-sm text-muted">
        This site uses cookies for analytics and essential functionality. By
        continuing, you agree to our use of cookies.
      </p>
      <div className="mt-3 flex gap-3">
        <button
          onClick={accept}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
        >
          Accept
        </button>
        <button
          onClick={accept}
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-alt"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
