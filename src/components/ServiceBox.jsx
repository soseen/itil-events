import React from 'react'

const ServiceBox = ({priority, status}) => {


    return(
        <div className={`service-box service-box-priority-${priority} service-box-status-${status}`}></div>
    )
}

export default ServiceBox;