import React, { createContext, useEffect, useState } from "react";
import { food_list } from "../../assets/frontend_assets/assets";
import axios from 'axios';
import { toast } from 'react-toastify';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [foodList, setFoodList] = useState([]);

    const url = "http://localhost:4000";

    let totalAmount = 0;
    let deliveryFees = 0;

    const addToCart = async (itemId) => {
        // if (!cartItems[itemId]) {
        //     setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        // }
        // else {
        //     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        // }

        const response = await axios.post(`${url}/api/cart/add`, {
            id: itemId
        }, {
            headers: {
                'token': localStorage.token
            }
        });

        if (response.data.success) {
            toast.success(response.data.message);
            fetchCartItems();
        }
        else {
            toast.error(response.data.message);
        }
    }

    const removeFromCart = async (itemId) => {
        // setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

        const response = await axios.post(`${url}/api/cart/remove`, {
            id: itemId
        }, {
            headers: {
                'token': localStorage.token
            }
        });

        if (response.data.success) {
            toast.success(response.data.message);
            fetchCartItems();
        }
        else {
            toast.error(response.data.message);
        }
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

    const fetchFood = async () => {
        const response = await axios.get(`${url}/api/food/listfood`);

        if (response.data.success) {
            setFoodList(response.data.foods_available);
        }
        else {
            console.log(response.data.message);
        }
    }

    const fetchCartItems = async () => {

        const response = await axios.get(`${url}/api/cart/get`, {
            headers: {
                "token": localStorage.token
            }
        });

        if (response.data.success) {
            setCartItems(response.data.cartItems);
        }
        else {
            console.log(response.data.message);
        }
    }

    useEffect(() => {

        const loadData = async () => {
            if (localStorage.getItem('token')) {
                setToken(localStorage.getItem('token'));
            }

            fetchFood();
            fetchCartItems();
        }

        loadData();

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