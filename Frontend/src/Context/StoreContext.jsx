import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url = import.meta.env.VITE_API_URL;

    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    // add to cart functionality
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }

        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    };

    // remove from cart functionality
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    };

    // Corrected: Added safety check to prevent "undefined" reading price
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                // Finding the specific product from the food_list
                let itemInfo = food_list.find((product) => product._id === item);
                
                // Only access .price if the item was successfully found
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            setFoodList(response.data.data || []);
        } catch (error) {
            console.error("Error fetching food list:", error);
            setFoodList([]);
        }
    };

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
            setCartItems(response.data.cartData || {});
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    // Handles initial data loading and session persistence
    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            const storedToken = localStorage.getItem("token");
            
            if (storedToken) {
                try {
                    setToken(storedToken);
                    await loadCartData(storedToken);
                } catch (error) {
                    console.log("Session expired or invalid token");
                    localStorage.removeItem("token");
                    setToken("");
                }
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;