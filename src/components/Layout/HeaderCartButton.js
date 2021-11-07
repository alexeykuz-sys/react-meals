import React, { useContext } from 'react';

import CartIcon from "../Cart/CartIcon";
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) =>{
    // useContext and pass CartContext to it, which is managed by the closest provider
    // inside the Header Cart Btn. useContext makes REact to reavulate context every time it changes
    // in the CartProvider component. we established the connection and can ue the output in the cart    
    const cartCtx = useContext(CartContext);
    // reduce uses 2 arguments, function and starting point(0 in our case)
    // function has 2 argument =  current number and item we are looking at
    const numberOfCartItems = cartCtx.items.reduce((curNumber, item)=> {
        return curNumber + item.amount
    }, 0)

    return <button className={classes.button} onClick={props.onClick}>
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