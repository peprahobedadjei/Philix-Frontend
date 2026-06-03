"use client";

import Image from "next/image";
import { useState } from "react";

interface PosterImageProps {
  src: string;
  alt: string;
  className?: string;
  skeletonClassName?: string;

  fallbackSrc?: string;
}

export default function PosterImage({
  src,
  alt,
  className = "",
  skeletonClassName = "",
  fallbackSrc,
}: PosterImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const imgSrc = errored && fallbackSrc ? fallbackSrc : src;

  return (
    <span className="relative block w-full h-full">
      {!loaded && (
        <span
          className={`absolute inset-0 nb-shimmer ${skeletonClassName}`}
          aria-hidden="true"
        />
      )}

      <Image
        src={imgSrc}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        fill
        onLoad={() => setLoaded(true)}
        onError={() => {
          setErrored(true);
          setLoaded(true);
        }}
      />
    </span>
  );
}
