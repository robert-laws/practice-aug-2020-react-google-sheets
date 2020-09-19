import React, { useReducer, useCallback } from 'react';
import BooksContext from './booksContext';
import booksReducer from './booksReducer';
import { GET_BOOKS, GET_BOOKS_BY_RATING, GET_QUESTIONS } from '../types';
import Tabletop from 'tabletop';

//docs.google.com/spreadsheets/d/1nZnOtoeFYsAIAcAtq8abopnt2TFdsR2uz72kxYjrVZs/edit?usp=sharing

const BooksState = ({ children }) => {
  const initialState = {
    books: [],
    filteredBooks: [],
    questions: null,
  };

  const [state, dispatch] = useReducer(booksReducer, initialState);

  const getBooks = useCallback(async () => {
    try {
      const data = await Tabletop.init({
        key: '1P0aRc6mV1edbaAlI8Il7UWXpprhh_O1vnMhZ6jKv4-w',
        simpleSheet: true,
      });

      dispatch({ type: GET_BOOKS, payload: data });
    } catch (error) {
      console.error('Error loading spreadsheet data: ', error);
    }
  }, [dispatch]);

  const getQuestions = useCallback(async () => {
    try {
      const data = await Tabletop.init({
        key: '1nZnOtoeFYsAIAcAtq8abopnt2TFdsR2uz72kxYjrVZs',
        simpleSheet: true,
      });

      dispatch({ type: GET_QUESTIONS, payload: data });
    } catch (error) {
      console.log('Error getting questions data: ', error);
    }
  }, [dispatch]);

  // const fetchUsername = useCallback(async () => {
  //   const response = await fetch(
  //     "https://jsonplaceholder.typicode.com/users/" + id
  //   );
  //   const user = await response.json();
  //   dispatch({ type: "setUsername", usernameUpdated: user.name });
  // }, [dispatch]);

  const getBooksByRating = useCallback(
    (minRating) => {
      dispatch({ type: GET_BOOKS_BY_RATING, payload: minRating });
    },
    [dispatch]
  );

  return (
    <BooksContext.Provider
      value={{
        books: state.books,
        filteredBooks: state.filteredBooks,
        questions: state.questions,
        getBooks,
        getBooksByRating,
        getQuestions,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export default BooksState;
