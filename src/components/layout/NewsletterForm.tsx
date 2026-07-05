"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { HiArrowLongRight, HiCheck } from "react-icons/hi2";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
  const t = useTranslations("footer");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setError(true);
      return;
    }
    setError(false);
    setDone(true);
  };

  if (done) {
    return (
      <p className="flex items-center gap-2 text-sm text-gold-soft">
        <HiCheck /> {t("newsletterButton")} — {email}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="group relative max-w-sm" noValidate>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("newsletterPlaceholder")}
        aria-label={t("newsletterPlaceholder")}
        aria-invalid={error}
        className="w-full border-b border-line bg-transparent py-3 pe-10 text-sm text-bone placeholder:text-bone-faint focus:border-gold focus:outline-none"
      />
      <button
        type="submit"
        aria-label={t("newsletterButton")}
        className="absolute end-0 top-1/2 -translate-y-1/2 text-bone-dim transition-colors hover:text-gold"
      >
        <HiArrowLongRight className="text-xl rtl:rotate-180" />
      </button>
    </form>
  );
}
