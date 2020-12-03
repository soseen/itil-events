import {React, useState} from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import './Rules.scss';

const Rules = ({rulesData, itemCallback}) => {

    let history = useHistory();
    let { url } = useRouteMatch();

    const [rulesDisplayed, setRulesDisplayed] = useState(rulesData);

    const filterList = (e) => {

        if(e.target.name === 'select-priority') {
            if(e.target.value === 'All'){
                setRulesDisplayed(rulesData);
            } else {
                let temp = [];
                console.log(`prio z e.target.vaule ${e.target.value}`);
                for(let i=0; i < rulesData.length; i++){
                    console.log(`prio z rules data ${rulesData[i].priority}`);
                    if(rulesData[i].priority.toString() === e.target.value.toString()){
                        temp.push(rulesData[i]);
                    }
                }
                console.log(temp);
                setRulesDisplayed(temp);
            }    
        }
        else if(e.target.name === 'button-filter'){
            if(e.target.value === 'All'){
                setRulesDisplayed(rulesData);
            } else {
                let temp = [];
                for(let i=0; i < rulesData.length; i++){
                    if(rulesData[i].severity === e.target.value){
                        temp.push(rulesData[i]);
                    }
                }
                setRulesDisplayed(temp);
            }
        }
    }

    const handleRowClick = (item) => {
        itemCallback('rule', item);
        console.log(item.severity);
        history.push(`${url}/${item.id}`);
    }

    return(
        <div className='page-container'>
            <div className='rules-table-container'>
                    <div className='rules-table-nav'>
                        <p>Rules</p>
                        <div className='filters-container'>
                            <select name='select-priority' className='select-filter' onChange={filterList}>
                                <option value="Priority" disabled value>Priority</option>
                                <option value='All'>All</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>
                            <div className='buttons-container'>
                                <button name='button-filter' className='button-filter' onClick={filterList} value={'All'}>All</button>
                                <button name='button-filter' className='button-filter' onClick={filterList} value={'Warning'}>Warning</button>
                                <button name='button-filter' className='button-filter' onClick={filterList} value={'Minor'}>Minor</button>
                                <button name='button-filter' className='button-filter' onClick={filterList} value={'Major'}>Major</button>
                                <button name='button-filter' className='button-filter' onClick={filterList} value={'Critical'}>Critical</button>
                            </div>
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
