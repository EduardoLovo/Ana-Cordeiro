/**
 * RENDERIZADOR DE TEXTO RICO (Portable Text) — estilo minimalista
 * ---------------------------------------------------------------
 * Converte o conteúdo do painel (negrito, listas, títulos, citações, links e
 * imagens) em HTML. A formatação vem do CSS (.prose-minimal); aqui só tratamos
 * imagens (otimizadas, com legenda) e links.
 */
import {
  PortableText as PortableTextBase,
  type PortableTextComponents,
  type PortableTextBlock,
} from "@portabletext/react";
import { SmartImage } from "@/components/ui/SmartImage";
import type { SanityImage } from "@/sanity/lib/types";

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImage }) => (
      <figure className="my-8">
        <SmartImage
          image={value}
          width={1400}
          sizes="(max-width: 768px) 100vw, 768px"
          className="w-full"
        />
        {value.caption && (
          <figcaption className="mt-2 text-center text-sm text-gray-400">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href ?? "#";
      const isExternal = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          {...(isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
  },
};

export function PortableText({ value }: { value?: PortableTextBlock[] }) {
  if (!value || value.length === 0) return null;
  return (
    <div className="prose-minimal">
      <PortableTextBase value={value} components={components} />
    </div>
  );
}
