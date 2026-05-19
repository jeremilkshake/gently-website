"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { contactPage } from "@/lib/content";
import { cn } from "@/lib/utils";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldKey = "firstName" | "lastName" | "email" | "phone" | "country" | "company" | "title";

const fieldInputClass =
  "font-reading w-full border-0 border-b border-[var(--border)] bg-transparent py-3 text-[15px] text-[var(--text)] outline-none transition-colors placeholder:text-[var(--dim)] focus:border-[var(--text)] disabled:opacity-60";

function Field({
  id,
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  disabled,
  autoComplete,
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        className={fieldInputClass}
      />
    </div>
  );
}

export default function ContactForm() {
  const { form } = contactPage;
  const [fields, setFields] = useState<Record<FieldKey, string>>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    company: "",
    title: "",
  });
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const setField = (key: FieldKey, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (fieldError) setFieldError(null);
    if (status === "error") setStatus("idle");
  };

  const validate = (): boolean => {
    if (!fields.email.trim() || !EMAIL_RE.test(fields.email.trim())) {
      setFieldError(form.invalidEmail);
      return false;
    }
    if (!message.trim() || message.trim().length < 2) {
      setFieldError(form.messageRequired);
      return false;
    }
    if (!consent) {
      setFieldError(form.consentRequired);
      return false;
    }
    return true;
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (status === "sending" || status === "sent") return;
    if (!validate()) return;

    setStatus("sending");
    setFieldError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          email: fields.email.trim(),
          message: message.trim(),
          pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
        }),
      });

      if (!res.ok) {
        setStatus("error");
        setFieldError(form.errorMessage);
        return;
      }

      setStatus("sent");
    } catch {
      setStatus("error");
      setFieldError(form.networkError);
    }
  };

  const disabled = status === "sending" || status === "sent";

  if (status === "sent") {
    return (
      <div className="py-6 text-center">
        <p className="font-serif text-[clamp(22px,2.5vw,28px)] font-extrabold tracking-[-0.02em] text-[var(--text)]">
          {form.successTitle}
        </p>
        <p className="font-reading mt-3 text-[15px] leading-[1.65] text-[var(--muted)]">{form.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => void submit(e)} noValidate className="w-full">
      {fieldError && (
        <p className="font-reading mb-4 text-[13px] text-[var(--destructive)]" role="alert">
          {fieldError}
        </p>
      )}

      <fieldset disabled={disabled} className="m-0 min-w-0 space-y-5 border-0 p-0">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id="firstName"
            label={form.firstName.label}
            placeholder={form.firstName.placeholder}
            value={fields.firstName}
            onChange={(v) => setField("firstName", v)}
            disabled={disabled}
            autoComplete="given-name"
          />
          <Field
            id="lastName"
            label={form.lastName.label}
            placeholder={form.lastName.placeholder}
            value={fields.lastName}
            onChange={(v) => setField("lastName", v)}
            disabled={disabled}
            autoComplete="family-name"
          />
        </div>

        <Field
          id="email"
          label={form.email.label}
          placeholder={form.email.placeholder}
          type="email"
          value={fields.email}
          onChange={(v) => setField("email", v)}
          disabled={disabled}
          autoComplete="email"
        />
        <Field
          id="phone"
          label={form.phone.label}
          placeholder={form.phone.placeholder}
          type="tel"
          value={fields.phone}
          onChange={(v) => setField("phone", v)}
          disabled={disabled}
          autoComplete="tel"
        />
        <Field
          id="country"
          label={form.country.label}
          placeholder={form.country.placeholder}
          value={fields.country}
          onChange={(v) => setField("country", v)}
          disabled={disabled}
          autoComplete="country-name"
        />
        <Field
          id="company"
          label={form.company.label}
          placeholder={form.company.placeholder}
          value={fields.company}
          onChange={(v) => setField("company", v)}
          disabled={disabled}
          autoComplete="organization"
        />
        <Field
          id="title"
          label={form.title.label}
          placeholder={form.title.placeholder}
          value={fields.title}
          onChange={(v) => setField("title", v)}
          disabled={disabled}
          autoComplete="organization-title"
        />

        <div>
          <label htmlFor="message" className="sr-only">
            {form.message.label}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (fieldError) setFieldError(null);
              if (status === "error") setStatus("idle");
            }}
            placeholder={form.message.placeholder}
            disabled={disabled}
            className={cn(
              fieldInputClass,
              "mt-1 resize-y border border-[var(--border)] px-3 py-3 focus:border-[var(--text)]",
            )}
          />
        </div>

        <label className="font-reading flex cursor-pointer items-start gap-3 text-[13px] leading-[1.5] text-[var(--muted)]">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (fieldError) setFieldError(null);
              if (status === "error") setStatus("idle");
            }}
            disabled={disabled}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]"
          />
          <span>
            {form.privacyPrefix}{" "}
            <Link
              href={form.privacyHref}
              className="text-[var(--text)] underline underline-offset-2 hover:text-[var(--accent)]"
            >
              {form.privacyLinkLabel}
            </Link>
          </span>
        </label>

        <button
          type="submit"
          disabled={disabled}
          className={cn(
            "font-brand w-full min-h-[3rem] rounded-xl border-2 border-[var(--text)] px-5 py-3 text-sm font-extrabold transition",
            "bg-[var(--text)] text-[var(--card)] shadow-[0_4px_0_0_rgba(28,25,20,0.25)]",
            "hover:brightness-110 active:translate-y-px active:shadow-[0_3px_0_0_rgba(28,25,20,0.25)] disabled:cursor-not-allowed disabled:opacity-60",
          )}
        >
          {status === "sending" ? form.submittingLabel : form.submitLabel}
        </button>
      </fieldset>
    </form>
  );
}
