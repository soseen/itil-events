import React, { useState, useMemo } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Status from "./Routes/Status";
import Alerts from "./Routes/Alerts";
import Rules from "./Routes/Rules";
import EventDetails from "./Routes/EventDetails";
import RuleDetails from "./Routes/RuleDetails";
import NewEventForm from "./Routes/NewEventForm";
import { EventsData as eventsData } from "./components/EventsData";
import { RulesData } from "./components/RulesData";
import { ServicesData } from "./components/ServicesData";

const SEVERITIES_STATUSES = {
  None: 1,
  Warning: 2,
  Minor: 3,
  Major: 4,
  Critical: 5,
};

const App = () => {
  const [eventToDisplay, setEventToDisplay] = useState(eventsData[0]);
  const [ruleToDisplay, setRuleToDisplay] = useState(RulesData[0]);

  const services = useMemo(() => {
    let data = ServicesData.map((service) => ({
      ...service,
      events: eventsData.reduce((serviceEvents, event) => {
        if (!event.service) {
          return serviceEvents;
        }
        const newEvents = event.service.reduce(
          (events, eventServiceId) =>
            eventServiceId === service.id ? [...events, event] : events,
          []
        );
        return [...serviceEvents, ...newEvents];
      }, []),
      status: 1,
    }));
  
    data = data.map((service) => {
      if (!service.events || service.events.length === 0) {
        return service;
      }
      const highestSeverity = service.events.reduce((current, { severity }) => {
        console.log("current", current);
        console.log("severity", severity);
        return SEVERITIES_STATUSES[severity] > SEVERITIES_STATUSES[current]
          ? severity
          : current;
      }, "None");

      return { ...service, status: SEVERITIES_STATUSES[highestSeverity] };
    });

    return data
    // potem dodaj ServicesData tutaj jak bedzie to dynamiczne
  }, [])



  const itemCallback = (itemType, item) => {
    if (itemType === "event") {
      setEventToDisplay(item);
    } else if (itemType === "rule") {
      setRuleToDisplay(item);
    }
    console.log(ruleToDisplay);
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Status
              services={services}
              itemCallback={itemCallback}
              eventsData={eventsData}
            />
          </Route>
          <Route path="/alerts" exact>
            <Alerts eventsData={eventsData} itemCallback={itemCallback} />
          </Route>
          <Route path="/alerts/:eventID">
            <EventDetails eventToDisplay={eventToDisplay} exact />
          </Route>
          <Route path="/event-form">
            <NewEventForm eventsData={eventsData} services={services} />
          </Route>
          <Route path="/rules" exact>
            <Rules rulesData={RulesData} itemCallback={itemCallback} />
          </Route>
          <Route path="/rules/:ruleID">
            <RuleDetails ruleToDisplay={ruleToDisplay} />
          </Route>
        </Switch>
        <Navbar />
      </Router>
    </div>
  );
};

export default App;
