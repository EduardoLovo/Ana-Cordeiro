import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { siteUrl } from "@/lib/site";
import "./globals.css";

/*
 * TIPOGRAFIA
 * ----------
 * - Inter: sans-serif limpa e neutra, usada em títulos (peso leve) e textos.
 * - Lora: serifada elegante, usada apenas nas palavras de acento em itálico
 *   (o toque característico do design).
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: {
    default: "Ana Cordeiro — Arquitetura & Urbanismo",
    template: "%s · Ana Cordeiro",
  },
  description:
    "Arquitetura e urbanismo com equilíbrio entre estética, sustentabilidade e funcionalidade. Portfólio de projetos de Ana Cordeiro.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Ana Cordeiro — Arquitetura & Urbanismo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${lora.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
