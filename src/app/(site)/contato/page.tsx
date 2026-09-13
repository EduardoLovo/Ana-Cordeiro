/**
 * CONTATO — /contato
 * ------------------
 * À esquerda, as informações (endereço, contato direto, horário) vindas do
 * painel; à direita, o formulário funcional (salva no painel). Mesmo visual do
 * site antigo.
 */
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { getSiteSettings } from "@/sanity/lib/api";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com Ana Cordeiro para transformar sua ideia em espaço.",
  alternates: { canonical: "/contato" },
};

export default async function ContatoPage() {
  const settings = await getSiteSettings();

  // Link do WhatsApp: usa o campo próprio se houver; senão, monta a partir do
  // telefone (só dígitos). Assim o botão funciona mesmo sem o link dedicado.
  const whatsappHref =
    settings?.whatsappUrl ||
    (settings?.phone
      ? `https://wa.me/${settings.phone.replace(/\D/g, "")}`
      : null);

  return (
    <main className="bg-white pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Título */}
        <div className="mb-20">
          <span className="text-xs uppercase tracking-[0.5em] text-gray-400">
            Contato
          </span>
          <h1 className="mt-4 text-5xl font-light tracking-tighter text-gray-900 md:text-7xl">
            Vamos{" "}
            <span className="font-serif italic text-gray-400">transformar</span>{" "}
            <br />
            sua ideia em espaço.
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
          {/* Informações */}
          <div className="space-y-12">
            {settings?.address && (
              <InfoBlock title="Onde estamos">{settings.address}</InfoBlock>
            )}
            {(settings?.email || settings?.phone || whatsappHref) && (
              <div>
                <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-900">
                  Fale direto
                </h3>
                <p className="whitespace-pre-line leading-relaxed text-gray-500">
                  {settings?.email}
                  {settings?.email && settings?.phone ? "\n" : ""}
                  {settings?.phone}
                </p>
                {whatsappHref && (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 bg-black px-6 py-3 text-[10px] uppercase tracking-[0.25em] text-white transition-all hover:bg-gray-800"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.8c2.16 0 4.19.84 5.72 2.37a8.06 8.06 0 0 1 2.37 5.73c0 4.46-3.63 8.09-8.1 8.09a8.1 8.1 0 0 1-4.12-1.13l-.3-.17-3.12.82.83-3.04-.19-.31a8.03 8.03 0 0 1-1.24-4.3c0-4.46 3.63-8.08 8.09-8.08zm4.56 10.29c-.25-.13-1.47-.72-1.7-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42l-.48-.01c-.16 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.13.16 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29z" />
                    </svg>
                    Falar no WhatsApp
                  </a>
                )}
              </div>
            )}
            {settings?.hours && (
              <InfoBlock title="Horário">{settings.hours}</InfoBlock>
            )}

            {/* Linha-guia decorativa (remete a plantas baixas) */}
            <div className="ml-2 hidden h-32 w-px bg-gray-100 lg:block" />
          </div>

          {/* Formulário */}
          <ContactForm />
        </div>
      </div>
    </main>
  );
}

/** Bloco de informação com título em maiúsculas e conteúdo em múltiplas linhas. */
function InfoBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-900">
        {title}
      </h3>
      <p className="whitespace-pre-line leading-relaxed text-gray-500">
        {children}
      </p>
    </div>
  );
}
