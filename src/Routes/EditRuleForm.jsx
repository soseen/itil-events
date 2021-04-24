import {React, useState} from 'react'
import { useHistory } from 'react-router-dom';
import { axios } from '../Axios';
import './RuleForm.scss';

const EditRuleForm = ({ruleToDisplay, rulesData, setRulesData, setRuleToDisplay}) => {
    
    let history = useHistory();

    console.log(ruleToDisplay);

    const [buttonActive, setButtonActive] = useState(ruleToDisplay.severity);
    const [validated, setValidated] = useState(true);
    const [newRule, setNewRule] = useState(ruleToDisplay);

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

    const validateAndSubmit = async (fieldsToValidate) => {
        if(fieldsToValidate.find(s => s === '') === undefined){
            setValidated(true);
            setRuleToDisplay(newRule);
            await axios.put(`http://localhost:8080/api/rules/${newRule.id}`, newRule);
            const response = await axios.get('http://localhost:8080/api/rules/');
            setRulesData(response.data);
            history.push('/rules');
         } else {
            setValidated(false);
         }
    }

    return(
        <div className='rule-page-container'>
            <div className='rule-form-container'>
                <div className='rule-form-header'>
                        <p>New Rule</p>
                        <button onClick={() => history.goBack()}>Back</button>
                </div>
                <div className ='rule-inputs-container'>
                    <div className='rule-inputs-validation'>
                        <p className={validated ? 'validation-message-hidden' : ''}>Please fill in all the required fields</p>
                    </div>
                    <div className='rule-inputs'>
                        <div className='rule-inputs-row'>
                            <label className='rule-inputs-label input-required'>ID</label>
                            <input disabled type='text' name='id' value={newRule.id} className='rule-inputs-input'></input>
                        </div>
                        <div className='rule-inputs-row'>
                            <label className='rule-inputs-label input-required'>Name</label>
                            <input type='text' name='name' value={newRule.name} className='rule-inputs-input' onChange={handleChange}></input>
                        </div>
                        {/* <div className='rule-inputs-row direction-row'>
                            <div className='rule-inputs-column column-49'>
                            <label className='rule-inputs-label input-required'>Date</label>
                            <input type='date' name='date' value={newRule.date} className='rule-inputs-input' onChange={handleChange}></input>
                            </div>
                            <div className='rule-inputs-column'>
                            <label className='rule-inputs-label input-required'>Priority</label>
                            <select value={newRule.priority} name='priority' className='rule-inputs-select' onChange={selectPriority}>
                                <option style={{fontWeight: "bold"}} value={1}>1</option>
                                <option style={{fontWeight: "bold"}} value={2}>2</option>
                                <option style={{fontWeight: "bold"}} value={3}>3</option>
                                <option style={{fontWeight: "bold"}} value={4}>4</option>
                                <option style={{fontWeight: "bold"}} value={5}>5</option>
                            </select>
                            </div>
                        </div> */}
                        <div className='rule-inputs-row'>
                            <label className='rule-inputs-label input-required'>Priority</label>
                            <select value={newRule.priority} name='priority' className='rule-inputs-select' onChange={selectPriority}>
                                <option style={{fontWeight: "bold"}} value={1}>1</option>
                                <option style={{fontWeight: "bold"}} value={2}>2</option>
                                <option style={{fontWeight: "bold"}} value={3}>3</option>
                                <option style={{fontWeight: "bold"}} value={4}>4</option>
                                <option style={{fontWeight: "bold"}} value={5}>5</option>
                            </select>
                        </div>
                    </div>
                    <div className='rule-inputs'>
                        <div className='rule-inputs-row direction-row'>
                            <div className='rule-inputs-column column-49'>
                                <label className='rule-inputs-label input-required'>Attribute</label>
                                <input type='text' name='attribute' value={newRule.attribute} className='rule-inputs-input' onChange={handleChange}></input>
                            </div>
                            <div className='rule-inputs-column column-25'>
                                <label className='rule-inputs-label input-required'>Operator</label>
                                <select type='text' name='operator' value={newRule.operator} className='rule-inputs-select' onChange={handleChange}>
                                    <option style={{fontWeight: "bold"}} value={'='}>=</option>
                                    <option style={{fontWeight: "bold"}} value={'>'}>&gt;</option>
                                    <option style={{fontWeight: "bold"}} value={'<'}>&lt;</option>
                                </select>
                            </div>
                            <div className='rule-inputs-column column-25'>
                                <label className='rule-inputs-label input-required'>Value</label>
                                <input type='text' name='value' value={newRule.value} className='rule-inputs-input' onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className='rule-inputs-row'>
                            <label className='rule-inputs-label input-required'>Severity</label>
                            <div className='rule-inputs-severity-buttons'>
                                <button value='Warning' className={buttonActive === 'Warning' ? 'rule-inputs-button-warning' : ''} onClick={triggerButton}>Warning</button>
                                <button value='Minor' className={buttonActive === 'Minor' ? 'rule-inputs-button-minor' : ''} onClick={triggerButton}>Minor</button>
                                <button value='Major' className={buttonActive === 'Major' ? 'rule-inputs-button-major' : ''} onClick={triggerButton}>Major</button>
                                <button value='Critical' className={buttonActive === 'Critical' ? 'rule-inputs-button-critical' : ''} onClick={triggerButton}>Critical</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='add-rule-button' onClick={() => validateAndSubmit([newRule.name, newRule.date, newRule.severity, newRule.attribute, newRule.operator, newRule.value])}>Edit Rule</button>
            </div>
        </div>
    )
}

export default EditRuleForm;