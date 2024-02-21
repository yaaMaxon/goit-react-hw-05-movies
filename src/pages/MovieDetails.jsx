import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation, useParams } from "react-router-dom"
import { getMovieDetails } from "services/api";
import { Loader } from "components/Loader/Loader";
import css from '../components/App.module.css';
import NoImg from '../img/no_img.png';

const Cast = lazy(() => import('components/Cast/Cast'));
const Reviews = lazy(() => import('components/Reviews/Reviews'));

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const backLinkHref = useRef(location.state?.from ?? "/");
  const BASE_URL = 'https://image.tmdb.org/t/p/w300';

useEffect(() => {
   if(!movieId) return;

  const movieDetails = async () => {

    try {
      setIsLoading(true);
      const movieData = await getMovieDetails(movieId);
      setMovie(movieData);

    } catch (error) {
       console.log(error);
    } finally {
        setIsLoading(false);
    }}; 

    movieDetails();
}, [movieId]);

  return (
    <div className={css.main_container}>
      <Link to={backLinkHref.current}>
        <button 
         type="button" 
         className={css.goBack_button}>
            Go Back
        </button>
      </Link>
      {isLoading && <Loader />}

        {movie !== null && (
      <div className={css.film_container}>
        <img 
            src={movie.poster_path !== null ? BASE_URL + movie.poster_path : NoImg} 
            alt={movie.original_title}
            className={css.film_img} />
        <div>
           <h1 className={css.film_title}>{movie.title}</h1>
            <p className={css.film_subtitle}>User score: {movie.vote_average}</p>
            <h2 className={css.film_subtitle}>Overview</h2>
            <p className={css.film_overview}>{movie.overview}</p>
            <h3 className={css.film_subtitle}>Genres</h3>
            <p className={css.film_list_descr}>
            {movie.genres.map((genre) => {
                return genre.name;
            }).join(', ')}
        </p>
        </div>
      </div>
        )}

        <p className={css.film_add_info}>Additional information</p>
        <div className={css.film_list_container}>
            <NavLink to='cast' className={({ isActive }) => 
           `${css['header_link']} ${isActive ? css.active : ''}`}>Cast</NavLink>
            <NavLink to='reviews' className={({ isActive }) => 
           `${css['header_link']} ${isActive ? css.active : ''}`}>Reviews</NavLink> 
        </div>
      <Suspense fallback={<Loader />}>
        <Routes>
         <Route path='cast' element={<Cast /> } />
         <Route path='reviews' element={<Reviews /> } />
        </Routes>
      </Suspense>
    </div>
  )
}

export default MovieDetails;