import React, { useContext, useEffect, useState } from 'react';
import BooksContext from '../context/books/booksContext';
import { Chart } from 'react-google-charts';

const GoogleChart = () => {
  const booksContext = useContext(BooksContext);
  const { books, getBooks } = booksContext;

  const [myBooks, setMyBooks] = useState(null);

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  useEffect(() => {
    const getBookData = (books) => {
      const bookData = books.map((book) => {
        return [book.title, parseInt(book.rating)];
      });

      return bookData;
    };

    if (books.length > 0) {
      setMyBooks(getBookData(books));
    }
  }, [books]);

  console.log(myBooks);

  return (
    <>
      {myBooks && (
        <div>
          <h4>Google Chart</h4>

          <Chart
            width={'800px'}
            height={'300px'}
            chartType='ColumnChart'
            loader={<div>Loading Chart</div>}
            data={[['Book', 'Rating'], ...myBooks]}
            options={{
              title: 'Book Ratings',
              chartArea: { width: '70%' },
              hAxis: {
                title: 'Rating',
              },
              vAxis: {
                title: 'Book',
              },
            }}
          />
        </div>
      )}
    </>
  );
};

export default GoogleChart;
