import React, { useEffect, useState } from 'react';
import './Status.scss'
import {useRouteMatch, useHistory} from 'react-router-dom';
import DataChart from '../components/DataChart';

const Status = ({services, itemCallback, eventsData}) => {

    const [serviceEvents, setServiceEvents] = useState([]);
    let history = useHistory();
    // let { url } = useRouteMatch();
    
    // useEffect(() => {

    //     // let serviceArray = eventsData.map(service => ({
    //     //     id: event.id
    //     // }))


    //     let serviceArray = services;

    //     for(let i=0; i<serviceArray.length; i++){
    //         serviceArray[i].events = [];
    //         serviceArray[i].status = 1;
    //     }

    //     for(let i=0; i< serviceArray.length; i++){
    //         for(let j=0; j<eventsData.length; j++){
    //             if(eventsData[j].service !== null ){
    //                 eventsData[j].service.forEach(element => {
    //                     // console.log(`serwis ${serviceArray[i].id}`);
    //                     // console.log(`zdarzenie ${element}`);
    //                     if(element === serviceArray[i].id){
    //                         serviceArray[i].events = [...serviceArray[i].events, eventsData[j]];
    //                         if(eventsData[j].severity === 'Critical' && serviceArray[i].status < 5){
    //                             serviceArray[i].status = 5;
    //                         } else if (eventsData[j].severity === 'Major' && serviceArray[i].status < 4) {
    //                             serviceArray[i].status = 4;
    //                         } else if (eventsData[j].severity === 'Minor' && serviceArray[i].status < 3) {
    //                             serviceArray[i].status = 3;
    //                         } else if (eventsData[j].severity === 'Warning' && serviceArray[i].status < 2) {
    //                             serviceArray[i].status = 2;
    //                         }
    //                     }
    //                 });
    //             }
    //         }
    //     }

    //     console.log(serviceArray);
    //     setServices(serviceArray);
    // }, [eventsData, services]);

    const displayRelatedEvents = (events) => {
        setServiceEvents(events)
    }

    const handleRowClick = (item) => {
        itemCallback('event', item);
        history.push(`alerts/${item.id}`);
    }

    return(
        <div className='status-page-container'>
            {/* <h1 className='page-title'>Status</h1> */}
        
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
                                                    <td>{item.desc}</td>
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
                            <DataChart eventsData={eventsData} type='Doughnut' />
                        </div>
                        <div className='line-chart-container'>
                            <DataChart eventsData={eventsData} type='Line' />
                        </div>           
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Status;