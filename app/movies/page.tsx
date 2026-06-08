"use client"
import { moviesApi } from "@/lib/api";
import { Movie } from "@/types";
import { useCallback, useEffect, useState } from "react";

export default function MoviesPage() {
  const [loading, setLoading] = useState(false);
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
    setTotalPages(Math.min(res.total_pages , 500))
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);
  return <div></div>;
}
