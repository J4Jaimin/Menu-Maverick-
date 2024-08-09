import React, { useContext, useEffect, useState } from 'react';
import './placeorder.css';
import { StoreContext } from '../../components/Context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {

    const { getTotalCartAmount, getDeliveryFees, getGrandTotal, token, foodList, cartItems, url } = useContext(StoreContext);

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        phone: "",
    });

    const changeHandlerInputFields = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setData(data => ({ ...data, [name]: value }));
    }

    const placeOrder = async (event) => {

        event.preventDefault();

        const items = [];
        // cartItems.map((item) => {
        //     let food = foodList.find((foodItem) => foodItem._id === item);
        //     food.quantity = cartItems[item];
        //     items.push(food);
        // })

        foodList.map((item) => {
            if (cartItems[item._id] > 0) {
                item.quantity = cartItems[item._id];
                items.push(item);
            }
        })

        const newOrder = {
            data: items,
            amount: getTotalCartAmount,
            address: data,
            deliveryCharges: getDeliveryFees,
        }

        const response = await axios.post(`${url}/api/order/placeorder`, { newOrder }, { headers: { token } });

        console.log(response);
    }


    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className='place-order-left'>
                <p className='title'>Delivery Information</p>
                <div className='multi-fields'>
                    <input required type='text' name='firstName' onChange={changeHandlerInputFields} value={data.firstName} placeholder='First Name' />
                    <input required type='text' name='lastName' onChange={changeHandlerInputFields} value={data.lastName} placeholder='Last Name' />
                </div>

                <input required type='email' name='email' onChange={changeHandlerInputFields} value={data.email} placeholder='Email address' />
                <input required type='text' name='street' onChange={changeHandlerInputFields} value={data.street} placeholder='Street' />

                <div className='multi-fields'>
                    <input required type='text' name='city' onChange={changeHandlerInputFields} value={data.city} placeholder='City' />
                    <input required type='text' name='state' onChange={changeHandlerInputFields} value={data.state} placeholder='State' />
                </div>

                <input required type='text' name='zipCode' onChange={changeHandlerInputFields} value={data.zipCode} placeholder='Zip Code' />
                <input required type='text' name='phone' onChange={changeHandlerInputFields} value={data.phone} placeholder='Phone' />
            </div>
            <div className='place-order-right'>
                <div className='cart-total'>
                    <h2>Cart Total</h2>
                    <div>
                        <div className='cart-total-details'>
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className='cart-total-details'>
                            <p>Delivery Fee</p>
                            <p>${getDeliveryFees()}</p>
                        </div>
                        <hr />
                        <div className='cart-total-details'>
                            <b>Total</b>
                            <p>${getGrandTotal()}</p>
                        </div>
                    </div>
                    <button>PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder;