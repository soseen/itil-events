import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './Payment.scss';
import StripeCheckout from 'react-stripe-checkout'
import { TiTick } from "react-icons/ti";
import axios from 'axios';

const Payment = ({user, setUser, loggedIn}) => {

    let history = useHistory();

    
   const subscriptionOptions = [
        {
            name: '1 month',
            price: 4.99,
            duration: 30
        },
        {
           name: '3 months',
           price: 12.99,
           duration: 90
        }
   ]

    const [product, setProduct] = useState(subscriptionOptions[0]);
    console.log(product)

    const handlePayment = async (token) => {

        try {
            console.log(product);
            const paymentResponse = await axios.post('http://localhost:8000/payment', {
                token,
                product
            })
            if(paymentResponse.data.paymentSuccess){
                try {
                    const subscriptionResponse = await axios.post('http://localhost:8000/subscriptions', {
                        name: paymentResponse.data.subscription.name,
                        endDate: paymentResponse.data.subscription.endDate,
                        UserId: user.id
                    })
                    console.log(subscriptionResponse);
                    setUser({...user, subscriptionActive: {endDate: paymentResponse.data.subscription.endDate, active: true}});
                } catch (err) {
                    console.log(err);
                }
                console.log(user);
            }
        } catch (err) {
            console.log(err);
        }


    }
    return(
        <div className='payment-page-wrapper'>
        {!user.subscriptionActive.active && 
            <div className='payment-container'>
                <div className='subscription-details-container'>
                    <h2>Subscribe to access the Event Management App</h2>
                    <div className='subscription-details-row'>
                        <p>Monitor the Status</p>
                        <TiTick/>
                    </div>
                    <div className='subscription-details-row'>
                        <p>Display Events, Tasks and Rules</p>
                        <TiTick/>
                    </div>
                    <div className='subscription-details-row'>
                        <p>Create new Tasks to resolve an Event</p>
                        <TiTick/>
                    </div>
                    <div className='subscription-details-row'>
                        <p>Resolve Tasks applied to your Team</p>
                        <TiTick/>
                    </div>
                    <div className='subscription-details-row'>
                        <p>Define Rule thresholds for the monitoring system</p>
                        <TiTick/>
                    </div>
                    <div className='subscription-details-row'>
                        <p>Display statistics</p>
                        <TiTick/>
                    </div>
                </div>
                <h3>Select subscription</h3>
                <div className='subscribe-options-container'>
                    <div className={product.price === 4.99 ? 'subscribe-option subscribe-option-highlighted' : 'subscribe-option'} onClick={() => setProduct(subscriptionOptions[0])}>
                        <p>1 month</p>
                        <div className="price">
                            <p>4,99$</p>
                        </div>
                    </div>
                <div className={product.price === 12.99 ? 'subscribe-option subscribe-option-highlighted' : 'subscribe-option'} onClick={() => setProduct(subscriptionOptions[1])}>
                    <p>3 months</p>
                    <div className="price">
                        <p>12,99$</p>
                    </div>
                </div>
            </div>
            <StripeCheckout stripeKey={process.env.REACT_APP_KEY} token={handlePayment} name='Subscription payment' amount={product.price * 100}>
                        <button className='payment-button'>{`Activate ${product.name} subscription`}</button>
            </StripeCheckout>
            </div>
            }    
        </div>
    )
}

export default Payment;