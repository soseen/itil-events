import React, { useState, useMemo } from "react";
import "./App.scss";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Status from "./Routes/Status";
import Alerts from "./Routes/Alerts";
import Rules from "./Routes/Rules";
import Tasks from "./Routes/Tasks";
import EventDetails from "./Routes/EventDetails";
import RuleDetails from "./Routes/RuleDetails";
import NewEventForm from "./Routes/NewEventForm";
import EditEventForm from "./Routes/EditEventForm";
import EditRuleForm from "./Routes/EditRuleForm";
import NewTaskForm from "./Routes/NewTaskForm";
import NewRuleForm from "./Routes/NewRuleForm";
import TaskUpdateForm from "./Routes/TaskUpdateForm";
import { EventsData } from "./components/EventsData";
import { RulesData } from "./components/RulesData";
import { ServicesData } from "./components/ServicesData";
import { TasksData as tasksData } from './components/TasksData';
import { TeamsData as teamsData} from './components/TeamsData';

const SEVERITIES_STATUSES = {
  None: 1,
  Warning: 2,
  Minor: 3,
  Major: 4,
  Critical: 5,
};

const App = () => {
  const [eventsData, setEventsData] = useState(EventsData);
  const [rulesData, setRulesData] = useState(RulesData);
  const [eventToDisplay, setEventToDisplay] = useState(eventsData[0]);
  const [ruleToDisplay, setRuleToDisplay] = useState(RulesData[0]);
  const [taskToDisplay, setTaskToDisplay] = useState(tasksData[0]);

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
      const highestSeverity = service.events.reduce((current, { severity }) => 
        SEVERITIES_STATUSES[severity] > SEVERITIES_STATUSES[current]
          ? severity
          : current
      , "None");

      return { ...service, status: SEVERITIES_STATUSES[highestSeverity] };
    });

    return data
    // ServicesData tutaj jak bedzie to dynamiczne
  }, [eventsData]);



  const itemCallback = (itemType, item) => {
    if (itemType === "event") {
      setEventToDisplay(item);
    } else if (itemType === "rule") {
      setRuleToDisplay(item);
    } else if (itemType === "task") {
      setTaskToDisplay(item);
    console.log(ruleToDisplay);
    }
  };


  return (
    <div className="App">
      <Router>
      <Navbar />
        <Switch>
          <Route path="/" exact>
            <Status
              services={services}
              itemCallback={itemCallback}
              eventsData={eventsData}
              tasksData={tasksData}
            />
          </Route>
          <Route path="/alerts" exact>
            <Alerts eventsData={eventsData} itemCallback={itemCallback} />
          </Route>
          <Route path="/alerts/:eventID/new-task" exact>
            <NewTaskForm event={eventToDisplay} tasksData={tasksData} teamsData={teamsData}/>
          </Route>
          <Route path="/alerts/new-event">
            <NewEventForm eventsData={eventsData} services={services} setEventsData={setEventsData} />
          </Route>
          <Route path="/alerts/:eventID/edit-event">
            <EditEventForm eventsData={eventsData} services={services} setEventsData={setEventsData} eventToDisplay={eventToDisplay} setEventToDisplay={setEventToDisplay}/>
          </Route>
          <Route path="/alerts/:eventID">
            <EventDetails eventToDisplay={eventToDisplay}/>
          </Route>
          <Route path="/rules" exact>
            <Rules rulesData={rulesData} itemCallback={itemCallback} />
          </Route>
          <Route path="/rules/new-rule" exact>
            <NewRuleForm rulesData={rulesData} setRulesData={setRulesData}/>
          </Route>
          <Route path="/rules/:ruleID/edit-rule" exact>
            <EditRuleForm ruleToDisplay={ruleToDisplay} rulesData={rulesData} setRulesData={setRulesData} setRuleToDisplay={setRuleToDisplay}/>
          </Route>
          <Route path="/rules/:ruleID">
            <RuleDetails ruleToDisplay={ruleToDisplay} />
          </Route>
          <Route path="/tasks" exact>
            <Tasks tasksData={tasksData} setTaskToDisplay={setTaskToDisplay} setEventToDisplay={setEventToDisplay} teamsData={teamsData} eventsData={eventsData}/>
          </Route>
          <Route path="/tasks/:taskID/new-update">
            <TaskUpdateForm tasksData={tasksData} taskToDisplay={taskToDisplay} eventsData={eventsData} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
