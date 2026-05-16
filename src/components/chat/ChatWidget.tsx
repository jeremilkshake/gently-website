"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, MessageCircle, X } from "lucide-react";
import { chatWidget } from "@/lib/content";
import { useAudience } from "@/lib/audienceContext";
import { cn } from "@/lib/utils";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubmitStatus = "idle" | "sending" | "sent" | "error";

function isValidEmail(value: string) {
  return EMAIL_RE.test(value.trim());
}

export default function ChatWidget() {
  const c = chatWidget;
  const { audience } = useAudience();
  const variant = audience === "business" ? c.business : c.individual;
  const panelId = useId();
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [sentUserMessage, setSentUserMessage] = useState<string | null>(null);

  const canSend =
    status !== "sending" &&
    status !== "sent" &&
    isValidEmail(email) &&
    message.trim().length >= 2;

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (open && status === "idle") {
      messageRef.current?.focus();
    }
  }, [open, status]);

  const resizeMessage = useCallback(() => {
    const el = messageRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, []);

  useEffect(() => {
    resizeMessage();
  }, [message, resizeMessage, open]);

  const submit = useCallback(async () => {
    if (status === "sending" || status === "sent") return;

    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!isValidEmail(trimmedEmail)) {
      setFieldError(c.invalidEmail);
      return;
    }
    if (trimmedMessage.length < 2) {
      setFieldError(c.emptyMessage);
      return;
    }

    setFieldError(null);
    setStatus("sending");

    try {
      const res = await fetch("/api/chat-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          message: trimmedMessage,
          audience,
          pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setFieldError(data?.error === "not_configured" ? c.errorMessage : c.errorMessage);
        setStatus("error");
        return;
      }

      setSentUserMessage(trimmedMessage);
      setStatus("sent");
    } catch {
      setFieldError(c.networkError);
      setStatus("error");
    }
  }, [audience, c, email, message, status]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            role="dialog"
            aria-labelledby={`${panelId}-title`}
            aria-modal="true"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "fixed z-[300] flex flex-col overflow-hidden",
              "bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] right-4 sm:right-6",
              "h-[min(560px,calc(100dvh-7rem-env(safe-area-inset-top,0px)))] w-[min(100vw-2rem,400px)]",
              "rounded-2xl border border-[var(--border)] bg-[var(--card)]",
              "shadow-[var(--shadow-dropdown)]",
            )}
          >
            <header className="flex shrink-0 items-center gap-3 border-b border-[var(--border)] px-4 py-3">
              <Image
                src="/images/grievegently-logo.svg"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 shrink-0 rounded-md"
                aria-hidden
              />
              <motion.div layout className="min-w-0 flex-1">
                <p id={`${panelId}-title`} className="truncate font-brand text-[15px] font-bold text-[var(--text)]">
                  {c.agentName}
                </p>
                <p className="font-reading truncate text-[12px] text-[var(--muted)]">{variant.headerSubtext}</p>
              </motion.div>
              <button
                type="button"
                onClick={close}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[var(--muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text)]"
                aria-label={c.closeAriaLabel}
              >
                <X className="h-[18px] w-[18px]" strokeWidth={2} />
              </button>
            </header>

            <motion.div layout className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
              {variant.welcomeMessages.map((text, i) => (
                <div key={`${audience}-${i}`} className="flex max-w-[92%] flex-col gap-1">
                  <motion.div className="rounded-2xl rounded-bl-md bg-[var(--bg-3)] px-3.5 py-2.5">
                    <p className="font-reading m-0 text-[14px] leading-[1.55] text-[var(--text)]">{text}</p>
                  </motion.div>
                  {i === variant.welcomeMessages.length - 1 && status === "idle" && (
                    <p className="font-reading m-0 pl-1 text-[11px] text-[var(--dim)]">
                      {c.agentName} · {c.timestampJustNow}
                    </p>
                  )}
                </div>
              ))}

              {sentUserMessage && (
                <div className="ml-auto flex max-w-[88%] flex-col items-end gap-1">
                  <motion.div layout className="rounded-2xl rounded-br-md bg-[var(--accent)] px-3.5 py-2.5 text-white">
                    <p className="font-reading m-0 text-[14px] leading-[1.55]">{sentUserMessage}</p>
                  </motion.div>
                </div>
              )}

              {status === "sent" && (
                <motion.div layout className="flex max-w-[92%] flex-col gap-1">
                  <motion.div layout className="rounded-2xl rounded-bl-md bg-[var(--bg-3)] px-3.5 py-2.5">
                    <p className="font-reading m-0 text-[14px] leading-[1.55] text-[var(--text)]">
                      {c.thankYouMessage}
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>

            <motion.div layout className="shrink-0 border-t border-[var(--border)] p-3">
              {fieldError && (
                <p className="font-reading mb-2 text-[12px] text-[var(--destructive)]" role="alert">
                  {fieldError}
                </p>
              )}

              {status !== "sent" ? (
                <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)] focus-within:border-[var(--border-hover)]">
                  <label className="sr-only" htmlFor={`${panelId}-email`}>
                    {c.emailPlaceholder}
                  </label>
                  <input
                    id={`${panelId}-email`}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (fieldError) setFieldError(null);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder={c.emailPlaceholder}
                    disabled={status === "sending"}
                    className="font-reading w-full border-0 bg-transparent px-3.5 py-2.5 text-[14px] text-[var(--text)] outline-none placeholder:text-[var(--dim)] disabled:opacity-60"
                  />
                  <motion.div layout className="mx-3.5 h-px bg-[var(--border)]" />
                  <div className="relative flex items-end gap-2 px-2 pb-2 pt-1">
                    <label className="sr-only" htmlFor={`${panelId}-message`}>
                      {c.messagePlaceholder}
                    </label>
                    <textarea
                      ref={messageRef}
                      id={`${panelId}-message`}
                      rows={1}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (fieldError) setFieldError(null);
                        if (status === "error") setStatus("idle");
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          if (canSend) void submit();
                        }
                      }}
                      placeholder={c.messagePlaceholder}
                      disabled={status === "sending"}
                      className="font-reading max-h-[120px] min-h-[40px] flex-1 resize-none border-0 bg-transparent py-2 pl-1.5 text-[14px] leading-[1.5] text-[var(--text)] outline-none placeholder:text-[var(--dim)] disabled:opacity-60"
                    />
                    <button
                      type="button"
                      onClick={() => void submit()}
                      disabled={!canSend}
                      aria-label={status === "sending" ? c.sendingLabel : c.sendAriaLabel}
                      className={cn(
                        "mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors",
                        canSend
                          ? "bg-[var(--text)] text-[var(--card)] hover:opacity-90"
                          : "bg-[var(--bg-3)] text-[var(--dim)]",
                      )}
                    >
                      <ArrowUp className="h-[18px] w-[18px]" strokeWidth={2.25} />
                    </button>
                  </div>
                </div>
              ) : (
                <p className="font-reading m-0 px-1 py-1 text-center text-[12px] text-[var(--muted)]">
                  {c.thankYouMessage}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        className={cn(
          "fixed z-[300] flex items-center gap-2 rounded-full px-4 py-3 font-brand text-[14px] font-semibold text-white shadow-[var(--shadow-float)] transition-transform hover:scale-[1.02] active:scale-[0.98]",
          "bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] right-4 sm:right-6",
          "bg-[var(--accent)]",
          open && "pointer-events-none opacity-0",
        )}
      >
        <MessageCircle className="h-5 w-5" strokeWidth={2} aria-hidden />
        <span>{c.launcherLabel}</span>
      </button>
    </>
  );
}
