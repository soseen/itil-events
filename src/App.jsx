import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Status from './Routes/Status'
import Alerts from './Routes/Alerts'
import Rules from './Routes/Rules'
import EventDetails from './Routes/EventDetails'
import RuleDetails from './Routes/RuleDetails'
import NewEventForm from './Routes/NewEventForm'
import {EventsData} from './components/EventsData'
import {RulesData} from './components/RulesData';
import { ServicesData } from './components/ServicesData';


const App = () => {

  const [eventToDisplay, setEventToDisplay] = useState(EventsData[0]);
  const [ruleToDisplay, setRuleToDisplay] = useState(RulesData[0]);
  const [services, setServices] = useState(ServicesData);
  const [eventsData, setEventsData] = useState(EventsData);

    useEffect(() => {
        
      let serviceArray = services;

        for(let i=0; i<serviceArray.length; i++){
            serviceArray[i].events = [];
            serviceArray[i].status = 1;
        }

        for(let i=0; i< serviceArray.length; i++){
            for(let j=0; j<eventsData.length; j++){
                if(eventsData[j].service !== null ){
                    eventsData[j].service.forEach(element => {
                        // console.log(`serwis ${serviceArray[i].id}`);
                        // console.log(`zdarzenie ${element}`);
                        if(element === serviceArray[i].id){
                            serviceArray[i].events = [...serviceArray[i].events, eventsData[j]];
                            if(eventsData[j].severity === 'Critical' && serviceArray[i].status < 5){
                                serviceArray[i].status = 5;
                            } else if (eventsData[j].severity === 'Major' && serviceArray[i].status < 4) {
                                serviceArray[i].status = 4;
                            } else if (eventsData[j].severity === 'Minor' && serviceArray[i].status < 3) {
                                serviceArray[i].status = 3;
                            } else if (eventsData[j].severity === 'Warning' && serviceArray[i].status < 2) {
                                serviceArray[i].status = 2;
                            }
                        }
                    });
                }
            }
        }

        console.log(serviceArray);
        setServices(serviceArray);
    }, [services, eventsData]);

  
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
        <Switch>
          <Route path='/' exact>
            <Status services={services} itemCallback={itemCallback} eventsData={eventsData}/>
          </Route>
          <Route path='/alerts' exact>
            <Alerts eventsData={eventsData} itemCallback={itemCallback}/>
          </Route>
          <Route path='/alerts/:eventID'>
            <EventDetails eventToDisplay={eventToDisplay} exact/>
          </Route>
          <Route path='/event-form'>
            <NewEventForm eventsData={eventsData} services={services}/>
          </Route>
          <Route path='/rules' exact>
            <Rules rulesData={RulesData} itemCallback={itemCallback}/>
          </Route>
          <Route path='/rules/:ruleID'>
            <RuleDetails ruleToDisplay={ruleToDisplay} />
          </Route>
        </Switch>
        <Navbar />
      </Router>
    </div>
  );
}

export default App;
