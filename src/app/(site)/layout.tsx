/**
 * LAYOUT DO SITE PÚBLICO
 * ----------------------
 * Envolve todas as páginas públicas (Início, Projetos, Sobre, Contato) com o
 * cabeçalho fixo e o rodapé. Busca as configurações do site uma vez e repassa.
 */
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSiteSettings } from "@/sanity/lib/api";
import { siteUrl } from "@/lib/site";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  // Dados estruturados (JSON-LD): ajudam o Google a entender que o site é de um
  // negócio de arquitetura, usando as informações reais cadastradas no painel.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: settings?.siteName ?? "Ana Cordeiro — Arquitetura & Urbanismo",
    description: settings?.tagline ?? "Arquitetura & Urbanismo",
    url: siteUrl,
    image: `${siteUrl}/opengraph-image.png`,
    logo: `${siteUrl}/icon.png`,
    areaServed: "BR",
    ...(settings?.email ? { email: settings.email } : {}),
    ...(settings?.phone ? { telephone: settings.phone } : {}),
    ...(settings?.address ? { address: settings.address } : {}),
    ...(settings?.socials && settings.socials.length > 0
      ? { sameAs: settings.socials.map((s) => s.url) }
      : {}),
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header
        siteName={settings?.siteName ?? "Ana Cordeiro"}
        tagline={settings?.tagline ?? "Arquitetura & Urbanismo"}
      />
      <main className="grow">{children}</main>
      <Footer settings={settings} />
    </div>
  );
}
