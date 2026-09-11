/**
 * LAYOUT DO SITE PÚBLICO
 * ----------------------
 * Envolve todas as páginas públicas (Início, Projetos, Sobre, Contato) com o
 * cabeçalho fixo e o rodapé. Busca as configurações do site uma vez e repassa.
 */
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSiteSettings } from "@/sanity/lib/api";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        siteName={settings?.siteName ?? "Ana Cordeiro"}
        tagline={settings?.tagline ?? "Arquitetura & Urbanismo"}
      />
      <main className="grow">{children}</main>
      <Footer settings={settings} />
    </div>
  );
}
