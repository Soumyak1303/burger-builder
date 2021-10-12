import React from 'react';
import Burger from '../../Burger/Burger'
import './CheckoutSummary.css'
import Button from '../../UI/Button/Button'

const checkoutSummary=(props)=>{
return(
    <div className='CheckoutSummary'>
        <h1>Let's get you that burger!</h1>
        <div >
            <Burger ingredients={props.ingredients}/>
        </div>
        <Button btnType='Danger' clicked={props.onCancel}>CANCEL</Button>
        <Button btnType='Success' clicked={props.onContinue}>CONTINUE</Button>
    </div>
)
}

export default checkoutSummary;
