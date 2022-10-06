import React, { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GiPopcorn } from 'react-icons/gi';
import { ImFilm } from 'react-icons/im';

const WatchlistFilm = () => {
  const watchlistRef = useRef();
  const { id } = useParams();
  const { expression, films, isLoadingFilms, errorFilms, filmVideo } =
    useSelector((state) => state.films);
  const film = films.find((film) => film.id === parseInt(id));
  const { watchlist } = useSelector((state) => state.watchlist);

  return (
    <div className='relative h-screen w-screen border-4 border-green-600'>
      <nav className='flex opacity-0 hover:opacity-100 transition-all absolute top-0 mt-16 justify-between px-20 align-center h-max w-screen overflow-hidden'>
        <Link to='/' className='my-auto'>
          <div className='my-auto'>
            <GiPopcorn className='text-green-600 logo' size='5rem' />
          </div>
        </Link>
        <Link className='flex align-center' to='/watchlist'>
          <div className='flex watchlist'>
            <div className='my-auto text-green-600'>
              <span className='text-white'>
                Watchlist{' '}
                <span className='py-1 text-black px-2 rounded-xl bg-green-200'>
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
      <div className='flex align-center h-full justify-center'>
        <iframe
          className='m-auto'
          src={`https://www.youtube.com/embed/${filmVideo}`}
          width='99.5%'
          height='99%'
          allowFullScreen
          frameBorder='0'
        ></iframe>
      </div>
    </div>
  );
};

export default WatchlistFilm;
