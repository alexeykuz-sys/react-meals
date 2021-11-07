import React from "react";

const CartContext = React.createContext({
    items:[],
    totalAmount: 0,
    // two functions:
    addItem: (item)=>{},
    removeItem: (id)=>{}

});

export default CartContext;