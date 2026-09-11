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
};

export default async function ContatoPage() {
  const settings = await getSiteSettings();

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
            {(settings?.email || settings?.phone) && (
              <InfoBlock title="Fale direto">
                {settings?.email}
                {settings?.email && settings?.phone ? "\n" : ""}
                {settings?.phone}
              </InfoBlock>
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
