import React, { useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp} from 'react-icons/md';
import './Task.scss'
import {EventsData as eventsData} from './EventsData';
import { AiFillPlusCircle, AiOutlinePlus } from 'react-icons/ai';

const Task = ({task, displayEvent, displayNewUpdateForm}) => {


    
    const [taskDetails, setTaskDetails] = useState(task);
    const eventToDisplay = eventsData.find(e => e.id === task.eventID);

    const displayTaskDetails = () => {
        setTaskDetails({
            ...taskDetails, 
                expanded: !taskDetails.expanded
        })
    }

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
                        <button onClick={() => displayEvent(eventToDisplay)}>Display</button>
                        </div>
                        <div>
                        <label>Team</label>
                        <p>{taskDetails.team.name}</p>
                        </div>
                        <div>
                        <label>Last Update</label>
                        <p>{taskDetails.updates? taskDetails.updates[taskDetails.updates.length - 1].date : '-'}</p>
                        </div>
                        
                    </div>
                </div>
                {taskDetails?.updates && taskDetails.updates.map((update, index) => {
                    return(
                    <div key={index} className='task-update-container'>
                        <div className='task-update-header'>
                            <div className='update-desc'>
                                {update.desc}
                            </div>
                            <div className='task-update-status'>
                                <label>Status: <span className={`span-status-${update.status}`}>{update.status}</span></label>
                                {update.status === 400 &&
                                <p>Active</p>
                                }
                                {update.status === 200 &&
                                <p>Resolved</p>
                                }
                                {update.status === 100 &&
                                <p>Applying changes</p>
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
                }
                <div className={taskDetails.closed ? 'task-expanded-new-update new-update-hidden' : 'task-expanded-new-update'}>
                    <p>New Update</p>
                    <button className='new-update-button' onClick={() => displayNewUpdateForm(task)}>
                     {/* <AiFillPlusCircle /> */}
                     <AiOutlinePlus />
                    </button>
                </div>
            </div>
        }
    </div>
    
    )
}

export default Task;