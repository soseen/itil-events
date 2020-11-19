import React from 'react';
import { useParams } from 'react-router';
import './EventDetails.css';

const EventDetails = (eventItem) => {

    console.log(eventItem.eventItem);

    return(
        <div className='event-details-wrapper'>
            <p>EVENT: {eventItem.eventItem.desc}</p>
        </div>
    )
}

export default EventDetails