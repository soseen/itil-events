import React from 'react';
import { useParams } from 'react-router';
import './EventDetails.css';

const EventDetails = () => {

    const {eventID} = useParams()

    return(
        <div className='event-details-wrapper'>
            <p>EVENT: {eventID}</p>
        </div>
    )
}

export default EventDetails