import React, { useState } from 'react'
import axios from 'axios'
import './List.css'

const List = () => {

    const url = 'http://localhost:4000'
    const [foodList, setFoodList] = useState([]);

    const fetchAllFood = async () => {
        const response = await axios.get(`${url}/api/food/listfood`);

        if (response.data.success) {
            setFoodList({ ...foodList, response.data.foods_available })
            console.log(response.data.foods_available);
        }
        else {
            console.log(response.data.message);
        }
    }

    return (
        <div>
            <button onSubmit={fetchAllFood}>Submit</button>
        </div>
    )
}

export default List