import { useReducer } from "react";
import CartContext from "./cart-context";

// add outside component function because this function wont need anything from that compenent and shouldnt be recreated everytime 
// the component is reevaluated.
// station object - the last state snapshot of the state managed by the reducer
// action is despatch by us in the code

const defaultCartState ={
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if(action.type === 'ADD'){
        // concat js function that adds item to the array and returns a new array, ie returns a new state of the item
        const updatedItems = state.items.concat(action.item);
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    return defaultCartState
};

const CartProvider = props=>{

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);


    const addItemToCartHandler = (item)=>{
        dispatchCartAction({type:'ADD', item:item}) 
        // convention type and string or CAPS identifier
        // add item to the reducer function we need to forward item to the reducer function => add second property
        
    }

    const removeItemFromCartHandler = id => {
        dispatchCartAction({type:'REMOVE', id: id })
    }

    const cartContext = {
        item:cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    };

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;