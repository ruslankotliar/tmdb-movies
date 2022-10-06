import React from 'react';
import '../App.css';
import Films from '../features/films/Films';
import SearchBar from '../components/SearchBar';

const App = () => {
  return (
    <div className='border-4 border-green-600'>
      <SearchBar />
      <Films />
    </div>
  );
};

export default App;
