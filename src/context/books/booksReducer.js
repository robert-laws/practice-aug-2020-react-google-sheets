import { GET_BOOKS, GET_BOOKS_BY_RATING, GET_QUESTIONS } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload,
        filteredBooks: action.payload,
      };

    case GET_BOOKS_BY_RATING:
      return {
        ...state,
        filteredBooks: state.books.filter(
          (book) => parseInt(book.rating) >= parseInt(action.payload)
        ),
      };

    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      };

    default:
      return state;
  }
};
