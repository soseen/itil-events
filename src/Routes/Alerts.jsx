import React, { useEffect, useState, useMemo } from 'react';
import './Alerts.scss'
import { useHistory, useRouteMatch, Link} from 'react-router-dom';
import { axios } from '../Axios';

const Alerts = ({eventsData, setEventsData, setEventToDisplay, userRole}) => {

    let history = useHistory();
    let { url } = useRouteMatch();

    useEffect(() => {
        axios.get('/api/events')
            .then((response) => {
                setEventsData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [setEventsData])

    const events = useMemo(() => {

        let data = eventsData.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()); 
        return data
      },[eventsData])

    const [eventsDisplayed, setEventsDisplayed] = useState(events);

    const filterList = (e) => {
        if(e.target.value === 'All'){
            setEventsDisplayed(eventsData);
        } else {
            let filteredArray = eventsData.reduce((newDisplayed, eventObject) =>
            eventObject.severity === e.target.value ? [...newDisplayed, eventObject] : newDisplayed, 
            []);
            setEventsDisplayed(filteredArray);
        }
    }

    const handleRowClick = (item) => {
        setEventToDisplay(item);
        history.push(`${url}/${item.id}`);
    }

    const filterResolved = (e) => {
        if(e.target.value === 'All'){
            setEventsDisplayed(eventsData);
        } else {
        let filteredArray = eventsData.reduce((displayed, eventObject) =>
            eventObject.resolved === JSON.parse(e.target.value) ? [...displayed, eventObject] : displayed, 
            []);
        setEventsDisplayed(filteredArray);
        }
    }


    return(
        <div className='alerts-page-container'>
            <div className='page-content'>
                <div className='events-table-container'>
                    
                    <div className='events-table-nav'>
                        <p>Alerts</p>
                        <div className='filters-container'>
                            <select name='select-resolved' className='select-filter' onChange={filterResolved}>
                                <option style={{fontWeight: "bold"}} value="Priority" disabled>Resolved</option>
                                <option style={{fontWeight: "bold"}} value='All'>All</option>
                                <option style={{fontWeight: "bold"}} value={false}>False</option>
                                <option style={{fontWeight: "bold"}} value={true}>True</option>  
                            </select>
                            <div className='buttons-container'>
                                <button name='button-filter' className='button-filter' onClick={filterList} value={'All'}>All</button>
                                <button name='button-filter' className='button-filter' onClick={filterList} value={'Warning'}>Warning</button>
                                <button name='button-filter' className='button-filter' onClick={filterList} value={'Minor'}>Minor</button>
                                <button name='button-filter' className='button-filter' onClick={filterList} value={'Major'}>Major</button>
                                <button name='button-filter' className='button-filter' onClick={filterList} value={'Critical'}>Critical</button>
                            </div>
                        </div>       
                    </div>{
                        userRole === 'system' &&
                        <Link to={`/alerts/new-event`}>
                            <button className='new-event-button'>New Event</button>
                        </Link>
                    }
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