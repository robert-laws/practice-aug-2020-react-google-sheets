import React from 'react';
import Home from './Home';
import GoogleChart from './components/GoogleChart';
import Sheet from './components/Sheet';
import Questions from './components/Questions';
import BooksState from './context/books/BooksState';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BooksState>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/google'>
            <GoogleChart />
          </Route>
          <Route path='/sheet'>
            <Sheet />
          </Route>
          <Route path='/questions'>
            <Questions />
          </Route>
        </Switch>
      </Router>
    </BooksState>
  );
}

export default App;
