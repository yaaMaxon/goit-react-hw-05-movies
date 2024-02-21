import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getMovieCredits } from 'services/api';
import { Loader } from 'components/Loader/Loader';
import css from './Cast.module.css';

import NoImg from '../../img/no_img.png';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const BASE_URL = 'https://image.tmdb.org/t/p/w200';

useEffect(() => {
   if(!movieId) return;

  const movieCast = async () => {

    try {
      setIsLoading(true);
      const castData = await getMovieCredits(movieId);
      setCast(castData);

    } catch (error) {
       console.log(error);
    } finally {
      setIsLoading(false);
    }}; 

    movieCast();
}, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {cast !== null && (
        <ul className={css.search_conteiner}>
          {cast.map(({profile_path, original_name, name, character, id}) => {
            return (
              <li className={css.search_item} key={id}>
                <img 
                className={css.search_photo}
                src={profile_path !== null ? BASE_URL + profile_path : NoImg} 
                alt={original_name} />
              <div>
                <p className={css.search_name}>{name}</p>
                <p className={css.search_character}>Character: {character}</p>
              </div>  
            </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default Cast;