import React from 'react';
import './RuleDetails.css'

const RuleDetails = ({ruleToDisplay}) => {
    

    console.log(ruleToDisplay);
    
    return(
        <div className='page-container'>
            <div className='rule-details-container'>
                <div className='rule-header'>
                    <button>Back</button>
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
                <div className='rule-details-info'>

                </div>
            </div>
            <p>{ruleToDisplay.name}</p>
        </div>
    )

}

export default RuleDetails