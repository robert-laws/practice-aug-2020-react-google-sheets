import React, { useEffect, useState, useContext } from 'react';
import BooksContext from '../context/books/booksContext';
import { Bar } from 'react-chartjs-2';

const MyBooks = () => {
  const booksContext = useContext(BooksContext);
  const { books, getBooks } = booksContext;

  useEffect(() => {
    getBooks();
    // eslint-disable-next-line
  }, []);

  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    processLabels(books);
    processValues(books);
  }, [books]);

  const processLabels = (bookData) => {
    const myLabels = bookData.map((book) => {
      return book.title;
    });
    setLabels(myLabels);
  };

  const processValues = (bookData) => {
    const myValues = bookData.map((book) => {
      return book.rating;
    });
    setValues(myValues);
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Book Ratings',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: values,
      },
    ],
  };

  if (!books) {
    return (
      <div>
        <h4>No Books...</h4>
      </div>
    );
  }

  return (
    <div>
      <h3>Book List</h3>
      <ul>
        {books.map((book) => (
          <li key={book.title}>
            {book.title} ({book.year}) - Rating {book.rating}
          </li>
        ))}
      </ul>
      <hr />
      <h3>Book Ratings</h3>
      <div>
        <h4>Bar Chart</h4>
        <Bar
          data={data}
          width={100}
          height={200}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    max: 10,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
};

export default MyBooks;
