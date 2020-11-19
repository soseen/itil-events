import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Status from './Routes/Status'
import Tasks from './Routes/Tasks'
import Alerts from './Routes/Alerts'
import Rules from './Routes/Rules'
import EventDetails from './Routes/EventDetails'


const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Status} />
          <Route path='/alerts' component={Alerts} />
          <Route path='/rules' component={Rules} />
          <Route path='/tasks' component={Tasks} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
