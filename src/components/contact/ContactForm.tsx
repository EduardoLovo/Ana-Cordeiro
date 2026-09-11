"use client";

/**
 * FORMULÁRIO DE CONTATO (estilo minimalista P&B, funcional)
 * ---------------------------------------------------------
 * Mantém o visual do site antigo (campos com underline, botão preto) e envia
 * para /api/contato, que grava a mensagem no painel. Inclui validação,
 * anti-spam (honeypot) e feedback de envio.
 */

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

const SUBJECTS = [
  "Projeto Residencial",
  "Urbanismo / Loteamento",
  "Design de Interiores",
  "Consultoria",
];

const fieldClass =
  "border-b border-gray-200 bg-transparent py-3 transition-colors placeholder:text-gray-300 focus:border-black focus:outline-none";
const labelClass =
  "text-[10px] font-bold uppercase tracking-widest text-gray-400";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Não foi possível enviar.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Não foi possível enviar.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="border border-gray-100 bg-gray-50 p-10 text-center">
        <p className="text-2xl font-light text-gray-900">Mensagem enviada.</p>
        <p className="mt-3 text-sm text-gray-500">
          Obrigada pelo contato. Retornarei em breve.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-[10px] uppercase tracking-widest text-gray-500 underline underline-offset-4 hover:text-black"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {/* Honeypot invisível anti-spam */}
      <div aria-hidden="true" className="hidden">
        <label>
          Não preencha
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelClass}>
            Nome
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={120}
            placeholder="Seu nome completo"
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={160}
            placeholder="exemplo@email.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className={labelClass}>
            Telefone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            maxLength={40}
            placeholder="(11) 99999-9999"
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="subject" className={labelClass}>
            Assunto
          </label>
          <select
            id="subject"
            name="subject"
            className={`${fieldClass} text-gray-600`}
            defaultValue={SUBJECTS[0]}
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelClass}>
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          maxLength={4000}
          placeholder="Conte-nos um pouco sobre seu projeto…"
          className={`${fieldClass} resize-none`}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600" role="alert">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className={`w-full bg-black px-12 py-5 text-xs uppercase tracking-[0.3em] text-white transition-all hover:bg-gray-800 md:w-auto ${
          sending ? "opacity-70" : ""
        }`}
      >
        {sending ? "Enviando…" : "Enviar Proposta"}
      </button>
    </form>
  );
}
