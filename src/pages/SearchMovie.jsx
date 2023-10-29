import React, { useEffect, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { searchMovies } from 'services/api';
import { Loader } from 'components/Loader/Loader';
import css from './Page.module.css';

const SearchMovie = () => {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const query = searchParams.get('query');

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
    <div>
       <form onSubmit={handleFormSubmit} className={css.form}>
        <label>
        <p className={css.search_par}>Search your film</p>
         <input type="text" name="searchMovie" required />
        </label>
        <button type='submit' className={css.SearchForm_button}>Search</button>
       </form>
       {isLoading && <Loader />}
    <section>
      <ul className={css.search_conteiner}>
        {movies !== null && 
           movies.map(({title, id}) => {
            return (
                <li key={id}>
                   <Link 
                   state={{ from: location }} 
                   to={`/movies/${id}`}>
                     <p>{title}</p>
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