import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { getTrendMovies } from 'services/api'
import { Loader } from 'components/Loader/Loader';
import css from './Page.module.css';

const Home = () => {
const [movies, setMovies] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const location = useLocation();

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
    <div>
    {isLoading && <Loader />}
    <h2 className={css.search_par}>Trending today</h2>
    <ul className={css.search_conteiner}>
        {movies.map(({id, title}) => {
            return (
                <li key={id}>
                  <Link 
                  state={{ from: location }}
                  to={`/movies/${id}`}>
                    <p> {title}</p>
                  </Link>
                </li>
            )
        })}
    </ul>
    </div>
  )
}

export default Home;
