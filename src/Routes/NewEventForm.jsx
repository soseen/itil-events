import React from 'react';
import './NewEventForm.css';

const NewEventForm = ({eventsData, services}) => {

    return(
        <div className='page-container'>
            <div className='new-event-form-container'>
                <div className='new-event-form-header'>
                    <p>New Event</p>
                </div>
                <div className='new-event-inputs-container'>
                    <div className='new-event-inputs'>

                    </div>
                    <div className='new-event-inputs'>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewEventForm