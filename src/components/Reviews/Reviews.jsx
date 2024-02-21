import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieReviews } from 'services/api';
import { Loader } from 'components/Loader/Loader';
import css from './Reviews.module.css';

const Reviews = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
   if(!movieId) return;

  const movieReviews = async () => {

    try {
      setIsLoading(true);
      const reviewsData = await getMovieReviews(movieId);
      setReviews(reviewsData);

    } catch (error) {
       console.log(error);
    } finally {
      setIsLoading(false);
    }}; 

    movieReviews();
}, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {reviews !== null && (
         <ul className={css.search_conteiner}>
          {reviews.map(({author, content, id}) => {
            return (
              <li key={id} className={css.search_item}>
                <h3 className={css.search_name}>Author: {author}</h3>
                <p className={css.search_content}>{content}</p>
            </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default Reviews;