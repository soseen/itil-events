import React, { useState } from 'react'
import {useHistory} from 'react-router-dom';
import './NewTaskForm.scss';

const NewTaskForm = ({event, tasksData}) => {

    const assignNewId = () => {
        if(tasksData && tasksData.length > 0) {
            return tasksData[tasksData.length -1].id + 1;
        } else {
            return 1;
        }
    }
    
    const CURRENT_DATE = new Date().toISOString().slice(0, 10);
    const NEW_ID = assignNewId();

    let history = useHistory();

    const [validated, setValidated] = useState(true);
    const [newTask, setNewTask] = useState({
        id: NEW_ID,
        name: '',
        eventID: event.id,
        startDate: CURRENT_DATE,
        closed: false,
        updates: null
    })

    const handleChange = (e) => {
        setNewTask({
            ...newTask, 
            [e.target.name]: e.target.value,
        });
    }

    const validateAndSubmit = (fieldsToValidate) => {
        if(fieldsToValidate.find(s => s === '') === undefined){
            setValidated(true);
            tasksData.push(newTask);
            history.push('/alerts');
         } else {
            setValidated(false);
         }
    }

    return(
        <div className ='task-page-container'>
            <div className='new-task-form-container'> 
                <div className='new-task-form-header'>
                    <p>New Task</p>
                    <button onClick={() => history.goBack()}>Back</button>
                </div>
                <div className='new-task-inputs-container'>
                    <div className='new-task-inputs-validation'>
                        <p className={validated ? 'validation-message-hidden' : ''}>Please fill in all the required fields</p>
                    </div>
                    <div className='new-task-inputs'>
                        <div className='new-task-inputs-row'>
                            <label className='new-task-inputs-label input-required'>ID</label>
                            <input disabled type='text' name='id' value={NEW_ID} className='new-task-inputs-input'></input>
                        </div>
                        <div className='new-task-inputs-row'>
                            <label className='new-task-inputs-label input-required'>Name</label>
                            <input type='text' name='name' value={newTask.name} className='new-task-inputs-input' onChange={handleChange}></input>
                        </div>
                        <div className='new-task-inputs-row'>
                            <label className='new-task-inputs-label input-required'>Date</label>
                            <input type='date' name='startDate' value={newTask.startDate} className='new-task-inputs-input' onChange={handleChange}></input>
                        </div>
                    </div>
                    <div className='new-task-inputs'>
                        <div className='new-task-inputs-row'>
                            <label className='new-task-inputs-label'>Event Details</label>
                            <div className='new-task-event-container'>
                            <div className='new-task-event-header'>
                                <p className='new-task-event-id'>{event.id}</p>
                                <p className='new-task-event-desc'>{event.desc}</p>
                            </div>
                            <div className='new-task-event-details'>
                                <div className='new-task-event-row'>
                                    <div className='new-task-event-column'>
                                    <label>Severity</label>
                                    <p>{event.severity}</p>
                                    </div>
                                    <div className='new-task-event-column'>
                                    <label>Source</label>
                                    <p>{event.source}</p>
                                    </div>
                                </div>
                                <div className='new-task-event-row'>
                                <div className='new-task-event-column'>
                                    <label>Start Date</label>
                                    <p>{event.startDate}</p>
                                    </div>
                                    <div className='new-task-event-column'>
                                    <label>End Date</label>
                                    <p>{event.endDate ? event.endDate : '-'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <button className='add-task-button' onClick={() => validateAndSubmit([newTask.name, newTask.startDate])}>Add</button>
            </div>
        </div>
    )
}

export default NewTaskForm