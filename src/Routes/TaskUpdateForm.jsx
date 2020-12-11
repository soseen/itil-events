import React, { useState } from 'react';
import { useHistory } from 'react-router';
import './TaskUpdateForm.scss';

const TaskUpdateForm = ({tasksData, taskToDisplay, eventsData}) => {


    const assignNewId = () => {
        let newId = 1;
        if(taskToDisplay?.updates && taskToDisplay.updates.length > 0) {
            newId = taskToDisplay.updates[taskToDisplay.updates.length -1].id + 1;
        } 
        return newId;
  
    }

    const NEW_ID = assignNewId();
    const CURRENT_DATE = new Date().toISOString().slice(0, 10);

    let history = useHistory();

    const [taskClosed, setTaskClosed] = useState(false);
    const [validated, setValidated] = useState(true);
    const [newUpdate, setNewUpdate] = useState({
        id: NEW_ID,
        date: CURRENT_DATE,
        desc: '',
        status: 400
    })

    

    const handleChange = (e) => {
        setNewUpdate({
            ...newUpdate, 
            [e.target.name]: e.target.value,
        });
    }

    const validateAndSubmit = (fieldsToValidate) => {
        if(fieldsToValidate.find(s => s === '') === undefined){
            setValidated(true);
            if(taskToDisplay.updates && taskToDisplay.updates.length > 0){
                tasksData.find(task => task.id === taskToDisplay.id).updates.push(newUpdate);
            } else {
                tasksData.find(task => task.id === taskToDisplay.id).updates = [newUpdate];
            }
        tasksData.find(task => task.id === taskToDisplay.id).closed = taskClosed;
        if(newUpdate.status === 200){
            let updatedEvent = eventsData.find(event => event.id === taskToDisplay.eventID);
            updatedEvent.resolved = true;
            updatedEvent.endDate = newUpdate.date;
        }
        history.goBack();
        } else {
            setValidated(false);
        }
    }

    return(
        <div className='task-update-page-container'>
            <div className='new-update-form-container'>
                <div className='new-update-form-header'>
                        <p>New Update</p>
                        <button onClick={() => history.goBack()}>Back</button>
                </div>
                <div className ='new-update-inputs-container'>
                    <div className='new-update-inputs-validation'>
                        <p className={validated ? 'validation-message-hidden' : ''}>Please fill in all the required fields</p>
                    </div>
                    <div className='new-update-inputs'>
                        <div className='new-update-inputs-row'>
                            <label className='new-update-inputs-label input-required'>ID</label>
                            <input disabled type='text' name='id' value={NEW_ID} className='new-update-inputs-input'></input>
                        </div>
                        <div className='new-update-inputs-row'>
                            <label className='new-update-inputs-label input-required'>Description</label>
                            <input type='text' name='desc' value={newUpdate.desc} className='new-update-inputs-input' onChange={handleChange}></input>
                        </div>
                        <div className='new-update-inputs-row direction-row'>
                            <div className='new-update-inputs-column'>
                                <label className='new-update-inputs-label input-required'>Date</label>
                                <input type='date' name='date' value={newUpdate.date} className='new-update-inputs-input' onChange={handleChange}></input>
                            </div>
                            <div className='new-update-inputs-column'>
                                <label className='new-update-inputs-label input-required'>Status</label>
                                <select name='status' value={newUpdate.status} className={`new-update-inputs-select`} onChange={(e) => setNewUpdate({...newUpdate, [e.target.name]: parseInt(e.target.value)})}>
                                    <option value={400}>Active</option>
                                    <option value={200}>Resolved</option>
                                    <option value={100}>Applying Changes</option>
                                </select>
                            </div>       
                        </div>
                        <div className='new-update-inputs-row'>
                                <label className='new-update-inputs-label input-required'>Close task</label>
                                <div className='new-update-inputs-closed-buttons'>
                                    <div className='new-update-inputs-column'>
                                        <button className={taskClosed ? 'task-closed-button' : 'task-closed-button task-closed-button-highlighted'} onClick={() => setTaskClosed(false)}>False</button>
                                    </div>
                                    <div className='new-update-inputs-column'>
                                        <button className={taskClosed ? 'task-closed-button task-closed-button-highlighted' : 'task-closed-button'} onClick={() => setTaskClosed(true)}>True</button>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                <button className='add-update-button' onClick={() => validateAndSubmit([newUpdate.desc])}>Add</button>
            </div>

        </div>
    )
}

export default TaskUpdateForm;