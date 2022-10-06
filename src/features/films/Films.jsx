import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFilmsByExpression } from './filmsSlice';
import Film from '../../components/Film';
import { RingLoader } from 'react-spinners';
import { fetchPopularFilms } from './filmsSlice';

const Films = () => {
  const dispatch = useDispatch();
  const { expression, films, isLoadingFilms, errorFilms } = useSelector(
    (state) => state.films
  );

  useEffect(() => {
    console.log(films);
  }, [films]);

  useEffect(() => {
    dispatch(fetchPopularFilms());
  }, []);

  if (isLoadingFilms) {
    return (
      <div className='dot-loader'>
        <RingLoader  color='green' size='150px' />
      </div>
    );
  }

  if (films === undefined) {
    return (
      <div className='dot-loader'>
        <RingLoader color='green' size='150px' />
      </div>
    );
  }

  return (
    <div className='grid-with-films'>
      {films.filter(film => film.poster_path !== null).map((film) => {
        return <Film key={film.id} film={film} />;
      })}
    </div>
  );
};

export default Films;
