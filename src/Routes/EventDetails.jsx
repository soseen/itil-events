import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './EventDetails.css';
import {ServicesData} from '../components/ServicesData.jsx';
import {Link} from 'react-router-dom';

const EventDetails = ({eventToDisplay}) => {

    const [affectedServices, setAffectedServices] = useState([]);

    useEffect(() => {

        let servicesArray = []
        if(eventToDisplay.service !== null){
            for(let i=0; i<eventToDisplay.service.length; i++){
                for(let j=0; j<ServicesData.length; j++){
                    if (eventToDisplay.service[i] === ServicesData[j].id){
                        servicesArray.push({
                            serviceID: ServicesData[j].id,
                            serviceName: ServicesData[j].name,
                            servicePriority: ServicesData[j].priority
                        });
                    }
                }
            }
        }
        setAffectedServices(servicesArray);
        console.log(affectedServices);
    },[]);

    return(
        <div className='page-container'>
            <div className='event-details-container'>
                <div className='event-details-buttons'>
                    <Link to="/alerts">
                        <button>Back</button>
                    </Link>
                    <button>Apply Task</button>
                    <button>Resolve</button>
                </div>
                <div className='event-details-info-container'>
                    {eventToDisplay.severity === "Warning" &&
                    <div className='event-details-severity event-details-warning'>
                        <p>{eventToDisplay.severity}</p>
                    </div>
                    }
                    {eventToDisplay.severity === "Minor" &&
                    <div className='event-details-severity event-details-minor'>
                        <p>{eventToDisplay.severity}</p>
                    </div>
                    }
                    {eventToDisplay.severity === "Major" &&
                    <div className='event-details-severity event-details-major'>
                        <p>{eventToDisplay.severity}</p>
                    </div>
                    }
                    {eventToDisplay.severity === "Critical" &&
                    <div className='event-details-severity event-details-critical'>
                        <p>{eventToDisplay.severity}</p>
                    </div>
                    }
                    <div className='event-details-info-box'>
                        <div className='event-details-info-left'>
                            <label className='event-details-label'>ID</label>
                            <p>{eventToDisplay.id}</p>
                            <label className='event-details-label'>Description</label>
                            <p>{eventToDisplay.desc}</p>
                            <label className='event-details-label'>Source</label>
                            <p>{eventToDisplay.source}</p>
                            <label className='event-details-label'>Date</label>
                            <p>Date: {eventToDisplay.startDate}</p>
                            <label className='event-details-label'>Last Update</label>
                            <p>{eventToDisplay.endDate}</p>
                            <label className='event-details-label'>Resolved</label>
                            <p>{eventToDisplay.resolved.toString()}</p>
                        </div>
                        <div className='event-details-info-right'>
                            <label className='event-details-label'>Affected Services</label>
                            <div className='event-details-services'>
                                {affectedServices.map((item,index) => {
                                    return (
                                        <p>{item.serviceName}</p>
                                    )
                                })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default EventDetails;