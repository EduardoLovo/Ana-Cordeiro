import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "../env";

/**
 * GERADOR DE URLs DE IMAGEM (CDN do Sanity), já com transformações.
 * Ex.: urlForImage(project.coverImage).width(1200).url()
 */
const builder = createImageUrlBuilder({ projectId, dataset });

export function urlForImage(source: SanityImageSource) {
  return builder.image(source).auto("format").fit("max");
}
