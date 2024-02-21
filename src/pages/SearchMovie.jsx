import React, { useEffect, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { searchMovies } from 'services/api';
import { Loader } from 'components/Loader/Loader';
import css from './Page.module.css';

import NoImg from '../img/no_img.png';

const SearchMovie = () => {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const query = searchParams.get('query');

  const BASE_URL = 'https://image.tmdb.org/t/p/w300';

  useEffect(() => {
   if(!query) return;

  const fetchMovies = async () => {

    try {
      setIsLoading(true);
      const moviesData = await searchMovies(query);
      setMovies(moviesData);

    } catch (error) {
       console.log(error);
    } finally {
      setIsLoading(false);
    }}; 

    fetchMovies();
}, [query]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const searchValue = event.currentTarget.elements.searchMovie.value;
    setSearchParams({ query: searchValue });

    event.currentTarget.reset();
  }

  return (
    <div className={css.main_container}>
       <form onSubmit={handleFormSubmit} className={css.form}>
        <label>
        <p className={css.search_par}>Search your film</p>
         <input 
         type="text" 
         name="searchMovie"
         placeholder="Search films"
         className={css.search_input} 
         required />
        </label>
        <button type='submit' className={css.SearchForm_button}>Search</button>
       </form>
       {isLoading && <Loader />}
    <section>
      <ul className={css.search_conteiner}>
        {movies !== null && 
           movies.map(({title, id, poster_path}) => {
            return (
                <li key={id} className={css.search_item}>
                   <Link 
                   state={{ from: location }} 
                   to={`/movies/${id}`}>
                    <img
                     className={css.search_img}
                     src={ poster_path !== null ? BASE_URL + poster_path : NoImg}
                      alt={title}
                     />
                     <p className={css.search_title}>{title}</p>
                   </Link>
                </li>
            )
           })
        }
      </ul>
    </section>
    </div>
  )
}

export default SearchMovie;