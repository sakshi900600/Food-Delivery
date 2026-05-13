import React from 'react'
import './FoodDisplay.css'
import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {

    const {food_list, foodLoading} = useContext(StoreContext)

    const filteredFood = food_list.filter(item => 
      category === 'All' || category === item.category
    )

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      
      {/* Loading State */}
      {foodLoading && (
        <div className="food-loading">
          <div className="loader"></div>
          <p>Loading delicious food...</p>
        </div>
      )}

      {/* Loaded State */}
      {!foodLoading && (
        <>
          {filteredFood.length > 0 ? (
            <div className="food-display-list">
              {filteredFood.map((item, index)=>{
                return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
              })}
            </div>
          ) : (
            <div className="food-empty">
              <p>No food items available in this category.</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default FoodDisplay
