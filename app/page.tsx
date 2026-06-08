"use client";

import { useEffect, useState } from "react";
import { Movie } from "@/types";
import { moviesApi, tmdbImage } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import MovieCard from "@/components/MovieCard";

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
  console.log(trending);
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
                loading="eager"
                className="absolute inset-0 object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />
            </>
          )}
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 w-full">
            <span className="nb-badge bg-[#f472b6] text-black text-xs mb3 inline-block">
              Trending This Week
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase leading-none tracking-tighter max-w-3xl mb-4">
              {hero.title}
            </h1>
            <p className="text-gray-300 max-w-xl text-base mb-6 line-clamp-2">
              {hero.overview}
            </p>
            <div className="fex gap-3 flex warp ">
              <Link
                href={`/movies/${hero.id}`}
                className="nb-btn nb-btn-yellow"
              >
                View Details
              </Link>
              <Link href={`/movies/`} className="nb-btn nb-btn-white">
                Browse All
              </Link>
            </div>
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-3 border-2 border-black mb-16 divide-x-2 divide-black">
          {[
            { label: "Movies Available", value: "50,000+" },
            { label: "Daily Views", value: "200+" },
            { label: "Happy Viewers", value: "1M+" },
          ].map(({ label, value }) => (
            <div key={label} className="px-6 py-5 bg-white text-center">
              <p className="text-3xl font-black">{value}</p>
              <p className="text-xs font-bold uppercase text-gray-500 mt-1">
                {label}
              </p>
            </div>
          ))}
        </div>

        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black uppercase border-b-4 border-black pb-1">
              🔥Trending Now
            </h2>
            <Link href={"/movies"} className="nb-btn nb-btn-orange text-sm">
              View All
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="nb-card aspect-2/3 bg-gray-100 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {trending.map((m, i) => {
                return <MovieCard key={m.id} movie={m} index={i} />;
              })}
            </div>
          )}
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black uppercase border-b-4 border-black pb-1">
              ⭐Popular Movies
            </h2>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="nb-card aspect-2/3 bg-gray-100 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className=" grid grid-cols-2 md:grid-cols-4 gap-4">
              {popular.map((m, i) => {
                return <MovieCard key={m.id} movie={m} index={i+6} />;
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

