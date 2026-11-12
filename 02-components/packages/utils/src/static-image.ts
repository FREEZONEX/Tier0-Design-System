export type StaticImageSource = string | { readonly src: string };

export function resolveStaticImageSrc(source: StaticImageSource): string {
  return typeof source === 'string' ? source : source.src;
}
