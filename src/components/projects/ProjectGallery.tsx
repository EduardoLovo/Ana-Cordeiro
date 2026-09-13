"use client";

/**
 * GALERIA DO PROJETO COM LIGHTBOX
 * -------------------------------
 * Mostra a grade de fotos (visual P&B → cor no hover, igual ao site) e, ao
 * clicar numa foto, abre um modal em tela cheia com:
 *  - zoom (roda do mouse, duplo-clique e botões + / −);
 *  - arrastar para mover a imagem quando ampliada;
 *  - navegação para a foto anterior/seguinte (botões e setas ← →);
 *  - fechar clicando no X, fora da imagem ou pela tecla Esc.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SmartImage } from "@/components/ui/SmartImage";
import { urlForImage } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/lib/types";

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;

export function ProjectGallery({
  gallery,
  title,
}: {
  gallery: SanityImage[];
  title: string;
}) {
  // Índice da foto aberta no modal (null = modal fechado).
  const [index, setIndex] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const dragging = useRef(false);
  const dragMoved = useRef(false);
  const lastPoint = useRef({ x: 0, y: 0 });

  const isOpen = index !== null;

  const resetZoom = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  const open = useCallback(
    (i: number) => {
      resetZoom();
      setIndex(i);
    },
    [resetZoom],
  );

  const close = useCallback(() => setIndex(null), []);

  const goTo = useCallback(
    (dir: number) => {
      resetZoom();
      setIndex((prev) =>
        prev === null ? prev : (prev + dir + gallery.length) % gallery.length,
      );
    },
    [gallery.length, resetZoom],
  );

  // Teclado (setas e Esc) + trava a rolagem do fundo enquanto o modal está aberto.
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") goTo(1);
      else if (e.key === "ArrowLeft") goTo(-1);
    };

    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close, goTo]);

  const zoomBy = useCallback((delta: number) => {
    setScale((s) => {
      const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, s + delta));
      if (next === 1) setOffset({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    zoomBy(e.deltaY < 0 ? 0.3 : -0.3);
  };

  const toggleZoom = () => {
    if (scale > 1) {
      resetZoom();
    } else {
      setScale(2.2);
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (scale <= 1) return;
    dragging.current = true;
    dragMoved.current = false;
    lastPoint.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastPoint.current.x;
    const dy = e.clientY - lastPoint.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragMoved.current = true;
    lastPoint.current = { x: e.clientX, y: e.clientY };
    setOffset((o) => ({ x: o.x + dx, y: o.y + dy }));
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <>
      {/* Grade de fotos */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {gallery.map((photo, i) => (
          <button
            key={photo.asset?._ref ?? i}
            type="button"
            onClick={() => open(i)}
            aria-label={`Abrir foto ${i + 1} de ${gallery.length}`}
            className="group relative aspect-square cursor-zoom-in overflow-hidden bg-gray-100"
          >
            <SmartImage
              image={photo}
              alt={`${title} — foto ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-all duration-700 grayscale-0 md:grayscale md:group-hover:grayscale-0"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {isOpen && index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} — foto ${index + 1} de ${gallery.length}`}
          onClick={close}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
        >
          {/* Contador */}
          <span className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-white/70">
            {index + 1} / {gallery.length}
          </span>

          {/* Fechar */}
          <button
            type="button"
            onClick={(e) => {
              stop(e);
              close();
            }}
            aria-label="Fechar"
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center text-white/80 transition-colors hover:text-white"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>

          {/* Controles de zoom */}
          <div
            onClick={stop}
            className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full bg-white/10 px-2 py-1 backdrop-blur"
          >
            <ControlButton onClick={() => zoomBy(-0.5)} label="Diminuir zoom">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14" strokeLinecap="round" />
              </svg>
            </ControlButton>
            <span className="w-12 text-center text-[11px] tabular-nums text-white/80">
              {Math.round(scale * 100)}%
            </span>
            <ControlButton onClick={() => zoomBy(0.5)} label="Aumentar zoom">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
            </ControlButton>
          </div>

          {/* Anterior */}
          {gallery.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                stop(e);
                goTo(-1);
              }}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-white/70 transition-colors hover:text-white md:left-6"
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          {/* Seguinte */}
          {gallery.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                stop(e);
                goTo(1);
              }}
              aria-label="Próxima foto"
              className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-white/70 transition-colors hover:text-white md:right-6"
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          {/* Área da imagem: clicar no fundo (fora da foto) fecha; a roda dá zoom */}
          <div
            className="flex h-full w-full items-center justify-center overflow-hidden px-6 py-16"
            onWheel={onWheel}
          >
            <Image
              src={urlForImage(gallery[index]).width(2400).url()}
              alt={`${title} — foto ${index + 1}`}
              width={2000}
              height={1500}
              sizes="100vw"
              priority
              draggable={false}
              onDoubleClick={toggleZoom}
              onClick={(e) => {
                // Clicar na foto (sem arrastar) alterna o zoom, sem fechar o modal.
                e.stopPropagation();
                if (!dragMoved.current) toggleZoom();
              }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              className="max-h-full max-w-full select-none object-contain"
              style={{
                width: "auto",
                height: "auto",
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                transition: dragging.current ? "none" : "transform 0.2s ease-out",
                cursor: scale > 1 ? "grab" : "zoom-in",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

function ControlButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
    >
      {children}
    </button>
  );
}
