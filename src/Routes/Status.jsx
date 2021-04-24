import React, { useState } from 'react';
import './Status.scss'
import {useHistory} from 'react-router-dom';
import DataChart from '../components/DataChart';

const Status = ({services, itemCallback, eventsData, tasksData, user, setUser}) => {

    const [serviceEvents, setServiceEvents] = useState([]);
    let history = useHistory();

    let tasksChartData = tasksData.reduce((taskData, task) => {
        if(!task.closed){
            taskData['active']++;
        } else if(task.closed) {
            taskData['closed']++;
        }
        return taskData;
    }, {active: 0, closed: 0, all: tasksData.length});
    


    const displayRelatedEvents = (events) => {
        setServiceEvents(events)
    }

    const handleRowClick = (item) => {
        itemCallback('event', item);
        history.push(`alerts/${item.id}`);
    }

    return(
        <div className='status-page-container'>
                <div className='status-content-container'>
                <div className='status-header-container'>
                    <div className='status-header'>
                        <p>Status</p>
                    </div>
                </div>
                <div className='status-content'>
                    <div className='dashboard-container'>
                        <div className='dashboard'>
                            <div className='services-container'>
                                {services.map((service, index) => {
                                    return(
                                        <div key ={service.id} className={`service-box service-box-priority-${service.priority} service-box-status-${service.status}`} onClick={() => displayRelatedEvents(service.events)}>
                                            <p>{service.name}</p>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='service-events-container'>
                                <table className='content-table'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Severity</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {serviceEvents.map((item, index) => {
                                            return (
                                                <tr key={item.id} className='event-row' onClick={() => handleRowClick(item)}>
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    {item.severity === 'Warning' && 
                                                        <td><span className='severity-warning'>{item.severity}</span></td>
                                                    }
                                                    {item.severity === 'Minor' && 
                                                        <td><span className='severity-minor'>{item.severity}</span></td>
                                                    }
                                                    {item.severity === 'Major' && 
                                                        <td><span className='severity-major'>{item.severity}</span></td>
                                                    }
                                                    {item.severity === 'Critical' && 
                                                        <td><span className='severity-critical'>{item.severity}</span></td>
                                                    }
                                                    <td>{item.startDate}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className='stats-container'>
                        <div className='doughnut-chart-container'>
                            <DataChart tasksChartData={tasksChartData} eventsData={eventsData} type='Doughnut' />
                        </div>
                        <div className='line-chart-container'>
                            <DataChart tasksChartData={tasksChartData} eventsData={eventsData} type='Line' />
                        </div>           
                    </div>
                </div>
            </div>
            {/* {!user.subscriptionActive.active && 
                <Payment user={user} setUser={setUser} />
            } */}
        </div>
    )
}

export default Status;