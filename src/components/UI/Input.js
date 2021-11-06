import React from 'react';
import classes from './Input.module.css';

const Input = React.forwardRef((props, ref)=>{
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            {/* spread operator ensures that all key/value pairs in input obj are added as props */}
            <input ref={ref} {...props.input}/>
        </div>
    )
});

export default Input;