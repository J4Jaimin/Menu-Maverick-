import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './List.css'
import { toast } from 'react-toastify'

const List = ({ url }) => {

    const [foodList, setFoodList] = useState([]);

    const fetchAllFood = async () => {
        const response = await axios.get(`${url}/api/food/listfood`);

        console.log(response.data.foods_available);

        if (response.data.success) {
            setFoodList(response.data.foods_available);
        }
        else {
            toast.error(response.data.message);
        }
    }

    const deleteFromList = async (item) => {
        const response = await axios.delete(`${url}/api/food/remove/${item._id}`)

        await fetchAllFood();

        if (response.data.success) {
            // setFoodList((prevFoodList) => prevFoodList.filter(itemToBeFilter => itemToBeFilter._id !== item._id));
            toast.success(response.data.message);
        }
        else {
            toast.error(response.data.message);
        }
    }

    useEffect(() => {
        fetchAllFood();
    }, [])

    return (
        <div className='list add flex-col'>
            <p>All Foods List</p>
            <div className='list-table'>
                <div className='list-table-format title'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {foodList.length > 0 ?
                    (foodList.map((item, index) => {
                        return (
                            <div key={index} className='list-table-format'>
                                <img src={`${url}/images/${item.image}`} alt='' />
                                <p>{item.name}</p>
                                <p>{item.category}</p>
                                <p>${item.price}</p>
                                <p className='cursor' onClick={() => deleteFromList(item)}>X</p>
                            </div>
                        )
                    }))
                    : (
                        <div className='empty-food-list'>
                            <h3>There are no food available!, please add food by clicking add items.</h3>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default List