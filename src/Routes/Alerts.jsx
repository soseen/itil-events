import React, { useState } from 'react';
import './Alerts.css'
import { EventsData } from '../components/EventsData.jsx';
import { useHistory, useRouteMatch, Switch, Route, Link} from 'react-router-dom';
import EventDetails from './EventDetails';

const Alerts = () => {

    let history = useHistory();
    let { path, url } = useRouteMatch();

    const [eventsDisplayed, setEventsDisplayed] = useState(EventsData);
    const [eventToDisplay, setEventToDisplay] = useState(EventsData[0]);

    const filterList = (e) => {
        console.log(e.target.value);
        if(e.target.value === 'All'){
            setEventsDisplayed(EventsData);
        } else {
            let temp = [];
            for(let i=0; i < EventsData.length; i++){
                if(EventsData[i].severity === e.target.value){
                    console.log(EventsData[i]);
                    temp.push(EventsData[i]);
                }
            setEventsDisplayed(temp);
            }
        }
    }

    const handleRowClick = (item) => {
        console.log(item);
        setEventToDisplay(item);
        history.push(`${url}/${item.id}`);
    }


    return(
        <div className='page-container'>
            <div className='page-content'>
                <div className='events-table-container'>
                    <div className='events-table-nav'>
                        <p>Alerts</p>
                        <div className='filters-container'>
                            <button className='button-filter' onClick={filterList} value={'All'}>All</button>
                            <button className='button-filter' onClick={filterList} value={'Warning'}>Warning</button>
                            <button className='button-filter' onClick={filterList} value={'Minor'}>Minor</button>
                            <button className='button-filter' onClick={filterList} value={'Major'}>Major</button>
                            <button className='button-filter' onClick={filterList} value={'Critical'}>Critical</button>
                        </div>                    
                    </div>
                    <table className='content-table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Severity</th>
                                <th>Date</th>
                                <th>Resolved</th>
                            </tr>
                        </thead>
                        <tbody>
                            {eventsDisplayed.map((item) => {
                                return (
                                    <tr className='event-row' onClick={() => handleRowClick(item)}>
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
                                        <td>{item.resolved.toString()}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <Switch>
                <Route path='/alerts/:eventID'>
                <EventDetails eventItem={eventToDisplay} />
                </Route>
            </Switch>
        </div>
    )
}

export default Alerts;