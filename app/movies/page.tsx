"use client";
import MovieCard from "@/components/MovieCard";
import { moviesApi } from "@/lib/api";
import { Movie } from "@/types";
import { useCallback, useEffect, useState } from "react";

export default function MoviesPage() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);

  const fetchMovies = useCallback(async (q: string, p: number) => {
    setLoading(true);
    try {
      const res = q
        ? await moviesApi.search(q, p)
        : await moviesApi.getPopular(p);
      setMovies(res.results);
      setTotalPages(Math.min(res.total_pages, 500));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMovies(query, page);
  }, [query, page, fetchMovies]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setQuery(search);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter border-b-4 border-black pb-2 inline-block">
            {query ? `Results for "${query}"` : "All Movies"}
          </h1>
          <p className="text-sm font-medium text-gray-500 mt-1">
            Page {page} out of {totalPages}
          </p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="flex gap-0 max-w-sm w-full mb-4">
        <input
          type="text"
          className="nb-input flex-1"
          placeholder="Search movies ....."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="nb-btn nb-btn-pink shrink-0">
          Search
        </button>
      </form>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="nb-card aspect-2/3 bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      ) : movies.length === 0 ? (
        <div className="nb-card px-8 py-16 text-center ">
          <p className="text-5xl mb-4">🎥</p>
          <p className="font-black text-xl">No movies Found</p>
          <button
            onClick={() => {
              setQuery("");
              setSearch("");
              setPage(1);
            }}
            className="nb-btn nb-btn-yellow"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((m, i) => {
            return <MovieCard key={m.id} movie={m} index={i} />;
          })}
        </div>
      )}

      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-12">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="nb-btn nb-btn-white disabled:opacity-40"
          >
            Prev
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const p = Math.max(1, Math.min(totalPages - 4, page - 2)) + i;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`nb-btn text-sm w-10 h-10 ${p === page ? "nb-btn-yellow" : "nb-btn-white"}`}
                >
                  {p}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="nb-btn nb-btn-white disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
