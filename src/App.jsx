import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Status from './Routes/Status'
import Events from './Routes/Events'
import Alerts from './Routes/Alerts'
import EventDetails from './Routes/EventDetails'


const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Status} />
          <Route path='/alerts' component={Alerts} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
