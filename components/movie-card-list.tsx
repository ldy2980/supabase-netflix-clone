"use client";

import { searchMovies } from "actions/movieActions";
import MovieCard from "./movie-card";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@material-tailwind/react";
import { searchState } from "utils/recoil/atoms";
import { useRecoilValue } from "recoil";

export default function MovieCardList() {
  const search = useRecoilValue(searchState);
  const getAllMoviesQuery = useQuery({
    queryKey: ["movie", search],
    queryFn: () => searchMovies(search),
  });

  return (
    <div className="grid gap-1 md:grid-cols-4 grid-cols-3 w-full h-full">
      {getAllMoviesQuery.isLoading && (
        <Spinner
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      )}
      {getAllMoviesQuery.data &&
        getAllMoviesQuery.data.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
    </div>
  );
}
