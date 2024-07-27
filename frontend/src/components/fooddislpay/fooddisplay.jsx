import React from 'react'
import "./fooddisplay.css"
import { storeContext } from '../../context/storeContext'
import Fooditem from '../fooditem/fooditem'

const fooddisplay = ({catagory}) => {

    const {food_list} = React.useContext(storeContext)

  return (
    <div className='food-display' id='food-display'>
        <h1>Top dishes near you</h1>
        <div className='food-display-list'>
            {food_list.map((item, index) => {
                if(catagory==='all' || catagory===item.category){
                  return <Fooditem
                  itemId={item._id}
                  key={index}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                  />
                }
               
            })}
        </div>
    </div>
  )
}

export default fooddisplay
