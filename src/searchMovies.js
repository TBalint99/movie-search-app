import React, { useState } from "react";
import MovieCard from './movieCard.js';

export default function SearchMovies() {

    //states- input query, movies
    const [query, setQuery] = useState('');
    //create the state for movies, and update that state appropriate
    const [movies, setMovies] = useState([]);

    const searchMovies = async (e) => {
        e.preventDefault();

        const url = `https://api.themoviedb.org/3/search/movie?api_key=ea0c3de1838547ed849db82a5824c8dd&language=en-US&query=${query}&page=1&include_adult=false`;

        if (query == '') {
            setMovies("No relevant results.")
        } else {
            try {
                const res = await fetch(url);
                const data = await res.json();
                setMovies(data.results);
            } catch (err) {
                console.error(err);
            }
        }
    }

    return (
        <>
            {/*Searchbar*/}
            <form className="form" onSubmit={searchMovies}>
                <label className="label" htmlFor="query">Movie Name</label>
                <input className="input" type="text" name="query"
                    placeholder="i.e. Jurassic Park"
                    value={query} onChange={(e) => setQuery(e.target.value)}
                />
                <button className="button" type="submit">Search</button>
            </form>

            {/*Moovie cards*/}
            <div className="card-list">
                {
                    movies != "No relevant results." ?
                    movies.filter(movie => movie.poster_path).map(movie => (
                        <MovieCard movie={movie} key={movie.id} />
                    )) :
                    <h2>No relevant results.</h2>
                }
            </div>
        </>
    )
}