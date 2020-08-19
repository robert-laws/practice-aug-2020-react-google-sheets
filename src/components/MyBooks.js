import React, { useEffect, useState, useContext } from 'react';
import BooksContext from '../context/books/booksContext';
import { Bar } from 'react-chartjs-2';

const MyBooks = () => {
  const booksContext = useContext(BooksContext);
  const { books, filteredBooks, getBooks, getBooksByRating } = booksContext;

  useEffect(() => {
    getBooks();
    // eslint-disable-next-line
  }, []);

  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const [myRating, setMyRating] = useState(0);

  useEffect(() => {
    processLabels(filteredBooks);
    processValues(filteredBooks);
  }, [filteredBooks]);

  useEffect(() => {
    getBooksByRating(myRating);
  }, [myRating]);

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

  const handleChange = (event) => {
    const rating = event.target.value;
    setMyRating(rating);
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
        {filteredBooks.map((book) => (
          <li key={book.title}>
            {book.title} ({book.year}) - Rating {book.rating}
          </li>
        ))}
      </ul>
      <hr />
      <h3>Book Ratings</h3>
      <p>Filter by Min Rating</p>
      <select name='myRatingSelect' value={myRating} onChange={handleChange}>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
        <option value='6'>6</option>
        <option value='7'>7</option>
        <option value='8'>8</option>
        <option value='9'>9</option>
        <option value='10'>10</option>
      </select>
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
