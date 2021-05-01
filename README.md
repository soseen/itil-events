# Event Management App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

* [General info](#general-info)
* [How to use](#how-to-use)
* [Roles](#roles)
* [Technologies](#technologies)


## General Info

Application allows user to manage events occuring wihting the examined IT infrastructure according to the ITIL v3 standards.
Application consists of:
* [Status view](#status)
* [Alerts view](#alerts)
* [Rules view](#rules)
* [Tasks view](#tasks)

#### Status

Dashboard used as a main tool to gather the necessary information about the current state of IT infrastructure. IT services are shown as tiles where size of a particular tile represents its priority while its color describes an event with the highest severity that is related to this service. Related events are listed below. Status view also gives an access to the charts that are graphical representation of the events and tasks data that user can use to quickly identify what's happening within the examined system.

### Alerts

List of events occuring in the system. Events can be filtered based on the event severity or whether they habe been resolved already. User with a system role also has an access to the `New Event` button

### Rules

List of rules for the monitoring system. Rules can be displayed based on the severity of an event that they cause using the buttons above the list. Users with an expert role can also use the `New Rule` button.

### Tasks

List of all the tasks in the system that can be filtered by their status or by teams they are assigned to. User with an expert role can complete tasks that are related to the team he is a part of by adding task updates describing actions taken.

### How to use

- Open https://brave-montalcini-9ba6c0.netlify.app
- Register your expert account and sign up to one of the available expert teams
- Log in to the App
- Display IT status to look for events that need to be resolved
- Navigate to the related event either from the navigation menu (`Events`) or by choosing the event from the list
- Click `Apply Task` button to create a new task
- Fill the form with the required information
- Display tasks by choosing `Tasks` from the navigation menu
- Choose a task that needs your attention and is assigned to your team
- Click `+` button in task details to create a new task update
- Fill the form by describing actions taken in order to resolve the event
- Define task and event status and proceed to add the task update
- If required add a new rule for the monitoring system by choosing `Rules` from the navigation menu and then `New Rule` button

### Roles

- System - has most functionalities related to the monitoring tool
  * create update and delete events
  * categorize events
  * display App data
- Expert - has functionalities related to the Service Desk definition
  * create Tasks
  * resolve events through task completion
  * create update and delete rules for the monitoring system
  * display App data

### Technologies

- React.js
- Sass
- Axios
- React Hooks
- React Router
- Node.js
- Sequelize
- Spring
- Hibernate
- PostgreSQL
- Heroku
- Netlify

