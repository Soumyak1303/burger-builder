import React from 'react';
import './Input.css';

const input = (props) =>{
    let inputElement;
    const inputClasses=['InputElement'];
    if(props.shouldValidate && props.touched && props.invalid){
        inputClasses.push('Invalid')
    }

    switch(props.elementType){
        case 'input':
            inputElement=<input 
            className={inputClasses.join(' ')} 
            {...props.elementConfig} 
            value={props.value}
            onChange={props.onChange}/>

            break;
        case 'textarea':
            inputElement=<textarea 
            className={inputClasses.join(' ')} 
            {...props.elementConfig} 
            value={props.value}
            onChange={props.onChange}/>
            break;
        case 'select':
            inputElement=<select 
            className={inputClasses.join(' ')}  
            value={props.value}
            onChange={props.onChange}>
                {props.elementConfig.options.map(option=>(
                <option 
                    key={option.value}
                    value={option.value}>
                    {option.displayValue}
                </option>
            ))}
            </select>
            
            break;
        default:
        inputElement=<input 
        className={inputClasses.join(' ')} 
        {...props.elementConfig} 
        value={props.value}/>
    }
    return(
        <div className='Input'>
            <label className='Label'>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;
