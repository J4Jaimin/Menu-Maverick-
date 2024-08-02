import React, { useContext, useEffect } from 'react'
import './fooddisplay.css';
import { StoreContext } from '../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import axios from 'axios';

const FoodDisplay = ({ category }) => {

    const { url, foodList } = useContext(StoreContext);

    // const fetchFoodList = async () => {
    //     const response = await axios.get(`${url}/api/food/listfood`);

    //     if (response.data.success) {
    //         setFoodList(response.data.foods_available);
    //     }
    // }

    // useEffect(() => {
    //     fetchFoodList();
    // }, [])

    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you.</h2>
            <div className='food-display-list'>
                {foodList.map((item, index) => {
                    if (category === 'All' || category === item.category) {
                        return <FoodItem key={index} id={item._id} name={item.name} price={item.price} img={`${url}/images/${item.image}`} desc={item.description} />
                    }
                })}
            </div>
        </div>
    )
}

export default FoodDisplay;