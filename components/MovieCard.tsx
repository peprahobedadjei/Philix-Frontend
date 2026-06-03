"use client"

import { tmdbImage } from "@/lib/api";
import { Movie } from "@/types";
import Link from "next/link";
import PosterImage from "./PosterImage";

const ACCENT_COLORS = [
  "#f4ff35",
  "#f472b6",
  "#4ade80",
  "#fb923c",
  "#60a5fa",
  "#c084fc",
  "#56ab25"
];

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

export default function MovieCard({ movie, index = 0 }: MovieCardProps) {
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];
  const rating = movie.vote_average.toFixed(1);
  return (
    <Link href={`/movies/${movie.id}`} className="block group">
      <div className=" nb-card overflow">
        <div className="relative aspect-2/3 overflow-hidden border-b-2 border-black bg-gray-100">
          {movie.poster_path ? (
            <>
              <PosterImage
                src={tmdbImage(movie.poster_path, "w342")}
                alt={movie.title}
                fallbackSrc={"/placeholder-movie.png"}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div
                className="absolute top-2 right-2 z-10 border-2 border-black px-2 py-0.5 text-xs font-black"
                style={{ background: accent }}
              >
                ⭐{rating}
              </div>
            </>
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-4xl font-black"
              style={{ background: accent }}
            >
              ?
            </div>
          )}
        </div>

        <div className="p-3" style={{ background: accent }}>
          <h3 className="font-black text-sm leading-tight line-clamp-2 uppercase">
            {movie.title}
          </h3>
          <p className="text-xs font-medium mt-1 opacity-70">
            {movie.release_date ? movie.release_date.slice(0,4) : "-"}
          </p>
        </div>
      </div>
    </Link>
  );
}
