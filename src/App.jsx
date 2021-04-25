import React, { useState, useMemo, useEffect } from "react";
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
import axios from 'axios'
import LoginForm from "./Routes/LoginForm";

const URL_EVENTS = 'https://itil-backend.herokuapp.com/api/events';
const URL_SERVICES = 'https://itil-backend.herokuapp.com/api/activeServices';
const URL_EVENT_SERVICES = 'https://itil-backend.herokuapp.com/api/eventServices';
const URL_RULES = 'https://itil-backend.herokuapp.com/api/rules';
const URL_TEAMS = 'https://itil-backend.herokuapp.com/api/teams';
const URL_TASKS = 'https://itil-backend.herokuapp.com/api/tasks';
const URL_TASK_UPDATES = 'https://itil-backend.herokuapp.com/api/taskUpdates';

const requestEvents = axios.get(URL_EVENTS);
const requestServices = axios.get(URL_SERVICES);
const requestEventServices = axios.get(URL_EVENT_SERVICES);
const requestRules = axios.get(URL_RULES);
const requestTeams = axios.get(URL_TEAMS);
const requestTasks = axios.get(URL_TASKS);
const requestTaskUpdates = axios.get(URL_TASK_UPDATES);


const SEVERITIES_STATUSES = {
  None: 1,
  Warning: 2,
  Minor: 3,
  Major: 4,
  Critical: 5,
};

const App = () => {


  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({name: 'Guest', role: 'guest',  team: null, Subscriptions: null, subscriptionActive: {endDate: null, active: false}});

  const [eventsData, setEventsData] = useState([]);
  const [servicesData, setServicesData] = useState([])
  const [eventServices, setEventServices] = useState([]);
  const [rulesData, setRulesData] = useState([]);
  const [tasksData, setTasksData] = useState([]);
  const [teamsData, setTeamsData] = useState([]);
  const [taskUpdatesData, setTaskUpdatesData] = useState([]);
  const [eventToDisplay, setEventToDisplay] = useState(eventsData[0]);
  const [ruleToDisplay, setRuleToDisplay] = useState();
  const [taskToDisplay, setTaskToDisplay] = useState(tasksData[0]);

  const fetchData = async () => {

    try { 
      const [responseEvents, responseServices, responseEventServices, responseRules, responseTasks, responseTeams, responseTaskUpdates] = await axios.all([requestEvents, requestServices, requestEventServices, requestRules, requestTasks, requestTeams, requestTaskUpdates]);
      
      setEventsData(responseEvents.data);
      setEventToDisplay(responseEvents.data[0])
      setEventServices(responseEventServices.data);
      setServicesData(responseServices.data);
      setRulesData(responseRules.data);
      setTasksData(responseTasks.data);
      setTeamsData(responseTeams.data);
      setTaskUpdatesData(responseTaskUpdates.data);
    }
    catch (err) {
      console.log(err.message);
    }
  }

  const itemCallback = (itemType, item) => {
    if (itemType === "event") {
      setEventToDisplay(item);
    } else if (itemType === "rule") {
      setRuleToDisplay(item);
    } else if (itemType === "task") {
      setTaskToDisplay(item);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user])

  const services = useMemo(() => {
    
    // let data = servicesData.map((service) => ({
    //   ...service,
    //   events: eventServices.reduce((serviceEvents, row) =>
    //             row.service === service.id && !row.resolved ? [...serviceEvents, eventsData.find(e => e.id === row.event)] : serviceEvents,
    //             [])
    // }));

    console.log(servicesData);

    // let services = servicesData.map((serviceEvent => 
    //   (
    //     {...serviceEvent, event: eventsData.find(e => e.id === serviceEvent.event)}
    //   )));
    
    //   console.log(services);

    let services = eventServices.filter(service => eventsData.find(e => e.id === service.event).resolved === false)

    let data = servicesData.map((service) => ({
      ...service,
      events: services.reduce((serviceEvents, row) => {
        if(row.service === service.id && !service.resolved) {
          serviceEvents = [...serviceEvents, eventsData.find(e => e.id === row.event)]
        }

        return serviceEvents
      }
      ,[])
    }));

    console.log('after');
    console.log(data)



    data = data.map((service) => {
      if (!service.events || service.events.length === 0) {
        return { ...service, status: 1 }
      }

      console.log(service);

        const highestSeverity = service.events.reduce((current, { severity }) => 
        SEVERITIES_STATUSES[severity] > SEVERITIES_STATUSES[current]
          ? severity
          : current
      , "None");
        return { ...service, status: SEVERITIES_STATUSES[highestSeverity] };
      
    });
    return data
  }, [eventsData, servicesData, eventServices])

  return (
    <div className="App">
      
        {loggedIn === false && 
          <Router>
            <Switch>
            <Route path="/" exact>
              <LoginForm setLoggedIn={setLoggedIn} setUser={setUser} teamsData={teamsData}/>
            </Route>
            </Switch> 
          </Router> 
        }
        {/* {loggedIn && !user.subscriptionActive.active &&
          <Router>
            <Navbar setUser={setUser} setLoggedIn={setLoggedIn} user={user} teamsData={teamsData}/>
            <Switch>
            <Route path="/" exact>
              <Payment user={user} setUser={setUser}/>
            </Route>
            </Switch>
          </Router>
        } */}
        
        {loggedIn &&
        <Router>
        <Navbar setUser={setUser} setLoggedIn={setLoggedIn} user={user} teamsData={teamsData}/>
          <Switch>
            <Route path="/" exact>
              <Status
                services={services}
                itemCallback={itemCallback}
                eventsData={eventsData}
                tasksData={tasksData}
                user={user}
                setUser={setUser}
              />
            </Route>
            <Route path="/alerts" exact>
              <Alerts eventsData={eventsData} setEventsData={setEventsData} setEventToDisplay={setEventToDisplay} userRole={user.role} />
            </Route>
            <Route path="/alerts/:eventID/new-task" exact>
              <NewTaskForm event={eventToDisplay} tasksData={tasksData} teamsData={teamsData} setTasksData={setTasksData} fetchData={fetchData}/>
            </Route>
            <Route path="/alerts/new-event">
              <NewEventForm servicesData={servicesData} setEventsData={setEventsData} eventsData={eventsData} setEventServices={setEventServices}/>
            </Route>
            <Route path="/alerts/:eventID/edit-event">
              <EditEventForm eventsData={eventsData} servicesData={servicesData} eventServices={eventServices} setEventsData={setEventsData} eventToDisplay={eventToDisplay} setEventToDisplay={setEventToDisplay} setEventServices={setEventServices}/>
            </Route>
            <Route path="/alerts/:eventID">
              <EventDetails eventToDisplay={eventToDisplay} eventServices={eventServices} servicesData={servicesData} userRole={user.role} setEventsData={setEventsData} setEventServices={setEventServices} setTasksData={setTasksData}/>
            </Route>
            <Route path="/rules" exact>
              <Rules rulesData={rulesData} itemCallback={itemCallback} user={user}/>
            </Route>
            <Route path="/rules/new-rule" exact>
              <NewRuleForm rulesData={rulesData} setRulesData={setRulesData}/>
            </Route>
            <Route path="/rules/:ruleID/edit-rule" exact>
              <EditRuleForm ruleToDisplay={ruleToDisplay} rulesData={rulesData} setRulesData={setRulesData} setRuleToDisplay={setRuleToDisplay}/>
            </Route>
            <Route path="/rules/:ruleID">
              <RuleDetails ruleToDisplay={ruleToDisplay} user={user}/>
            </Route>
            <Route path="/tasks" exact>
              <Tasks tasksData={tasksData} setTaskToDisplay={setTaskToDisplay} setEventToDisplay={setEventToDisplay} teamsData={teamsData} eventsData={eventsData} taskUpdatesData={taskUpdatesData} user={user} setTasksData={setTasksData}/>
            </Route>
            <Route path="/tasks/:taskID/new-update">
              <TaskUpdateForm tasksData={tasksData} taskToDisplay={taskToDisplay} eventsData={eventsData} setTaskUpdatesData={setTaskUpdatesData} setEventsData={setEventsData} setTasksData={setTasksData}/>
            </Route>
          </Switch>
        </Router>
      } 
      
      
    </div>
  );
};

export default App;
