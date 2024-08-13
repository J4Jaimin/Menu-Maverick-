import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../components/Context/StoreContext';
import './verify.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url, token } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {

        const response = await axios.post(`${url}/api/order/verify`, { orderId, success });

        if (response.data.success) {
            toast.success(response.data.message);
            navigate('/myorders');
        }
        else {
            toast.error(response.data.message);
            navigate('/');
        }
    }

    useEffect(() => {

        verifyPayment();

    }, [])

    return (
        <div className="verify">
            <div className="spinner"></div>
        </div>
    )
}

export default Verify;