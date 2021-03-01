import React, { useMemo, useState } from 'react';
import './Tasks.scss'
import {useHistory} from 'react-router-dom';
import Task from '../components/Task'
import Team from '../components/Team';


const Tasks = ({tasksData, setTaskToDisplay, setEventToDisplay, teamsData, eventsData, taskUpdatesData, user}) => {


    let history = useHistory();


    const tasksDefault = useMemo(() => {
        console.log('new tasks data arrived');
        let data = tasksData.map((task => ({...task, expanded: false})));
        return data;
    }, [tasksData]) 
    

    const teamsDefault = useMemo(() => {
        let data = teamsData.map((team => (
            {...team, highlighted: false}
            )));
        return data;    
    }, [teamsData])
    
    

    const [displayedTasks, setDisplayedTasks] = useState(tasksDefault);
    const [teams, setTeams] = useState(teamsDefault);

    const filterTasks = (attributeValue) => {
        
        let filteredTasks = tasksDefault.reduce((filtered, taskObject) => 
            taskObject.closed === attributeValue ? [...filtered, taskObject] : filtered,
            []);

        setTeams(teamsDefault);
        setDisplayedTasks(filteredTasks);
    }

    const filterByTeam = (team) => {

        let teamsHighlighted = teamsDefault.reduce((newTeams, defaultTeam) =>
        defaultTeam.id === team.id ? [...newTeams, { ...defaultTeam, highlighted: !defaultTeam.highlighted }] : [...newTeams, defaultTeam],
        []);
        
        setTeams(teamsHighlighted);

        let tasksToDisplay = tasksDefault.reduce((filtered, taskObject) => 
        taskObject.team === team.id ? [...filtered, taskObject] : filtered,
        []);

        setDisplayedTasks(tasksToDisplay);
    }

    const displayEvent = (event) => {
        setEventToDisplay(event);
        history.push(`alerts/${event.id}`);
    }

    const displayNewUpdateForm = (task) => {
        setTaskToDisplay(task);
        history.push(`tasks/${task.id}/new-update`);
    }

    const displayAllTasks = () => {
        setTeams(teamsDefault);
        setDisplayedTasks(tasksDefault)
    }
    
    return(
        <div className='tasks-page-container'>
            <div className='tasks-container'>
                <div className='tasks-header-container'>
                    <p className='tasks-header'>Tasks</p>
                    <button onClick={() => history.goBack()}>Back</button>
                </div>
                <div className='tasks-content-container'>
                    <div className='tasks-content'>
                        <div className='tasks-content-panel'>
                            <p>Available Tasks</p>
                            <div className='tasks-content-panel-filters'>
                                <button onClick={() => displayAllTasks()}>All</button>
                                <button onClick={() => filterTasks(false)}>Active</button>
                                <button onClick={() => filterTasks(true)}>Closed</button>
                            </div>
                        </div>
                        {displayedTasks.map((task, index) => {
                            return(
                                <Task key={task.id} task={task} displayEvent={displayEvent} displayNewUpdateForm={displayNewUpdateForm} eventsData={eventsData} teamsData={teamsData} taskUpdatesData={taskUpdatesData} user={user}/>
                            )
                        })}
                    </div>
                    <div className='tasks-content'>
                        <div className='tasks-content-panel'>
                            <p>Teams</p>
                        </div>
                        {teams.map((team, index) => {
                            return(
                                <Team key={team.id} team={team} tasksData={tasksData} filterByTeam={filterByTeam}></Team>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default Tasks;