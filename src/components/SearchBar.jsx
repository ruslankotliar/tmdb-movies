import React, { useState, useRef, useEffect } from 'react';
import { GiPopcorn } from 'react-icons/gi';
import { ImFilm } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';
import {
  setExpression,
  fetchFilmsByExpression,
} from '../features/films/filmsSlice';
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const watchlistRef = useRef();
  const { watchlist } = useSelector((state) => state.watchlist);
  const dispatch = useDispatch();
  const [expression, setExpression] = useState('');

  const filmExpression = [
    'spider',
    'money',
    'love',
    'animal',
    'batman',
    'sun',
    'earth',
    'cartoon',
    'water',
    'boys',
    'guns',
    'fantasy',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchFilmsByExpression(expression));
  };

  const fetchNewPage = () => {
    const random = Math.floor(Math.random() * filmExpression.length);
    dispatch(fetchFilmsByExpression(filmExpression[random]));
  };

  useEffect(() => {
    watchlistRef.current.style.animation = 'watchlist-change 1s ease';
  }, [watchlist]);

  return (
    <nav className='flex justify-between px-20 pr-24 py-8 align-center h-max w-screen overflow-hidden'>
      <Link to='/' onClick={() => fetchNewPage()}>
        <div className='my-2 '>
          <GiPopcorn className='text-green-600 logo' size='5rem' />
        </div>
      </Link>
      <div className='flex justify-center align-center'>
        <form
          className='flex relative align-center form-search'
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            className='my-auto h-14 py-2 px-6 input-search rounded-sm text-2xl border-2 border-white outline outline-gray-200 focus:outline focus:outline-white focus:border-2 focus:border-green-600'
            placeholder='Search...'
            onChange={(e) => setExpression(e.target.value)}
          />
          <button
            value='Go'
            onClick={(e) =>
              (e.target.className =
                'text-white font-semibold text-xl bg-green-600 h-max my-auto btn-search')
            }
            className={
              expression !== ''
                ? 'bg-green-600 text-white h-max font-semibold text-xl my-auto btn-search-active'
                : 'text-white font-semibold text-xl bg-green-600 h-max my-auto btn-search'
            }
            type='submit'
          >
            Go
          </button>
        </form>
      </div>
      <Link to='/watchlist'>
        <div className='flex watchlist'>
          <div className='my-auto text-green-600'>
            <span className='text-gray-600'>
              Watchlist{' '}
              <span className='py-1 px-2 rounded-xl bg-green-200'>
                {watchlist.length}
              </span>
            </span>

            <div ref={watchlistRef}>
              <ImFilm className='mx-auto text-4xl' />
            </div>
          </div>
        </div>
      </Link>
    </nav>
  );
};

export default SearchBar;
