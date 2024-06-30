import { createContext, useEffect } from "react";
import { food_list } from "../assets/assets";
import { useState } from "react";


export const StoreContext = createContext(null)


const StoreContextProvider = (props) =>{

    const [cartItems, setCartItems] = useState({})

    // add to cart functionality
    const addToCart = (itemId) =>{
        // if cart is empty then add 1
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }

        // else increase prev value by 1
    }


    // remove from cart functionality
    const removeFromCart = (itemId) =>{
        // decrease by 1
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    // useEffect(()=>{
    //     console.log(cartItems);
    // },[cartItems])


    const getTotalCartAmount = ()=>{
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo = food_list.find((product)=>product._id === item)
                totalAmount += itemInfo.price * cartItems[item]; // price * qty
            }
        }
        return totalAmount;
    }

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;