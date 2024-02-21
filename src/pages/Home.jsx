import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { getTrendMovies } from 'services/api'
import { Loader } from 'components/Loader/Loader';
import css from './Page.module.css';

import NoImg from '../img/no_img.png';

const Home = () => {
const [movies, setMovies] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const location = useLocation();

const BASE_URL = 'https://image.tmdb.org/t/p/w300';

useEffect(() => {
  const fetchMovies = async () => {

    try {
      setIsLoading(true);
      const trendMovies = await getTrendMovies();
      setMovies(trendMovies.results);

    } catch (error) {
       console.log(error);
    } finally {
        setIsLoading(false);
    }}; 

    fetchMovies();
}, []);

  return (
    <div className={css.main_container}>
    {isLoading && <Loader />}
    <h2 className={css.search_par}>Trending today</h2>
    <ul className={css.search_conteiner}>
        {movies.map(({id, title, poster_path}) => {
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
        })}
    </ul>
    </div>
  )
}

export default Home;
