import { AuthResponse, LoginRequest, User, type Movie, type MovieDetail, type PaginatedMovies, type SignUpRequest } from "@/types";

const BASE =process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

//Core help

async function request<T>(
    path:string,
    options: RequestInit={}
):Promise<T>{
    const res=await fetch(`${BASE}${path}`, {
        ...options,
        credentials:"include",
        headers:{
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    if (!res.ok){
        const err=await res.json().catch(()=> ({detail:"Unknow error"}));
        throw new Error(err.detail ?? "Request failed")
    }

    if (res.status===204) return {} as T;
    return res.json() as Promise<T>
}


/// Auth--------------------------------------------------------------------------------------------

export const authApi={
    signup:(body: SignUpRequest) =>
        request<AuthResponse>("/auth/signup", {method:"POST", body: JSON.stringify(body)}),

    login:(body: LoginRequest) =>
        request<AuthResponse>("/auth/login", {method:"POST", body: JSON.stringify(body)}),

    logout:() =>
        request<AuthResponse>("/auth/logout", {method:"POST"}),

    me: () =>
        request<User>("/auth/me")
}




//Movies 

export const moviesApi ={
    getPopular: (page=1)=>
        request<PaginatedMovies>(`/movies/popular?page=${page}`),

    getTrending:(time_window: "day" | "week"="week")=>
        request<PaginatedMovies>(`/movies/trending?time_window=${time_window}`),

    search:(query: string, page=1) =>
        request<PaginatedMovies>(`/movies/search?query=${encodeURIComponent(query)}&page${page}`),

    getDetails:(movie_id: number)=>
        request<MovieDetail>(`/movies/${movie_id}`)
};


export const tmdbImage=(
    path: string |null,
    size: "w185" | "w342" | "w500" | "w780" | "original" ="w500"
) => {
    if(!path) return "/placeholder-movie.png";
    return `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE ?? "https://image.tmdb.org/t/p"}/${size}${path}`
}