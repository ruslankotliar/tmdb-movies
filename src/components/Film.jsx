import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Film = ({ film }) => {
  return (
    <Link to={`/film/${film.id}`}>
      <div className='relative film-card'>
        <img
          className='w-full img-film'
          src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
          alt='poster'
        />
        <div className='blur-container'>
          <h1 className='text-center text-4xl text-white title-film'>
            {film.original_title.split(' ').slice(0, 2).join(' ')}
          </h1>
        </div>
      </div>
    </Link>
  );
};

export default Film;
