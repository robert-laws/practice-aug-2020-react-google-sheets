import React from 'react';
import './App.css';
import MyBooks from './components/MyBooks';
import BooksState from './context/books/BooksState';

function App() {
  return (
    <BooksState>
      <div className='App'>
        <h1>App</h1>
        <MyBooks />
      </div>
    </BooksState>
  );
}

export default App;
