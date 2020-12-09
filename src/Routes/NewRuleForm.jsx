import React, { useState } from 'react';
import {useHistory} from 'react-router';
import './NewRuleForm.scss';

const NewRuleForm = ({rulesData}) => {

    let history = useHistory();

    const assignNewId = () => {
        if(rulesData && rulesData.length > 0) {
            return rulesData[rulesData.length - 1].id;
        } else {
            return 1;
        }
    }

    const NEW_ID = assignNewId();
    const CURRENT_DATE = new Date().toISOString().slice(0, 10);

    const [buttonActive, setButtonActive] = useState(null);
    const [validated, setValidated] = useState(true);
    const [newRule, setNewRule] = useState({
        id: NEW_ID,
        name: '',
        severity: '',
        priority: 1,
        attribute: '',
        operator: '=',
        value: ``,
        date: CURRENT_DATE
    });

    const handleChange = (e) => {
        setNewRule({
            ...newRule, 
            [e.target.name]: e.target.value
        });
    }

    const selectPriority = (e) => {
        setNewRule({
            ...newRule,
            priority: parseInt(e.target.value)
        })
    }

    const triggerButton = (e) => {
        setButtonActive(e.target.value);
        setNewRule({
            ...newRule, 
            severity: e.target.value
        });
    }

    const validateAndSubmit = (fieldsToValidate) => {
        if(fieldsToValidate.find(s => s === '') === undefined){
            setValidated(true);
            rulesData.push(newRule);
            history.goBack();
         } else {
            setValidated(false);
         }
    }

    // const selectTaskPriority = (e) => {
    //     setNewTask({
    //         ...newRule, 
    //         [e.target.name]: e.target.value,
    //     });
    //  }

    return(
        <div className='new-rule-page-container'>
            <div className='new-rule-form-container'>
                <div className='new-rule-form-header'>
                        <p>New Rule</p>
                        <button onClick={() => history.goBack()}>Back</button>
                </div>
                <div className ='new-rule-inputs-container'>
                    <div className='new-rule-inputs-validation'>
                        <p className={validated ? 'validation-message-hidden' : ''}>Please fill in all the required fields</p>
                    </div>
                    <div className='new-rule-inputs'>
                        <div className='new-rule-inputs-row'>
                            <label className='new-rule-inputs-label input-required'>ID</label>
                            <input disabled type='text' name='id' value={NEW_ID} className='new-rule-inputs-input'></input>
                        </div>
                        <div className='new-rule-inputs-row'>
                            <label className='new-rule-inputs-label input-required'>Name</label>
                            <input type='text' name='name' value={newRule.name} className='new-rule-inputs-input' onChange={handleChange}></input>
                        </div>
                        <div className='new-rule-inputs-row direction-row'>
                            <div className='new-rule-inputs-column column-49'>
                            <label className='new-rule-inputs-label input-required'>Date</label>
                            <input type='date' name='date' value={newRule.date} className='new-rule-inputs-input' onChange={handleChange}></input>
                            </div>
                            <div className='new-rule-inputs-column'>
                            <label className='new-rule-inputs-label input-required'>Priority</label>
                            <select name='priority' className='new-rule-inputs-select' onChange={selectPriority}>
                                <option style={{fontWeight: "bold"}} value={1}>1</option>
                                <option style={{fontWeight: "bold"}} value={2}>2</option>
                                <option style={{fontWeight: "bold"}} value={3}>3</option>
                                <option style={{fontWeight: "bold"}} value={4}>4</option>
                                <option style={{fontWeight: "bold"}} value={5}>5</option>
                            </select>
                            </div>
                        </div>
                    </div>
                    <div className='new-rule-inputs'>
                        <div className='new-rule-inputs-row direction-row'>
                            <div className='new-rule-inputs-column column-49'>
                                <label className='new-rule-inputs-label input-required'>Attribute</label>
                                <input type='text' name='attribute' value={newRule.attribute} className='new-rule-inputs-input' onChange={handleChange}></input>
                            </div>
                            <div className='new-rule-inputs-column column-25'>
                                <label className='new-rule-inputs-label input-required'>Operator</label>
                                <select type='text' name='operator' value={newRule.operator} className='new-rule-inputs-select' onChange={handleChange}>
                                    <option style={{fontWeight: "bold"}} value={'='}>=</option>
                                    <option style={{fontWeight: "bold"}} value={'>'}>&gt;</option>
                                    <option style={{fontWeight: "bold"}} value={'<'}>&lt;</option>
                                </select>
                            </div>
                            <div className='new-rule-inputs-column column-25'>
                                <label className='new-rule-inputs-label input-required'>Value</label>
                                <input type='text' name='value' value={newRule.value} className='new-rule-inputs-input' onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className='new-rule-inputs-row'>
                            <label className='new-rule-inputs-label input-required'>Severity</label>
                            <div className='new-rule-inputs-severity-buttons'>
                                <button value='Warning' className={buttonActive === 'Warning' ? 'new-rule-inputs-button-warning' : ''} onClick={triggerButton}>Warning</button>
                                <button value='Minor' className={buttonActive === 'Minor' ? 'new-rule-inputs-button-minor' : ''} onClick={triggerButton}>Minor</button>
                                <button value='Major' className={buttonActive === 'Major' ? 'new-rule-inputs-button-major' : ''} onClick={triggerButton}>Major</button>
                                <button value='Critical' className={buttonActive === 'Critical' ? 'new-rule-inputs-button-critical' : ''} onClick={triggerButton}>Critical</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='add-rule-button' onClick={() => validateAndSubmit([newRule.name, newRule.date, newRule.severity, newRule.attribute, newRule.operator, newRule.value])}>Add</button>
            </div>
        </div>
    )
}

export default NewRuleForm;

