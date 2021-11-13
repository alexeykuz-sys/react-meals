import React, { useContext, useEffect, useState } from 'react';

import CartIcon from "../Cart/CartIcon";
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) =>{

    const [btnIsHilighted, setBtnIsHilighted] = useState(false);

    // useContext and pass CartContext to it, which is managed by the closest provider
    // inside the Header Cart Btn. useContext makes REact to reavulate context every time it changes
    // in the CartProvider component. we established the connection and can ue the output in the cart    
    const cartCtx = useContext(CartContext);
    // reduce uses 2 arguments, function and starting point(0 in our case)
    // function has 2 argument =  current number and item we are looking at
    const {items} =cartCtx;
    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);


    const btnClasses = `${classes.button} ${btnIsHilighted ? classes.bump : ''}`;

    useEffect(() => {
        if(items.length === 0 ){
            return;
        } 
        setBtnIsHilighted(true);
        const timer = setTimeout(()=>{
            setBtnIsHilighted(false);
        }, 300);

        return ()=>{
            clearTimeout(timer);
        }
    }, [items])

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span>Your cart</span>
        <span className={classes.badge}>
            {numberOfCartItems}
        </span>
    </button>
};

export default HeaderCartButton;