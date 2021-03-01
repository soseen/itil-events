import React, { useEffect, useMemo, useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp} from 'react-icons/md';
import './Task.scss'
import { AiFillPlusCircle, AiOutlinePlus } from 'react-icons/ai';
import { axios } from '../Axios';

const Task = ({task, displayEvent, displayNewUpdateForm, eventsData, teamsData, taskUpdatesData, user}) => {


    const updates = useMemo(() => {
        const data = taskUpdatesData.reduce((taskUpdates, update) =>
        update.task === task.id ? [...taskUpdates, update] : taskUpdates,
        []);

        return data
    }, [taskUpdatesData, task]) 

    const newTaskProperties = {
        ...task,
        event : eventsData.find(e => e.id === task.event),
        team : teamsData.find(t => t.id === task.team),
        updates : updates,
    }


    const [taskDetails, setTaskDetails] = useState(newTaskProperties);


    const displayTaskDetails = () => {
        setTaskDetails({
            ...taskDetails, 
                expanded: !taskDetails.expanded
        })
    }

    const openRequiredTasks = () => {
        if(taskDetails.closed && taskDetails.updates.find(u => u.status !== 400) === undefined){
            axios.put(`api/tasks/${task.id}`, {
                ...task,
                closed: false
            }).then((response) => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
            axios.put(`api/events/${task.event}`, {
                ...taskDetails.event,
                resolved: false,
                endDate: null
            }).then((response) => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
        }
    }

    useEffect(() => {
        openRequiredTasks()
    },[])

    return(
    <div className={taskDetails.expanded? 'task-container task-container-expanded' : 'task-container'} onClick={displayTaskDetails}>
        <div key={taskDetails.id} className='task-header-container'>
            <div className={taskDetails.closed ? 'task-status-box task-closed' : 'task-status-box task-active' }>{taskDetails.id}</div>
            <div className='task-details'>
                <p className='task-details-name'>{taskDetails.name}</p>
                <p className='task-details-date'>{taskDetails.startDate}</p>
            </div>
            <div className='task-arrow-container'>
                {taskDetails.expanded === true ?
                    <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />
                }
                
            </div>
        </div>
        {taskDetails.expanded === true &&
            <div className='task-expanded-container'>
                <div className='task-expanded-details'>
                    <div className='task-expanded-details-header'>
                        <p>Task Details</p>
                    </div>
                    <div className='task-expanded-details-info'>
                        <div>
                        <label>View Event</label>
                        <button onClick={() => displayEvent(taskDetails.event)}>Display</button>
                        </div>
                        <div>
                        <label>Team</label>
                        <p>{taskDetails.team.name}</p>
                        </div>
                        <div>
                        <label>Last Update</label>
                        <p>{taskDetails.updates.length > 0 ? taskDetails.updates[taskDetails.updates.length - 1].date : '-'}</p>
                        </div>
                        
                    </div>
                </div>
                {updates.map((update, index) => {
                    return(
                    <div key={update.id} className='task-update-container'>
                        <div className='task-update-header'>
                            <div className='update-desc'>
                                {update.description}
                            </div>
                            <div className='task-update-status'>
                                <label>Status</label>
                                {update.status === 400 && 
                                    <p><span className={`span-status-${update.status}`}>Active</span></p>
                                }
                                {update.status === 200 && 
                                    <p><span className={`span-status-${update.status}`}>Resolved</span></p>
                                }
                                {update.status === 100 && 
                                    <p><span className={`span-status-${update.status}`}>Applying Changes</span></p>
                                }
                            </div>
                        </div>
                        <div className='task-update-details-container'>
                            <div className='task-update-details'>
                                <label>ID</label>
                                <p>{update.id}</p>
                            </div>
                            <div className='task-update-details'>
                                <label>Date</label>
                                <p>{update.date}</p>
                            </div>
                        </div>
                    </div>
                    )
                    })
                }{user.team === taskDetails.team.id &&
                    <div className={taskDetails.closed ? 'task-expanded-new-update new-update-hidden' : 'task-expanded-new-update'}>
                    <p>New Update</p>
                    <button className='new-update-button' onClick={() => displayNewUpdateForm(task)}>
                     {/* <AiFillPlusCircle /> */}
                     <AiOutlinePlus />
                    </button>
                </div>
                }  
            </div>
        }
    </div>
    
    )
}

export default Task;