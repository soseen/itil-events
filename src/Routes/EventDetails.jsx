import React, { useEffect, useState, useMemo } from 'react';
import './EventDetails.scss';
import {Link, useHistory} from 'react-router-dom';
import { axios } from '../Axios';

const EventDetails = ({eventToDisplay, eventServices, servicesData, userRole}) => {

    let history = useHistory();
    // const [affectedServices, setAffectedServices] = useState([]);
    const [servicesArray, setServicesArray] = useState(eventServices);
    useEffect(() => {
        axios.get('/api/eventServices')
                .then(response => {
                    setServicesArray(response.data)
                })
                .catch(error => {
                    console.log(error);
                })
    },[eventServices])
    
    const affectedServices = useMemo(() => {
        let services = servicesArray.reduce((servicesArray, row) =>
        row.event === eventToDisplay.id ? [...servicesArray, servicesData.find(s => s.id === row.service)] : servicesArray,
        [])
        return services
    }, [servicesArray, eventToDisplay, servicesData])

    return(
        <div className='page-container'>
            <div className='event-details-container'>
                <div className='event-details-buttons'>
                        <button onClick={() => history.goBack()}>Back</button>
                    {userRole === 'system' && 
                        <Link to={`/alerts/${eventToDisplay.id}/edit-event`}>
                        <button>Edit</button>
                        </Link>
                    }
                    
                    {userRole === 'expert' && 
                        <Link to={`/alerts/${eventToDisplay.id}/new-task`}>
                        <button>Apply Task</button>
                        </Link>
                    }
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
                            <p>{eventToDisplay.name}</p>
                            <label className='event-details-label'>Source</label>
                            <p>{eventToDisplay.source}</p>
                            <label className='event-details-label'>Start Date</label>
                            <p>{eventToDisplay.startDate}</p>
                            <label className='event-details-label'>End Date</label>
                            <p>{eventToDisplay.endDate}</p>
                            <label className='event-details-label'>Resolved</label>
                            <p>{eventToDisplay.resolved.toString()}</p>
                        </div>
                        <div className='event-details-info-right'>
                            <label className='event-details-label'>Affected Services</label>
                            <div className='event-details-services'>
                                {affectedServices.map((item,index) => {
                                    return (
                                        <p key={item.id}>{item.name}</p>
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