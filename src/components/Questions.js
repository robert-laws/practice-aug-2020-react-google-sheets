import React, { useContext, useEffect, useState } from 'react';
import BooksContext from '../context/books/booksContext';
import { Chart } from 'react-google-charts';

const Questions = () => {
  const booksContext = useContext(BooksContext);
  const { questions, getQuestions } = booksContext;

  const [questionsByType, setQuestionsByType] = useState(null);
  const [questionsByDuration, setQuestionsByDuration] = useState(null);
  const [questionsByLocation, setQuestionsByLocation] = useState(null);
  const [questionsByDate, setQuestionsByDate] = useState(null);

  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  useEffect(() => {
    if (questions) {
      setQuestionsByType(addAndSortEntries(questions, 'type'));
    }
  }, [questions]);

  useEffect(() => {
    if (questions) {
      setQuestionsByDuration(addAndSortEntries(questions, 'duration'));
    }
  }, [questions]);

  useEffect(() => {
    if (questions) {
      setQuestionsByLocation(addAndSortEntries(questions, 'location'));
    }
  }, [questions]);

  useEffect(() => {
    if (questions) {
      setQuestionsByDate(Object.entries(addEntries(questions, 'date')));
    }
  }, [questions]);

  const addEntries = (array, field) => {
    const data = {};

    array.forEach((item) => {
      const dataField = item[field];

      if (data[dataField]) {
        data[dataField]++;
      } else {
        data[dataField] = 1;
      }
    });

    return data;
  };

  const addAndSortEntries = (array, field) => {
    const data = {};

    array.forEach((item) => {
      const dataField = item[field];

      if (data[dataField]) {
        data[dataField]++;
      } else {
        data[dataField] = 1;
      }
    });

    let sortable = [];

    for (let field in data) {
      sortable.push([field, data[field]]);
    }

    sortable.sort(function (a, b) {
      return b[1] - a[1];
    });

    console.log(sortable);

    return sortable;
  };

  return (
    <>
      <div>
        <h4>Questions</h4>
        {questionsByType && (
          <Chart
            width={'800px'}
            height={'300px'}
            chartType='ColumnChart'
            loader={<div>Loading Chart</div>}
            data={[['Question', 'Count'], ...questionsByType]}
            options={{
              title: 'Questions Count',
              chartArea: { width: '70%' },
              hAxis: {
                title: 'Question',
              },
              vAxis: {
                title: 'Count',
                minValue: 0,
                maxValue: 10,
                format: '0',
              },
            }}
          />
        )}
      </div>
      <hr />
      <div>
        <h4>Questions</h4>
        {questionsByDuration && (
          <Chart
            width={'800px'}
            height={'300px'}
            chartType='ColumnChart'
            loader={<div>Loading Chart</div>}
            data={[['Question', 'Count'], ...questionsByDuration]}
            options={{
              title: 'Questions Count',
              chartArea: { width: '70%' },
              hAxis: {
                title: 'Count',
              },
              vAxis: {
                title: 'Duration',
              },
            }}
          />
        )}
      </div>
      <hr />
      <div>
        <h4>Questions</h4>
        {questionsByLocation && (
          <Chart
            width={'800px'}
            height={'300px'}
            chartType='ColumnChart'
            loader={<div>Loading Chart</div>}
            data={[['Question', 'Count'], ...questionsByLocation]}
            options={{
              title: 'Questions Count',
              chartArea: { width: '70%' },
              hAxis: {
                title: 'Count',
              },
              vAxis: {
                title: 'Location',
              },
            }}
          />
        )}
      </div>
      <hr />
      <div>
        <h4>Questions</h4>
        {questionsByDate && (
          <Chart
            width={'800px'}
            height={'300px'}
            chartType='LineChart'
            loader={<div>Loading Chart</div>}
            data={[['Question', 'Count'], ...questionsByDate]}
            options={{
              title: 'Questions Count',
              chartArea: { width: '70%' },
              pointSize: 5,
              hAxis: {
                title: 'Date',
              },
              vAxis: {
                title: 'Questions',
                minValue: 0,
                maxValue: 10,
                format: '0',
              },
            }}
          />
        )}
      </div>
    </>
  );
};

export default Questions;
