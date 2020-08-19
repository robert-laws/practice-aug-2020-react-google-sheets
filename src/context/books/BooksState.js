import React, { useReducer } from 'react';
import BooksContext from './booksContext';
import booksReducer from './booksReducer';
import { GET_BOOKS, GET_BOOKS_BY_RATING } from '../types';
import Tabletop from 'tabletop';

const BooksState = ({ children }) => {
  const initialState = {
    books: [],
    filteredBooks: [],
  };

  const [state, dispatch] = useReducer(booksReducer, initialState);

  const getBooks = async () => {
    try {
      const data = await Tabletop.init({
        key: '1P0aRc6mV1edbaAlI8Il7UWXpprhh_O1vnMhZ6jKv4-w',
        simpleSheet: true,
      });

      dispatch({ type: GET_BOOKS, payload: data });
    } catch (error) {
      console.error('Error loading spreadsheet data: ', error);
    }
  };

  const getBooksByRating = (minRating) => {
    dispatch({ type: GET_BOOKS_BY_RATING, payload: minRating });
  };

  return (
    <BooksContext.Provider
      value={{
        books: state.books,
        filteredBooks: state.filteredBooks,
        getBooks,
        getBooksByRating,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export default BooksState;
