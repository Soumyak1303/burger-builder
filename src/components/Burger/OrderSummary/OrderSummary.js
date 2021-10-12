import React from 'react';
import Button from '../../UI/Button/Button.js'
import Auxx from '../../../hoc/Auxx/Auxx';
//import {Link} from 'react-router-dom'

const orderSummary = (props)=>{
    const ingredientSummary=Object.keys(props.ingredients).map(igKey=>{
        return <li key={igKey}>
            <span style={{textTransform:'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}
        </li>
    })
    return(
        <Auxx>
            <h3>Order Summary!</h3>
            <p>Your order inculded:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: </strong>{props.totalPrice.toFixed(2)}</p>
            <p>Continue to Checkout?</p>
            <Button btnType='Danger' clicked={props.purchaseCancelled}>CANCEL</Button>
            {/* <Link  
                to={{pathname:'/checkout',
                state: {ingredients: props.ingredients}}}> */}
                <Button btnType='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
            {/* </Link>            */}
        </Auxx>
    )
}

export default orderSummary;
