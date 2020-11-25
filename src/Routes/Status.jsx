import React from 'react';
import './Status.css'

const Status = () => {
    return(
        <div className='status-page-container'>
            {/* <h1 className='page-title'>Status</h1> */}
        
            <div className='status-content-container'>
                <div className='status-header-container'>
                    <div className='status-header'>
                        <p>Status</p>
                    </div>
                </div>
                <div className='status-content'>
                    <div className='dashboard-container'>
                        <div className='dashboard'>
                            <div className='services-container'>
                                <p>Service</p>
                            </div>
                            <div className='service-events-container'>
                            </div>
                        </div>
                    </div>
                    <div className='stats-container'>
                        <div className='stats'>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Status;