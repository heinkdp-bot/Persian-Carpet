import Image from "next/image";

type CarpetImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
};

export function CarpetImage({
  src,
  alt,
  className,
  sizes,
  priority,
  fill = true,
  width,
  height,
}: CarpetImageProps) {
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "(min-width: 1024px) 40vw, 100vw"}
        priority={priority}
        className={className ?? "object-cover"}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 675}
      height={height ?? 900}
      sizes={sizes}
      priority={priority}
      className={className ?? "h-auto w-full object-cover"}
    />
  );
}
