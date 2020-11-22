import {React, useState} from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import './Rules.css';

const Rules = ({rulesData, itemCallback}) => {

    let history = useHistory();
    let { url } = useRouteMatch();

    const [rulesDisplayed, setRulesDisplayed] = useState(rulesData);

    const handleRowClick = (item) => {
        itemCallback('rule', item);
        console.log(item.severity);
        history.push(`${url}/${item.id}`);
    }

    return(
        <div className='page-container'>
            <div className='rules-table-container'>
                    <div className='rules-table-nav'>
                        <p>Alerts</p>
                        <div className='filters-container'>
                            <button className='button-filter'>All</button>
                        </div>                    
                    </div>
                    <table className='content-table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Severity</th>
                                <th>Priority</th>
                                <th>Creation Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rulesDisplayed.map((item) => {
                                return (
                                    <tr key={item.id} className='rules-row' onClick={() => {handleRowClick(item)}}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        {item.severity === 'Warning' && 
                                            <td><span className='severity-box severity-warning'>{item.severity}</span></td>
                                        }
                                        {item.severity === 'Minor' && 
                                            <td><span className='severity-box severity-minor'>{item.severity}</span></td>
                                        }
                                        {item.severity === 'Major' && 
                                            <td><span className='severity-box severity-major'>{item.severity}</span></td>
                                        }
                                        {item.severity === 'Critical' && 
                                            <td><span className='severity-box severity-critical'>{item.severity}</span></td>
                                        }
                                        {item.priority === 1 && 
                                            <td className='priority-container'>
                                                <div className='priority-box'></div>
                                            </td>
                                        }
                                         {item.priority === 2 && 
                                            <td className='priority-container'>
                                                <div className='priority-box'></div>
                                                <div className='priority-box'></div>
                                            </td>
                                        }
                                         {item.priority === 3 && 
                                            <td className='priority-container'>
                                                <div className='priority-box'></div>
                                                <div className='priority-box'></div>
                                                <div className='priority-box'></div>
                                            </td>
                                        }
                                         {item.priority === 4 && 
                                            <td className='priority-container'>
                                                <div className='priority-box'></div>
                                                <div className='priority-box'></div>
                                                <div className='priority-box'></div>
                                                <div className='priority-box'></div>
                                            </td>
                                        }
                                         {item.priority === 5 && 
                                            <td className='priority-container'>
                                                <div className='priority-box'></div>
                                                <div className='priority-box'></div>
                                                <div className='priority-box'></div>
                                                <div className='priority-box'></div>
                                                <div className='priority-box'></div>
                                            </td>
                                        }
                                        <td>{item.date}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
        </div>
    )
}

export default Rules;