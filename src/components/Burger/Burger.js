import React from 'react';
import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
    const message = <p>please add ingreadients!</p>   
    let transformedIngredients= Object.keys(props.ingredients).map(
        (igKey)=>{
            return [...Array(props.ingredients[igKey])].map((_,i)=>{
                return <BurgerIngredient type={igKey} key={igKey+i}/>  
            })
        })
        .reduce((arr,ele)=>{
        return arr.concat(ele);
        },[]);
    
    transformedIngredients = transformedIngredients.length === 0? message : transformedIngredients;
       
    //Object.keys method accepts key-value object and returns array of all keys
    return(
        <div className='Burger'>
            <BurgerIngredient type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    )
}

export default burger;
