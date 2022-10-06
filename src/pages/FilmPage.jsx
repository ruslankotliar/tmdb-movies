import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFilmVideo } from '../features/films/filmsSlice';
import { RingLoader } from 'react-spinners';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
import { GiPopcorn } from 'react-icons/gi';
import { ImFilm } from 'react-icons/im';
import { addFilm } from '../features/watchlist/watchlistSlice';

const FilmPage = () => {
  const watchlistRef = useRef();
  const dispatch = useDispatch();
  const { expression, films, isLoadingFilms, errorFilms, filmVideo } =
    useSelector((state) => state.films);
  const { watchlist } = useSelector((state) => state.watchlist);
  const { id } = useParams();
  const film = films.find((film) => film.id === parseInt(id));
  const [rank, setRank] = useState(film.vote_average);
  const [isInWatchlist, setIsInWatchlist] = useState('Watch later')

  const ratingChanged = (newRating) => {
    setRank(parseInt(newRating));
  };

  useEffect(() => {
    console.log(film);
  }, [film]);

  useEffect(() => {
    dispatch(fetchFilmVideo(film.id));
    console.log(filmVideo);
  }, []);

  useEffect(() => {
    console.log(watchlist);
  }, [watchlist]);

  useEffect(() => {
    watchlistRef.current.style.animation = 'watchlist-change 1s ease';
  }, [watchlist]);

  if (isLoadingFilms) {
    return (
      <div className='dot-loader'>
        <RingLoader color='green' size='150px' />
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
    <div className='h-screen w-screen border-4 border-green-600'>
      <nav className='flex justify-between px-20 align-center h-max w-screen overflow-hidden'>
        <Link to='/' className='my-auto'>
          <div className='my-auto'>
            <GiPopcorn className='text-green-600 logo' size='5rem' />
          </div>
        </Link>
        <div className='flex justify-center text-center my-10 text-6xl'>
          <h1 className='text-center'>{film.original_title}</h1>
        </div>
        <Link className='flex align-center' to='/watchlist'>
          <div className='flex watchlist'>
            <div className='my-auto text-green-600'>
              <span className='text-gray-600'>
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
      <div className='flex mx-40 mt-8 h-max gap-10 justify-between'>
        <div>
          <div className='flip-card'>
            <div className='flip-card-inner'>
              <div className='flip-card-front'>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${film.backdrop_path}`}
                  alt='img'
                />
              </div>
              <div className='flip-card-back'>
                <button
                  onClick={(e) => {
                    if (watchlist.find(film => film.id === parseInt(id))) {
                      setIsInWatchlist('Already there!');
                    } else {
                      dispatch(addFilm(film));
                      e.target.style.animation = 'press-btn 1s ease';
                    }
                  }}
                  className='w-full h-full button-add-watchlist text-4xl'
                >
                  {isInWatchlist}
                </button>
              </div>
            </div>
          </div>
          <h5 className='mt-4 text-xl font-bold'>Description:</h5>
          <p className='mt-1 text-md'>{film.overview}</p>
          <div className='flex align-center mt-2'>
            <ReactStars
              count={10}
              value={rank}
              size={32}
              isHalf={true}
              onChange={ratingChanged}
            />
            <span className='my-auto ml-2 font-semibold text-xl'>{rank}</span>
          </div>
        </div>
        <div>
          <iframe
            src={`https://www.youtube.com/embed/${filmVideo}`}
            width='700'
            height='500'
            allowFullScreen
            frameBorder='0'
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default FilmPage;
