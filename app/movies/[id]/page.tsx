"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { moviesApi, tmdbImage } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import PosterImage from "@/components/PosterImage";
import type { MovieDetail } from "@/types";

export default function MovieDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    if (!params.id) return;
    moviesApi
      .getDetails(Number(params.id))
      .then(setMovie)
      .catch(() => router.push("/movies"))
      .finally(() => setLoading(false));
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="nb-card p-8 animate-pulse">
          <div className="h-96 bg-gray-100 mb-4" />
          <div className="h-8 bg-gray-100 w-2/3 mb-3" />
          <div className="h-4 bg-gray-100 w-full" />
        </div>
      </div>
    );
  }

  if (!movie) return null;

  const director = movie.credits?.crew.find((c) => c.job === "Director");
  const topCast = movie.credits?.cast.slice(0, 6) ?? [];
  const trailer = movie.video?.results.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );
  const ratingColor =
    movie.vote_average >= 7.5 ? "#4ade80" : movie.vote_average >= 5 ? "#fde047" : "#fb923c";

  const handleBookClick = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    setShowBooking(true);
  };

  return (
    <div>
      {/* Backdrop */}
      <div className="relative h-72 md:h-96 border-b-4 border-black overflow-hidden">
        {movie.backdrop_path ? (
          <>
            <PosterImage
              src={tmdbImage(movie.backdrop_path, "w780")}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full bg-[#c084fc]" />
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="shrink-0">
            <div className="nb-card w-48 md:w-64 -mt-24 md:-mt-36 relative z-10 overflow-hidden">
              <div className="aspect-2/3 border-b-2 border-black overflow-hidden">
                <PosterImage
                  src={tmdbImage(movie.poster_path, "w342")}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-3 py-3 bg-[#fde047]">
                <p className="font-black text-xs uppercase">
                  ★ {movie.vote_average.toFixed(1)} / 10
                </p>
                <p className="text-xs font-medium">{movie.vote_count.toLocaleString()} votes</p>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-3">
              {movie.genres.map((g) => (
                <span key={g.id} className="nb-badge bg-[#60a5fa] text-black text-xs">
                  {g.name}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-2">
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="text-gray-500 italic font-medium mb-4">&ldquo;{movie.tagline}&rdquo;</p>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap gap-4 mb-6 text-sm font-bold">
              <span className="nb-badge bg-[#fb923c]">
                {movie.release_date?.slice(0, 4)}
              </span>
              {movie.runtime && (
                <span className="nb-badge bg-white">
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>
              )}
              {director && (
                <span className="nb-badge bg-[#c084fc]">Dir. {director.name}</span>
              )}
              <span
                className="nb-badge"
                style={{ background: ratingColor }}
              >
                ★ {movie.vote_average.toFixed(1)}
              </span>
            </div>

            <p className="text-base leading-relaxed max-w-2xl mb-8">{movie.overview}</p>

            {/* CTA */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleBookClick}
                className="nb-btn nb-btn-pink text-base px-6 py-3"
              >
                🎟 Book Tickets
              </button>
              {trailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nb-btn nb-btn-yellow text-base px-6 py-3"
                >
                  ▶ Watch Trailer
                </a>
              )}
              <Link href="/movies" className="nb-btn nb-btn-white">
                ← Back
              </Link>
            </div>

            {!user && (
              <p className="mt-3 text-sm font-medium text-gray-500">
                <Link href="/login" className="underline font-bold">
                  Sign in
                </Link>{" "}
                to book tickets.
              </p>
            )}
          </div>
        </div>

        {/* Cast */}
        {topCast.length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl font-black uppercase border-b-4 border-black pb-1 mb-6">
              Top Cast
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              {topCast.map((actor) => (
                <div key={actor.id} className="nb-card overflow-hidden text-center">
                  <div className="aspect-square border-b-2 border-black overflow-hidden">
                    <PosterImage
                      src={tmdbImage(actor.profile_path, "w185")}
                      alt={actor.name}
                      className="w-full h-full object-cover"
                      fallbackSrc="/placeholder-person.png"
                    />
                  </div>
                  <div className="bg-[#60a5fa] px-2 py-2">
                    <p className="font-black text-xs leading-tight">{actor.name}</p>
                    <p className="text-xs text-gray-700 line-clamp-1">{actor.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

    </div>
  );
}
