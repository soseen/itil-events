import React, { useState } from 'react';
import './Alerts.scss'
import { useHistory, useRouteMatch, Link} from 'react-router-dom';

const Alerts = ({eventsData, itemCallback}) => {

    let history = useHistory();
    let { url } = useRouteMatch();


    const [eventsDisplayed, setEventsDisplayed] = useState(eventsData);

    const filterList = (e) => {
        if(e.target.value === 'All'){
            setEventsDisplayed(eventsData);
        } else {
            let temp = [];
            for(let i=0; i < eventsData.length; i++){
                if(eventsData[i].severity === e.target.value){
                    console.log(eventsData[i]);
                    temp.push(eventsData[i]);
                }
            setEventsDisplayed(temp);
            }
        }
    }

    const handleRowClick = (item) => {
        itemCallback('event', item);
        history.push(`${url}/${item.id}`);
    }


    return(
        <div className='alerts-page-container'>
            <div className='page-content'>
                <div className='events-table-container'>
                    
                    <div className='events-table-nav'>
                        <p>Alerts</p>
                        <div className='filters-container'>
                            <div className='buttons-container'>
                                <button name='button-filter' className='button-filter' onClick={filterList} value={'All'}>All</button>
                                <button name='button-filter' className='button-filter' onClick={filterList} value={'Warning'}>Warning</button>
                                <button name='button-filter' className='button-filter' onClick={filterList} value={'Minor'}>Minor</button>
                                <button name='button-filter' className='button-filter' onClick={filterList} value={'Major'}>Major</button>
                                <button name='button-filter' className='button-filter' onClick={filterList} value={'Critical'}>Critical</button>
                            </div>
                        </div>       
                    </div>
                    <Link to={`/alerts/new-event`}>
                    <button className='new-event-button'>New Event</button>
                    </Link>
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
                                        <td>{item.resolved.toString().toUpperCase()}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Alerts;