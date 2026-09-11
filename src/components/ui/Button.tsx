/**
 * BOTÃO / LINK DE AÇÃO (estilo minimalista P&B)
 * ---------------------------------------------
 * Botão retangular preto com texto em maiúsculas e tracking largo — igual ao
 * do site antigo. Renderiza como link: interno (Next <Link>), externo (<a>
 * nova aba) ou mailto/tel (<a> simples).
 */
import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  className?: string;
};

const BASE =
  "inline-flex items-center justify-center px-8 py-4 text-xs uppercase tracking-[0.25em] transition-all duration-300";

const VARIANTS = {
  solid: "bg-black text-white hover:bg-gray-800",
  outline: "border border-gray-300 text-gray-900 hover:border-black",
} as const;

/** Classes visuais de um botão — reaproveitável por outros componentes. */
export function buttonClass(
  variant: "solid" | "outline" = "solid",
  className = "",
) {
  return `${BASE} ${VARIANTS[variant]} ${className}`;
}

export function Button({
  href,
  children,
  variant = "solid",
  className = "",
}: ButtonProps) {
  const classes = buttonClass(variant, className);
  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const isHttp = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={classes}
    >
      {children}
    </a>
  );
}
