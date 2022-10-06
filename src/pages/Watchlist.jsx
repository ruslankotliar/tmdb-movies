import React, { useEffect, useRef } from 'react';
import { GiPopcorn } from 'react-icons/gi';
import { ImFilm } from 'react-icons/im';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Watchlist = () => {
  const watchlistRef = useRef();
  const { watchlist } = useSelector((state) => state.watchlist);

  useEffect(() => {
    console.log(watchlist);
  }, [watchlist]);

  return (
    <div
      className={
        watchlist.length <= 4
          ? 'overflow-hidden h-screen w-screen border-4  border-green-600'
          : 'overflow-hidden h-max w-screen border-4  border-green-600'
      }
    >
      <nav className='flex justify-between px-20 align-center h-max w-screen overflow-hidden'>
        <Link to='/' className='my-auto'>
          <div className='my-auto'>
            <GiPopcorn className='text-green-600 logo' size='5rem' />
          </div>
        </Link>
        <div className='flex justify-center text-center my-10 text-6xl'>
          <h1 className='text-center'>Movies to watch later</h1>
        </div>
        <div className='flex watchlist'>
          <div className='my-auto w-max text-green-600'>
            <span className='inline w-max text-gray-600'>
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
      </nav>
      <div className='grid gap-8 grid-cols-4 justify-around mx-10 my-5 overflow-hidden'>
        {watchlist.map((film) => (
          <div className='relative'>
            <img
              className='img-watchlist'
              src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
              alt='img'
            />
            <div className='hover-container'>
              <Link to={`/watchlist/${film.id}`}>
                <div className='on-img-hover-div flex justify-center align-center'>
                  <button className='text-4xl text-white font-bold'>
                    Watch now
                  </button>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
