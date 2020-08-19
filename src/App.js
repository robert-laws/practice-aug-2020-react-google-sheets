import React from 'react';
import './App.css';
import Home from './Home';
import BooksState from './context/books/BooksState';

function App() {
  return (
    <BooksState>
      <Home />
    </BooksState>
  );
}

export default App;
