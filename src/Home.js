import React, { useEffect, useContext } from 'react';
import BooksContext from './context/books/booksContext';
import MyBooks from './components/MyBooks';

const Home = () => {
  const booksContext = useContext(BooksContext);
  const { getBooks } = booksContext;

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  return (
    <div>
      <h1>App</h1>
      <MyBooks />
    </div>
  );
};

export default Home;
