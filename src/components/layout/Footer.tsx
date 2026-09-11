/**
 * RODAPÉ DO SITE (estilo minimalista P&B)
 * ---------------------------------------
 * Marca + apresentação, navegação e redes sociais (como links serifados
 * itálicos), e a barra final com o registro CAU. Recebe as configurações do
 * site já carregadas do Sanity. Inclui um link discreto para o painel.
 */
import Link from "next/link";
import type { SiteSettings } from "@/sanity/lib/types";
import { socialLabels } from "@/lib/format";

const NAV_LINKS = [
  { href: "/projetos", label: "Projetos Selecionados" },
  { href: "/sobre", label: "A Arquiteta" },
  { href: "/contato", label: "Fale Conosco" },
];

export function Footer({ settings }: { settings: SiteSettings | null }) {
  const name = settings?.siteName ?? "Ana Cordeiro";
  const year = new Date().getFullYear();
  const socials = settings?.socials ?? [];

  return (
    <footer className="border-t border-gray-100 bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Marca */}
          <div className="md:col-span-2">
            <span className="text-lg font-bold uppercase tracking-tighter text-gray-900">
              {name}
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-500">
              {settings?.footerText ??
                "Transformando a complexidade urbana em espaços de respiro e significado. Projetos que respeitam o tempo e a escala humana."}
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-900">
              Navegação
            </h4>
            <ul className="space-y-4 text-sm text-gray-500">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-black"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          {socials.length > 0 && (
            <div>
              <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-900">
                Social
              </h4>
              <ul className="space-y-4 text-sm text-gray-500">
                {socials.map((social) => (
                  <li key={social.platform + social.url}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-serif italic transition-colors hover:text-black"
                    >
                      {socialLabels[social.platform] ?? social.platform}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Barra final */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-50 pt-8 md:flex-row">
          <div className="text-[10px] uppercase tracking-widest text-gray-400">
            © {year} {name}
            {settings?.cau ? ` — ${settings.cau}` : ""}
          </div>
          <Link
            href="/studio"
            className="text-[10px] uppercase tracking-widest text-gray-400 transition-colors hover:text-black"
          >
            Painel de administração
          </Link>
        </div>
      </div>
    </footer>
  );
}
