/**
 * SMART IMAGE — Imagem otimizada do Sanity
 * ----------------------------------------
 * Usa o next/image (versões leves em AVIF/WebP, no tamanho certo) e monta a URL
 * a partir do CDN do Sanity, respeitando o ponto focal. Se não houver imagem,
 * mostra um bloco neutro para o layout nunca "quebrar".
 */
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/lib/types";

type SmartImageProps = {
  image?: SanityImage;
  alt?: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
};

export function SmartImage({
  image,
  alt,
  sizes,
  className,
  priority,
  fill,
  width,
  height,
}: SmartImageProps) {
  if (!image?.asset) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 ${className ?? ""}`}
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400">
          Sem imagem
        </span>
      </div>
    );
  }

  const altText = image.alt ?? alt ?? "";

  if (fill) {
    return (
      <Image
        src={urlForImage(image).width(2400).url()}
        alt={altText}
        fill
        sizes={sizes ?? "100vw"}
        className={className}
        priority={priority}
      />
    );
  }

  const w = width ?? 1200;
  const h = height ?? Math.round(w * 0.75);

  return (
    <Image
      src={urlForImage(image).width(w).height(h).url()}
      alt={altText}
      width={w}
      height={h}
      sizes={sizes}
      className={className}
      priority={priority}
    />
  );
}
