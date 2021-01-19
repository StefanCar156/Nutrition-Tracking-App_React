import React from 'react'
import data from '../data'
import { useGlobalContext } from './context'

const AddFood = () => {

  const { handleAddFood, handleChooseFood, selectedFood, quantity, setQuantity, measurementUnit } = useGlobalContext()

    return (
        <div className="add-food-container">
          <select id="select-food" onChange={(e) => handleChooseFood(e)} value={selectedFood}>
            <option value="">Select Food</option>
            {
                data.sort((a, b) => (a.food > b.food) ? 1 : -1).map((item, i) => {
                    return <option key={i} className="food-select-option" value={item.food}>{item.food}</option>
                })
            }
          </select>
          <div className="quantity-container">
            <input type="number" id="quantity" placeholder="0" min="0" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            <span
              id="measurement-unit" 
            >{measurementUnit}</span>
          </div>
          <button className="add-food-btn" onClick={handleAddFood}>Add Food</button>
      </div>
    )
}

export default AddFood