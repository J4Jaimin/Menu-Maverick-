import React, { useContext } from 'react';
import './placeorder.css';
import { StoreContext } from '../../components/Context/StoreContext';

const PlaceOrder = () => {

    const { getTotalCartAmount, getDeliveryFees, getGrandTotal } = useContext(StoreContext);

    return (
        <form className='place-order'>
            <div className='place-order-left'>
                <p className='title'>Delivery Information</p>
                <div className='multi-fields'>
                    <input type='text' placeholder='First Name' />
                    <input type='text' placeholder='Last Name' />
                </div>

                <input type='email' placeholder='Email address' />
                <input type='text' placeholder='Street' />

                <div className='multi-fields'>
                    <input type='text' placeholder='City' />
                    <input type='text' placeholder='State' />
                </div>

                <input type='text' placeholder='Zip Code' />
                <input type='text' placeholder='Phone' />
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