import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Status from './Routes/Status'
import Alerts from './Routes/Alerts'
import Rules from './Routes/Rules'
import EventDetails from './Routes/EventDetails'
import RuleDetails from './Routes/RuleDetails'
import {EventsData} from './components/EventsData'
import { useHistory } from 'react-router-dom';
import {RulesData} from './components/RulesData';
import { ServicesData } from './components/ServicesData';


const App = () => {

  let history = useHistory();
  const [eventToDisplay, setEventToDisplay] = useState(EventsData[0]);
  const [ruleToDisplay, setRuleToDisplay] = useState(RulesData[0]);

  // useEffect(() => {
  //   eventsData.forEach(element => {
      
  //   });
  // }, [])


  console.log(EventsData);
  
  const itemCallback = (itemType, item) => {
    
    if(itemType === 'event'){
      setEventToDisplay(item);
    }
    else if(itemType === 'rule'){
      setRuleToDisplay(item)
    }
    console.log(ruleToDisplay);
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact>
            <Status servicesData={ServicesData} eventsData={EventsData} />
          </Route>
          <Route path='/alerts' exact>
            <Alerts eventsData={EventsData} itemCallback={itemCallback}/>
          </Route>
          <Route path='/alerts/:eventID'>
            <EventDetails eventToDisplay={eventToDisplay} />
          </Route>
          <Route path='/rules' exact>
            <Rules rulesData={RulesData} itemCallback={itemCallback}/>
          </Route>
          <Route path='/rules/:ruleID'>
            <RuleDetails ruleToDisplay={ruleToDisplay} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
