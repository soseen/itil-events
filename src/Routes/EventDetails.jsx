import React, { useEffect, useState, useMemo } from 'react';
import './EventDetails.scss';
import {Link, useHistory} from 'react-router-dom';
import { axios } from '../Axios';

const EventDetails = ({eventToDisplay, eventServices, servicesData, userRole, setEventsData, setEventServices, setTasksData}) => {

    let history = useHistory();

    const [servicesArray, setServicesArray] = useState(eventServices);
    const [deletePopupVisible, setDeletePopupVisible] = useState(false);

    useEffect(() => {
        axios.get('/api/eventServices')
                .then(response => {
                    setServicesArray(response.data)
                })
                .catch(error => {
                    console.log(error);
                })
    },[])
    
    const affectedServices = useMemo(() => {
        let services = servicesArray.reduce((servicesArray, row) =>
        row.event === eventToDisplay.id ? [...servicesArray, servicesData.find(s => s.id === row.service)] : servicesArray,
        [])
        return services
    }, [servicesArray, eventToDisplay, servicesData])

    const removeEvent = async () => {

        try{
            await axios.delete(`/api/events/${eventToDisplay.id}`);
        }
        catch (error) {
            console.log(error)
            return
        }

        try {
            const [eventsResponse, eventServicesResponse] = await Promise.all([axios.get('/api/events'), axios.get('/api/eventServices')]);
            setEventServices(eventServicesResponse.data);
            setEventsData(eventsResponse.data);
        } catch (error) {
            console.log(error);
        } 

        try {
            const tasksResponse = await axios.get('/api/tasks');
            console.log(tasksResponse.data);
            setTasksData(tasksResponse.data);
            history.goBack();
        }   catch (error) {
            console.log(error);
        }
        
        
    }

    return(
        <div className='page-container'>
            <div className='event-details-container'>
                <div className={deletePopupVisible ? 'delete-event-popup' : 'delete-event-popup popup-hidden'}>
                    <p>Are you sure you want to remove this event?</p>
                    <div className='delete-event-popup-buttons'>
                        <button onClick={() => removeEvent()}>Yes</button>
                        <button onClick={() => setDeletePopupVisible(false)}>Cancel</button>
                    </div>
                </div>
                <div className='event-details-buttons'>
                        <button onClick={() => history.goBack()}>Back</button>
                    {userRole === 'system' && 
                        <div>
                             <Link to={`/alerts/${eventToDisplay.id}/edit-event`}>
                            <button>Edit</button>
                            </Link>
                            <button onClick={() => setDeletePopupVisible(true)}>Delete</button>
                        </div>
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