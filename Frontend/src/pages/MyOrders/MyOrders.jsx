import React, { useContext, useState, useEffect} from 'react'
import './MyOrders.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'


// Inside MyOrders.jsx
const MyOrders = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const { url, token } = useContext(StoreContext)

    const fetchOrders = async () => {
        try {
            setLoading(true)
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } })
            setData(response.data.data)
        } catch (error) {
            console.error("Error fetching orders:", error)
            setData([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (token) {
            fetchOrders()
        }
    }, [token])

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {loading ? (
                    <div className="orders-loading">
                        <div className="loader"></div>
                        <p>Loading your orders...</p>
                    </div>
                ) : data && data.length > 0 ? (
                    data.map((order, index) => {
                        return (
                            <div key={index} className="my-orders-order">
                                <img src={assets.parcel_icon} alt="" />
                                <p>{order.items.map((item, idx) => {
                                    if (idx === order.items.length - 1) {
                                        return item.name + " x " + item.quantity
                                    } else {
                                        return item.name + " x " + item.quantity + ", "
                                    }
                                })}</p>
                                <p>${order.amount}.00</p>
                                <p>Items: {order.items.length}</p>
                                <p><span> &#x25cf; </span> <b>{order.status}</b></p>
                                {/* <button onClick={fetchOrders}>Track Order</button> */}
                            </div>
                        )
                    })
                ) : (
                    <p className="no-orders">No orders found.</p>
                )}
            </div>
        </div>
    )
}

export default MyOrders
