import React from 'react';
import { Chart } from 'react-google-charts';

const Sheet = () => {
  return (
    <div>
      <Chart
        width={'800px'}
        height={'300px'}
        spreadSheetUrl='https://docs.google.com/spreadsheets/d/1P0aRc6mV1edbaAlI8Il7UWXpprhh_O1vnMhZ6jKv4-w'
        spreadSheetQueryParameters={{
          headers: 1,
          query: 'SELECT A, C LIMIT 5',
        }}
        chartType='ColumnChart'
        loader={<div>Loading Chart</div>}
        options={{
          title: 'Book Ratings',
          chartArea: { width: '70%' },
          hAxis: {
            title: 'Rating',
            minValue: 0,
          },
          vAxis: {
            title: 'Book',
          },
        }}
      />
    </div>
  );
};

export default Sheet;
