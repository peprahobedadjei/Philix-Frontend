//Movies 
export interface Movie{
    id:number;
    title:string;
    overview:string;
    poster_path:string | null;
    backdrop_path: string | null;
    release_date :string;
    vote_average: number;
    vote_count:number;
    popularity:number;
    genre_ids:number[];
    adult:boolean;
    original_language:string;
}


export interface PaginatedMovies{
    Page:number;
    results:Movie[];
    total_pages:number;
    total_results:number;

}


export interface MovieDetail extends Omit<Movie, "genre_ids">{
    genres:Genre[];
    runtime:number | null;
    status:string;
    tagline:string | null;
    budget:number;
    revenue: number;
    production_companies:ProductionCompany[];
    credits?: Credits;
    video?:VideoResults;
} 

export interface VideoResults{
    results:Video[]
}

export interface CastMember{
    id:number;
    name: string;
    character:string;
    profile_path:string;
    order:number
}
export interface CrewMember{
    id:number;
    name: string;
    job:string;
    department:string
    profile_path:string;
    order:number
}

export interface Credits {
    cast: CastMember[];
    crew: CrewMember[];
}


export interface Genre{
    id:number;
    name:string;
}


export interface ProductionCompany{
    id:number;
    name:string;
    logo_path:string | null;
    original_country:string;
}

export interface Video{
    id:string;
    key:string;
    name:string;
    site:string;
    type:string;
}