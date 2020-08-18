import React, { useReducer } from 'react';
import BooksContext from './booksContext';
import booksReducer from './booksReducer';
import { GET_BOOKS } from '../types';
import Tabletop from 'tabletop';

const BooksState = ({ children }) => {
  const initialState = {
    books: [],
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

  return (
    <BooksContext.Provider
      value={{
        books: state.books,
        getBooks,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export default BooksState;
