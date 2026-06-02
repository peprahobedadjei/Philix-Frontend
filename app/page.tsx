"use client"

import { useEffect, useState } from "react";
import { Movie } from "@/types";
import { moviesApi, tmdbImage } from "@/lib/api";
import Image from "next/image";

export default function HomePage() {
  const [trending, setTrending] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([moviesApi.getTrending("week"), moviesApi.getPopular(1)])
      .then(([t, p]) => {
        setTrending(t.results.slice(0, 6));
        setPopular(p.results.slice(0, 8));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const hero = trending[0];
  return (
    <div>
      {hero && (
        <section className="relative min-h-130 flex items-end overflow-hidden border-b-4 border-black">
          {hero.backdrop_path && (
            <>
              <Image
                src={tmdbImage(hero.backdrop_path, "w780")}
                alt={hero.title}
                fill
                className="absolute inset-0 object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />
            </>
          )}
        </section>
      )}
    </div>
  );
}
