import React from 'react'
import { useGlobalContext } from './context'
import { BsTrashFill } from "react-icons/bs";

const SummaryRow = ({row}) => {
    const { foodName, foodQuantity, foodMeasurement, foodCalories } = row
    const { handleRemoveRow, handleChangeAmount, isEditingAmount, confirmNewAmount, handleOpenModal } = useGlobalContext()

    return (
        <tr className="summary-row">
            <td className="food-name" onClick={(e) => handleOpenModal(e)}><button className="remove-row-btn" onClick={(e) => handleRemoveRow(e)}><BsTrashFill /></button>{foodName}</td>
            
                <td className="food-amount" onClick={(e) => handleChangeAmount(e)}>
                    {                        
                        isEditingAmount ?
                        <input type="number" className="change-amount-input" min="1" defaultValue={foodQuantity} onKeyUp={(e) => confirmNewAmount(e)} /> :
                        foodQuantity
                    }
                </td>
            
            
            <td className="food-unit" style={{textTransform: "lowercase"}}>{foodMeasurement}</td>
            <td className="food-calories">{foodQuantity * foodCalories}</td>
        </tr>
    )
}

export default SummaryRow