import React from 'react';
import './RuleDetails.scss'
import { Link, useHistory } from 'react-router-dom'

const RuleDetails = ({ruleToDisplay, user}) => {
    

    console.log(ruleToDisplay);
    let history = useHistory();

    console.log(history.location.pathname);
    
    return(
        <div className='page-container'>
            <div className='rule-details-container'>
                <div className='rule-buttons'>
                    <Link to='/rules'>
                        <button>Back</button>
                    </Link>
                    {user.team && 
                        <Link to={`/rules/${ruleToDisplay.id}/edit-rule`}>
                        <button>Edit</button>
                        </Link>
                    }
                </div>
                <div className='rule-header'>
                    <p className='rule-header-title'>Rule Details</p>
                    {/* <p className='rule-header-severity'>Severity:</p> */}
                    {ruleToDisplay.severity ==='Warning' && 
                        <div className='rule-severity-box rule-warning'>Warning</div>
                    }
                    {ruleToDisplay.severity ==='Minor' && 
                        <div className='rule-severity-box rule-minor'>Minor</div>
                    }
                    {ruleToDisplay.severity ==='Major' && 
                        <div className='rule-severity-box rule-major'>Major</div>
                    }
                    {ruleToDisplay.severity ==='Critical' && 
                        <div className='rule-severity-box rule-critical'>Critical</div>
                    }
                </div>
                <div className='rule-details-info-container'>
                    <div className='rule-details-info rule-left'>
                        <label className='rule-details-section'>General Info</label>
                        <label className='rule-details-label'>ID</label>
                        <p>{ruleToDisplay.id}</p>
                        <label className='rule-details-label'>Name</label>
                        <p>{ruleToDisplay.name}</p>
                        <label className='rule-details-label'>Priority</label>
                        <p>{ruleToDisplay.priority}</p>
                        <label className='rule-details-label'>Date</label>
                        <p>{ruleToDisplay.date}</p>
                    </div>
                    <div className='rule-details-info rule-right'>
                        <label className='rule-details-section'>Rule Threshold</label>
                        <label className='rule-details-label'>Attribute</label>
                        <p>{ruleToDisplay.attribute}</p>
                        <label className='rule-details-label'>Operator</label>
                        <p>{ruleToDisplay.operator}</p>
                        <label className='rule-details-label'>Value</label>
                        <p>{ruleToDisplay.value}</p>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default RuleDetails