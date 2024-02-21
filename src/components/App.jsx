import { Suspense, lazy } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { Loader } from "./Loader/Loader";
import css from "./App.module.css";

const Home = lazy(() => import('pages/Home'));
const MovieDetails = lazy(() => import('pages/MovieDetails'));
const SearchMovie = lazy(() => import('pages/SearchMovie'));

export const App = () => {
  return (
    <div>
      <header className={css.film_header}>
      <nav className={css.film_header_list}>
        <NavLink className={({ isActive }) => 
           `${css['header_link']} ${isActive ? css.active : ''}`} 
        to="/">Home</NavLink>
          <NavLink className={({ isActive }) => 
           `${css['header_link']} ${isActive ? css.active : ''}`}  
        to="/movies">Movies</NavLink>
      </nav>
      </header>
      <Suspense fallback={<Loader />}>
        <Routes>
         <Route path='/' element={<Home /> } />
         <Route path='/movies' element={<SearchMovie />} />
         <Route path='/movies/:movieId/*' element={<MovieDetails />} />
        </Routes>
      </Suspense>
    </div>
  );
};
