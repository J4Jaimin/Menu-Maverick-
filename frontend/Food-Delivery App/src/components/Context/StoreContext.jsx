import React, { createContext, useEffect, useState } from "react";
import { food_list } from "../../assets/frontend_assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [foodList, setFoodList] = useState([]);

    const url = "http://localhost:4000";

    let totalAmount = 0;
    let deliveryFees = 0;

    const addToCart = (itemId) => {
        console.log('hello');
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }

    const getTotalCartAmount = () => {

        if (totalAmount === 0) {
            for (const item in cartItems) {
                let itemInfo = foodList.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }

        return totalAmount;
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
        }
    }, [])

    const getDeliveryFees = () => {

        // deliveryFees = Math.floor(Math.random() * 6);

        let totalItems = 0;

        for (const item in cartItems) {
            totalItems += cartItems[item];
        }

        if (totalItems === 0) {
            deliveryFees = 0;
        }

        else if (totalItems === 1 || totalItems === 2) {
            deliveryFees = 2;
        }

        else if (totalItems > 2 && totalItems <= 5) {
            deliveryFees = 4;
        }

        else {
            deliveryFees = 5;
        }

        return deliveryFees;
    }

    const getGrandTotal = () => {

        return totalAmount + deliveryFees;
    }

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getDeliveryFees,
        getGrandTotal,
        token,
        setToken,
        url,
        foodList,
        setFoodList
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}


export default StoreContextProvider;