import { useReducer } from "react";
import CartContext from "./cart-context";

// add cartREducer outside component function because this function wont need anything from that compenent and shouldnt be recreated everytime 
// the component is reevaluated.
// state object - the last state snapshot of the state managed by the reducer
// action is despatch by us in the code

const defaultCartState ={
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if(action.type === 'ADD'){
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        // concat js function that adds item to the array and returns a new array, ie returns a new state of the item
        // updates states in immutable way.
        // const updatedItems = state.items.concat(action.item);
        // checking if item already exist in the list
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems;

        if (existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
            // option 1
            // updatedItem = {...action.item};
            // updatedItems = state.item.concat(updatedItem);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    if(action.type === 'REMOVE'){
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;

        if(existingItem.amount === 1){
            updatedItems = state.items.filter(item=> item.id !== action.id);
        } else {
            const updatedItem = {...existingItem, amount: existingItem.amount - 1};
            updatedItems = {...state.items};
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    return defaultCartState; 
};

// CartProvider manages cartcontet to data amd provide that context to all components that want access to it. 
const CartProvider = props=>{
    // useReducer returns an array with 2 elements:state snapshop + function to dispatch the action to reducer
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);


    const addItemToCartHandler = (item)=>{
        dispatchCartAction({type:'ADD', item:item})
        // action is an object, which have property to identify properties to id function
        // convention type and string or CAPS identifier
        // add item to the reducer function we need to forward item to the reducer function => add second property
        // we have to make sure that addItemToCartHandler is called via addItem in CartContex=>MealItemForm
        
    }

    const removeItemFromCartHandler = id => {
        dispatchCartAction({type:'REMOVE', id: id })
    }
    // helper const = object with all the fields we set up in the context itself 
    const cartContext = {
        items:cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    };

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;