"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { HiCheckCircle, HiExclamationCircle } from "react-icons/hi2";
import {
  createContactSchema,
  projectTypes,
  type ContactFormValues,
} from "@/lib/validations";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { easeLuxe } from "@/lib/motion";

type Status = "idle" | "submitting" | "success" | "error";

const budgetKeys = ["0", "1", "2", "3"] as const;

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<Status>("idle");

  const schema = createContactSchema({
    nameMin: t("errors.nameMin"),
    emailInvalid: t("errors.emailInvalid"),
    projectType: t("errors.projectType"),
    messageMin: t("errors.messageMin"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      projectType: undefined,
      budget: "",
      message: "",
      company: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: easeLuxe }}
        className="card-luxe flex flex-col items-start gap-6 p-10 md:p-12"
      >
        <HiCheckCircle className="text-5xl text-gold" />
        <div>
          <h3 className="text-h3 text-bone">{t("successTitle")}</h3>
          <p className="mt-3 max-w-md text-bone-dim">{t("successMessage")}</p>
        </div>
        <Button variant="ghost" withArrow onClick={() => setStatus("idle")}>
          {t("sendAnother")}
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-8">
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        {...register("company")}
      />

      <div className="grid gap-8 sm:grid-cols-2">
        <Field label={t("name")} error={errors.name?.message}>
          <input
            type="text"
            placeholder={t("namePlaceholder")}
            className="input-luxe"
            {...register("name")}
          />
        </Field>
        <Field label={t("email")} error={errors.email?.message}>
          <input
            type="email"
            placeholder={t("emailPlaceholder")}
            className="input-luxe"
            {...register("email")}
          />
        </Field>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field label={t("phone")}>
          <input
            type="tel"
            placeholder={t("phonePlaceholder")}
            className="input-luxe"
            dir="ltr"
            {...register("phone")}
          />
        </Field>
        <Field label={t("projectType")} error={errors.projectType?.message}>
          <select
            defaultValue=""
            className="input-luxe"
            {...register("projectType")}
          >
            <option value="" disabled>
              {t("projectTypePlaceholder")}
            </option>
            {projectTypes.map((type) => (
              <option key={type} value={type} className="bg-ink-700">
                {t(`types.${type}`)}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label={t("budget")}>
        <select defaultValue="" className="input-luxe" {...register("budget")}>
          <option value="" disabled>
            {t("budgetPlaceholder")}
          </option>
          {budgetKeys.map((key) => (
            <option key={key} value={t(`budgets.${key}`)} className="bg-ink-700">
              {t(`budgets.${key}`)}
            </option>
          ))}
        </select>
      </Field>

      <Field label={t("message")} error={errors.message?.message}>
        <textarea
          rows={5}
          placeholder={t("messagePlaceholder")}
          className="input-luxe resize-none"
          {...register("message")}
        />
      </Field>

      <AnimatePresence>
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 text-sm text-red-400"
          >
            <HiExclamationCircle /> {t("errorMessage")}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          withArrow
          disabled={status === "submitting"}
          className="disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? t("submitting") : t("submit")}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span
        className={cn(
          "text-xs uppercase tracking-[0.15em] transition-colors",
          error ? "text-red-400" : "text-bone-dim",
        )}
      >
        {label}
      </span>
      {children}
      {error && <span className="text-xs text-red-400">{error}</span>}
    </label>
  );
}
