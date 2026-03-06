import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        // Prevent running if orderId is missing
        if (!orderId) {
            navigate("/");
            return;
        }

        try {
            const response = await axios.post(url + "/api/order/verify", { success, orderId });
            if (response.data.success) {
                // Redirecting to MyOrders
                navigate("/myorders");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.log("Verification Error:", error);
            navigate("/");
        }
    }

    useEffect(() => {
        verifyPayment();
    }, [url]); // Trigger when url is ready

    return (
        <div className='verify'>
            <div className="spinner"></div>
        </div>
    )
}

export default Verify;