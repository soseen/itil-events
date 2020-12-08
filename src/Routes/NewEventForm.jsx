import {React, useState} from 'react';
import './NewEventForm.scss';
import {AiOutlineClose} from 'react-icons/ai';
import {useHistory} from 'react-router-dom';

const NewEventForm = ({eventsData, services}) => {

    const assignNewId = () => {
        if(eventsData && eventsData.length > 0) {
            return eventsData[eventsData.length -1].id + 1;
        } else {
            return 1;
        }
    }

    const CURRENT_DATE = new Date().toISOString().slice(0, 10);
    const NEW_ID = assignNewId();

    let history = useHistory();

    console.log(CURRENT_DATE.toString());

    const [buttonActive, setButtonActive] = useState(null);
    const [serviceToAdd, setServiceToAdd] = useState(services[0]);
    const [affectedServices, setAffectedServices] = useState([]);
    const [newEvent, setNewEvent] = useState({
        id: NEW_ID,
        severity: '',
        source: '',
        service: null,
        desc: '',
        startDate: CURRENT_DATE,
        endDate: '',
        resolved: false
    });
    const [validated, setValidated] = useState(true);

    const handleChange = (e) => {

        if(e.target.name !== 'endDate'){
            setNewEvent({
                ...newEvent, 
                [e.target.name]: e.target.value
            });
        } else {
            setNewEvent({
                ...newEvent, 
                [e.target.name]: e.target.value,
                resolved: true
            });
        }
    }

    const triggerButton = (e) => {
        setButtonActive(e.target.value);
        setNewEvent({
            ...newEvent, 
            severity: e.target.value
        });
    }

    const selectService = (e) => {
       let service = services.find(s => s.id.toString() === e.target.value); 
       setServiceToAdd(service);
    }

    const addService = () => {

        
        if(!affectedServices?.find(service => service.id === serviceToAdd.id)){
            setAffectedServices([...affectedServices, serviceToAdd]);
            setNewEvent({
                ...newEvent, 
                service: [...affectedServices, serviceToAdd].reduce((IDArray, serviceItem) =>
                        [...IDArray, serviceItem.id], [])
            });
        }
    }

    const removeService = (service) => {
        console.log(affectedServices);

        let filteredServices = affectedServices.reduce((newServices, serviceItem) => 
           serviceItem.id !== service.id ? [...newServices, serviceItem] : newServices, 
           [])
        
        setAffectedServices(filteredServices);
        setNewEvent({
            ...newEvent, 
            service: filteredServices.reduce((IDArray, serviceItem) =>
                    [...IDArray, serviceItem.id], [])
        });
    }

    const setResolvedFalse = () => {

            setNewEvent({
                ...newEvent,
                resolved: false, 
                endDate: ''
            });
    }

    const validateAndSubmit = (fieldsToValidate) => {
        if(fieldsToValidate.find(s => s === '') === undefined){
            setValidated(true);
            eventsData.push(newEvent);
            history.goBack();
         } else {
            setValidated(false);
         }
    }

    return(
        <div className='page-container'>
            <div className='new-event-form-container'>
                <div className='new-event-form-header'>
                    <p>New Event</p>
                    <button onClick={() => history.goBack()}>Back</button>
                </div>
                <div className='new-event-inputs-container'>
                    <div className='new-event-inputs-validation'>
                        <p className={validated ? 'validation-message-hidden' : ''}>Please fill in all the required fields</p>
                    </div>
                    <div className='new-event-inputs'>
                        <div className='new-event-inputs-row'>
                            <label className='new-event-inputs-label input-required'>ID</label>
                            <input disabled type='text' name='id' value={NEW_ID} className='new-event-inputs-input'></input>
                        </div>
                        <div className='new-event-inputs-row'>
                            <label className='new-event-inputs-label input-required'>Name</label>
                            <input type='text' name='desc' value={newEvent.desc} className='new-event-inputs-input' onChange={handleChange}></input>
                        </div>
                        <div className='new-event-inputs-row'>
                            <label className='new-event-inputs-label input-required'>Source</label>
                            <input type='text' name='source' value={newEvent.source} className='new-event-inputs-input' onChange={handleChange}></input>
                        </div>
                        <div className='new-event-inputs-row'>
                            <div className='new-event-inputs-span'>
                                <div className='new-event-inputs-column'>
                                    <label className='new-event-inputs-label input-required'>Start Date</label>
                                    <input type='date' name='startDate' value={newEvent.startDate} className='new-event-inputs-input' onChange={handleChange}></input>
                                </div>
                                <div className='new-event-inputs-column'>
                                    <label className='new-event-inputs-label'>End Date</label>
                                    <input type='date' name='endDate' value={newEvent.endDate} className='new-event-inputs-input' onChange={handleChange}></input>
                                </div>
                            </div>
                        </div>
                        <div className='new-event-inputs-row'>
                            <label className='new-event-inputs-label input-required'>Severity</label>
                            <div className='new-event-inputs-severity-buttons'>
                                <button value='Warning' className={buttonActive === 'Warning' ? 'new-event-inputs-button-warning' : ''} onClick={triggerButton}>Warning</button>
                                <button value='Minor' className={buttonActive === 'Minor' ? 'new-event-inputs-button-minor' : ''} onClick={triggerButton}>Minor</button>
                                <button value='Major' className={buttonActive === 'Major' ? 'new-event-inputs-button-major' : ''} onClick={triggerButton}>Major</button>
                                <button value='Critical' className={buttonActive === 'Critical' ? 'new-event-inputs-button-critical' : ''} onClick={triggerButton}>Critical</button>
                            </div>
                        </div>
                        <div className='new-event-inputs-row'>
                            <label className='new-event-inputs-label input-required'>Resolved</label>
                            <div className='new-event-inputs-resolved-buttons'>
                                <button className={newEvent.resolved ? 'resolved-button-highlighted' : ''}>True</button>
                                <button className={newEvent.resolved  ? '' : 'resolved-button-highlighted'} onClick={() => setResolvedFalse()}>False</button>
                            </div>
                        </div>
                    </div>
                    <div className='new-event-inputs'>
                        <div className='new-event-inputs-row'>
                            <label className='new-event-inputs-label'>Add Service</label>
                            <div className='new-event-inputs-span'>
                                <div className='new-event-inputs-services-container'>
                                    <select name='select-services' className='new-event-inputs-select' onChange={selectService}>
                                        {services.map((service) =>
                                        (
                                            <option key={service.id} value={service.id}>{service.name}</option>
                                        )
                                    )}
                                    </select> 
                                    <button onClick={addService}>Add</button>
                                </div>
                            </div>
                        </div>
                        <div className='new-event-inputs-row'>
                            <label className='new-event-inputs-label'>Affected Services</label>
                            <ul className='new-event-services-list'>
                                {affectedServices.length > 0 && affectedServices.map((service, index) => 
                                (
                                    <li key={service.id} className='new-event-service-item'>{service.name} <AiOutlineClose onClick={() => removeService(service)}/></li>
                                )
                                )}
                            </ul>
                        
                        </div>
                        
                    </div>
                   
                </div>
                <button className='add-event-button' onClick={() => validateAndSubmit([newEvent.desc, newEvent.severity, newEvent.source, newEvent.startDate])}>Add Event</button>
            </div>
        </div>
    )
}

export default NewEventForm