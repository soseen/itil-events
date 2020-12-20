import {React, useState} from 'react';
import './EventForm.scss';
import {AiOutlineClose} from 'react-icons/ai';
import {useHistory} from 'react-router-dom';

const NewEventForm = ({eventsData, services, setEventsData}) => {

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
       let service = services.find(s => s.id === parseInt(e.target.value)); 
       setServiceToAdd(service);
    }

    const addService = () => {

        
        if(!affectedServices?.find(service => service.id === serviceToAdd.id)){
            setAffectedServices([...affectedServices, serviceToAdd]);
            setNewEvent({
                ...newEvent, 
                service: newEvent.service? [...newEvent.service, serviceToAdd.id] : [serviceToAdd.id]
            });
        }
    }

    const removeService = (service) => {

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
            setEventsData(eventsData.concat(newEvent));
            history.goBack();
         } else {
            setValidated(false);
         }
    }

    return(
        <div className='page-container'>
            <div className='event-form-container'>
                <div className='event-form-header'>
                    <p>New Event</p>
                    <button onClick={() => history.goBack()}>Back</button>
                </div>
                <div className='event-inputs-container'>
                    <div className='event-inputs-validation'>
                        <p className={validated ? 'validation-message-hidden' : ''}>Please fill in all the required fields</p>
                    </div>
                    <div className='event-inputs'>
                        <div className='event-inputs-row'>
                            <label className='event-inputs-label input-required'>ID</label>
                            <input disabled type='text' name='id' value={NEW_ID} className='event-inputs-input'></input>
                        </div>
                        <div className='event-inputs-row'>
                            <label className='event-inputs-label input-required'>Name</label>
                            <input type='text' name='desc' value={newEvent.desc} className='event-inputs-input' onChange={handleChange}></input>
                        </div>
                        <div className='event-inputs-row'>
                            <label className='event-inputs-label input-required'>Source</label>
                            <input type='text' name='source' value={newEvent.source} className='event-inputs-input' onChange={handleChange}></input>
                        </div>
                        <div className='event-inputs-row'>
                            <div className='event-inputs-span'>
                                <div className='event-inputs-column'>
                                    <label className='event-inputs-label input-required'>Start Date</label>
                                    <input type='date' name='startDate' value={newEvent.startDate} className='event-inputs-input' onChange={handleChange}></input>
                                </div>
                                <div className='event-inputs-column'>
                                    <label className='event-inputs-label'>End Date</label>
                                    <input type='date' name='endDate' value={newEvent.endDate} className='event-inputs-input' onChange={handleChange}></input>
                                </div>
                            </div>
                        </div>
                        <div className='event-inputs-row'>
                            <label className='event-inputs-label input-required'>Severity</label>
                            <div className='event-inputs-severity-buttons'>
                                <button value='Warning' className={buttonActive === 'Warning' ? 'event-inputs-button-warning' : ''} onClick={triggerButton}>Warning</button>
                                <button value='Minor' className={buttonActive === 'Minor' ? 'event-inputs-button-minor' : ''} onClick={triggerButton}>Minor</button>
                                <button value='Major' className={buttonActive === 'Major' ? 'event-inputs-button-major' : ''} onClick={triggerButton}>Major</button>
                                <button value='Critical' className={buttonActive === 'Critical' ? 'event-inputs-button-critical' : ''} onClick={triggerButton}>Critical</button>
                            </div>
                        </div>
                        <div className='event-inputs-row'>
                            <label className='event-inputs-label input-required'>Resolved</label>
                            <div className='event-inputs-resolved-buttons'>
                                <button className={newEvent.resolved ? 'resolved-button-highlighted' : ''}>True</button>
                                <button className={newEvent.resolved  ? '' : 'resolved-button-highlighted'} onClick={() => setResolvedFalse()}>False</button>
                            </div>
                        </div>
                    </div>
                    <div className='event-inputs'>
                        <div className='event-inputs-row'>
                            <label className='event-inputs-label'>Add Service</label>
                            <div className='event-inputs-span'>
                                <div className='event-inputs-services-container'>
                                    <select name='select-services' className='event-inputs-select' onChange={selectService}>
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
                        <div className='event-inputs-row'>
                            <label className='event-inputs-label'>Affected Services</label>
                            <ul className='event-services-list'>
                                {affectedServices.length > 0 && affectedServices.map((service, index) => 
                                (
                                    <li key={service.id} className='event-service-item'>{service.name} <AiOutlineClose onClick={() => removeService(service)}/></li>
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