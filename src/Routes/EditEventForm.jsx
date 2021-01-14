import {React, useMemo, useState} from 'react';
import './EventForm.scss';
import {AiOutlineClose} from 'react-icons/ai';
import {useHistory} from 'react-router-dom';
import { axios } from '../Axios';
// import axios from 'axios';


const EditEventForm = ({eventsData, servicesData, eventServices, setEventsData, eventToDisplay, setEventToDisplay, setEventServices}) => {

    let history = useHistory();


    // let servicesToDisplay = eventToDisplay.service.reduce((currentServices, serviceID) => {
    //     currentServices = currentServices.concat(services.find(s => s.id === serviceID));
    //     return currentServices
    // } , []);

    const initialServices = useMemo(() => {
        const data = eventServices.reduce((filteredArray, row) => 
        row.event === eventToDisplay.id ? [...filteredArray, servicesData.find(s => s.id === row.service)] : filteredArray,
        []);
        console.log(data);
        return data
    }, [eventServices, eventToDisplay, servicesData]);
    
    

    // console.log(initialServices);

    const affectedEventServices = eventServices.reduce((newServices, row) => 
        row.event === eventToDisplay.id ? [...newServices, row] : newServices,
    []);


    const [newEvent, setNewEvent] = useState(eventToDisplay);
    const [serviceToAdd, setServiceToAdd] = useState(servicesData[0]);
    const [affectedServices, setAffectedServices] = useState(initialServices);
    const [validated, setValidated] = useState(true);
    const [buttonActive, setButtonActive] = useState(newEvent.severity);
    const [servicesToRemove, setServicesToRemove] = useState([]);


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
       let service = servicesData.find(s => s.id === parseInt(e.target.value)); 
       setServiceToAdd(service);
    }

    const addService = () => {

        if(!affectedServices?.find(service => service.id === serviceToAdd.id)){
            setAffectedServices([...affectedServices, serviceToAdd]);
            console.log(affectedServices)
        }

        if(servicesToRemove.length > 0 && servicesToRemove.find(s => s.id === serviceToAdd.id)){
            let newServicesToRemove = servicesToRemove.filter(service => service.id !== serviceToAdd.id);
            setServicesToRemove(newServicesToRemove);
        }
    }

    const removeService = (service) => {

        let filteredServices = affectedServices.reduce((newServices, serviceItem) => 
           serviceItem.id !== service.id ? [...newServices, serviceItem] : newServices, 
           [])
        
        setAffectedServices(filteredServices);

        if(initialServices.find(s => s.id === service.id)){
            let newServicesToRemove = servicesToRemove.concat(service);
            setServicesToRemove(newServicesToRemove);
        }
        
    }

    const submitData = async () => {
        let promises = []

        servicesToRemove.forEach(service => {
            const eventServiceToRemove = affectedEventServices.find(es => es.service === service.id)
            promises.push(axios.delete(`/api/eventServices/${eventServiceToRemove.id}`).catch(err => console.log(err)))
        });

        affectedServices.forEach(serviceToAdd => {
            if(affectedEventServices.find(s => s.service === serviceToAdd.id) === undefined){
                promises.push(axios.post(`/api/eventServices/`, {
                    service: serviceToAdd.id,
                    event: newEvent.id
                })
                .catch(err => console.log(err)))
            }
            
        })
        promises.push(axios.put(`/api/events/${newEvent.id}`, newEvent))

        // axios.all(promises).then(axios.spread((...responses) => {
        //         axios.get('http://localhost:8080/api/events')
        //         .then(response => {
        //             setEventsData(response.data);
        //             axios.get('http://localhost:8080/api/eventServices')
        //                 .then(response => {
        //                     setEventServices(response.data);
        //                     history.goBack();
        //                 })
        //                 .catch(err => {
        //                     console.log(err);
        //                 })
        //         })
        //         .catch(err => {
        //             console.log(err)
        //         })         
                
        // }))
        // .catch(err => {
        //     console.log(err);
        // })
        // try {
        //     await Promise.all(deletePromises);
        // } catch (error) {
        //     console.log(error);
        //     return; // nie kontynuujemy z niczym nizej
        // }

        // console.log(affectedServices);

        try {
            await Promise.all(promises);
        } catch (error) {
            console.log(error);
            return; 
        }



        try {
            const [eventResponse, eventServicesResponse] = await Promise.all([axios.get('/api/events'), axios.get('/api/eventServices')]);
            setEventsData(eventResponse.data);
            setEventServices(eventServicesResponse.data);
            history.goBack();
        } catch (error) {
            console.log(error);
        }

    }

    const validateAndSubmit = async (fieldsToValidate) => {
        if(fieldsToValidate.find(s => s === '') === undefined){
            setValidated(true);
            setEventToDisplay(newEvent);
            submitData()
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
                            <input disabled type='text' name='id' value={newEvent.id} className='event-inputs-input'></input>
                        </div>
                        <div className='event-inputs-row'>
                            <label className='event-inputs-label input-required'>Name</label>
                            <input type='text' name='name' value={newEvent.name} className='event-inputs-input' onChange={handleChange}></input>
                        </div>
                        <div className='event-inputs-row'>
                            <label className='event-inputs-label input-required'>Source</label>
                            <input type='text' name='source' value={newEvent.source} className='event-inputs-input' onChange={handleChange}></input>
                        </div>
                        {/* <div className='event-inputs-row'>
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
                        </div> */}
                        {/* <div className='event-inputs-row'>
                            <label className='event-inputs-label'>End Date</label>
                            <input type='date' name='endDate' value={newEvent.endDate} className='event-inputs-input' onChange={handleChange}></input>
                        </div> */}
                        <div className='event-inputs-row'>
                            <label className='event-inputs-label input-required'>Severity</label>
                            <div className='event-inputs-severity-buttons'>
                                <button value='Warning' className={buttonActive === 'Warning' ? 'event-inputs-button-warning' : ''} onClick={triggerButton}>Warning</button>
                                <button value='Minor' className={buttonActive === 'Minor' ? 'event-inputs-button-minor' : ''} onClick={triggerButton}>Minor</button>
                                <button value='Major' className={buttonActive === 'Major' ? 'event-inputs-button-major' : ''} onClick={triggerButton}>Major</button>
                                <button value='Critical' className={buttonActive === 'Critical' ? 'event-inputs-button-critical' : ''} onClick={triggerButton}>Critical</button>
                            </div>
                        </div>
                        {/* <div className='event-inputs-row'>
                            <label className='event-inputs-label input-required'>Resolved</label>
                            <div className='event-inputs-resolved-buttons'>
                                <button className={newEvent.resolved ? 'resolved-button-highlighted' : ''}>True</button>
                                <button className={newEvent.resolved  ? '' : 'resolved-button-highlighted'} onClick={() => setResolvedFalse()}>False</button>
                            </div>
                        </div> */}
                    </div>
                    <div className='event-inputs'>
                        <div className='event-inputs-row'>
                            <label className='event-inputs-label'>Add Service</label>
                            <div className='event-inputs-span'>
                                <div className='event-inputs-services-container'>
                                    <select name='select-services' className='event-inputs-select' onChange={selectService}>
                                        {servicesData.map((service) =>
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
                                    <li key={service.id} className='event-service-item'>{service.name}<AiOutlineClose onClick={() => removeService(service)}/></li>
                                )
                                )}
                            </ul>
                        
                        </div>
                        
                    </div>
                   
                </div>
                <button className='add-event-button' onClick={() => validateAndSubmit([newEvent.desc, newEvent.severity, newEvent.source, newEvent.startDate])}>Apply Changes</button>
            </div>
        </div>
    )
}

export default EditEventForm