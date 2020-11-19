import React from 'react';
import './Events.css'

const Events = () => {
    return(
        <div className='page-container'>
            <h1 className='page-title'>Events</h1>

            <div className='event-card'>
                <div className='event-card-upper'>
                    <p>CPU over 80%</p>
                </div>
                <div className='event-card-lower'>
                    <div className='desc-box'>
                        <p>24-07-2016</p>
                    </div>
                    <div className='desc-box'>
                        <p>SolarWinds</p>
                    </div>
                    <div className='desc-box'>
                        <p>7</p>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default Events;