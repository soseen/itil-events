import React, { useState } from 'react';
import './Tasks.scss'
import {useHistory} from 'react-router-dom';
import Task from '../components/Task'


const Tasks = ({tasksData, itemCallback}) => {

    console.log(tasksData);

    let history = useHistory();

    let taskArray = tasksData.map((task => ({...task, expanded: false})));
    const [displayedTasks, setDisplayedTasks] = useState(taskArray);

    const filterTasks = (attributeValue) => {
        
        let filteredTasks = taskArray.reduce((filtered, taskObject) => 
            taskObject.closed === attributeValue ? [...filtered, taskObject] : filtered,
            []);
        console.log(filteredTasks);
        setDisplayedTasks(filteredTasks);
    }

    const displayEvent = (event) => {
        itemCallback('event', event);
        history.push(`alerts/${event.id}`);
    }

    const displayNewUpdateForm = (task) => {
        itemCallback('task', task);
        history.push(`tasks/${task.id}/new-update`);
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
                            <button onClick={() => setDisplayedTasks(taskArray)}>All</button>
                            <button onClick={() => filterTasks(false)}>Active</button>
                            <button onClick={() => filterTasks(true)}>Closed</button>
                        </div>
                    </div>
                        {displayedTasks.map((task, index) => {
                            return(
                                <Task key={task.id} task={task} displayEvent={displayEvent} displayNewUpdateForm={displayNewUpdateForm}/>
                            )
                        })}
                    </div>
                    <div className='tasks-content'>
                        
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default Tasks;