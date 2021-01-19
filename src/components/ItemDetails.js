import React from 'react'
import { useGlobalContext } from './context'
import { AiOutlineCloseCircle } from 'react-icons/ai'

const ItemDetails = (e) => {
    const { isModalOpen, setIsModalOpen, detailsObj } = useGlobalContext()
    const { detailsFood, detailsAmount, detailsCalories, detailsProtein, detailsCarbs, detailsFat } = detailsObj
    return (
        <div className={`item-details-container ${isModalOpen && `show-modal`}`}>
            <div className="details-overlay"></div>
            <div className="item-details-modal">
                <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}><AiOutlineCloseCircle /></button>
                <h1>{detailsFood}</h1>
                <ul>
                    <li>Amount: <b>{detailsAmount}</b></li>
                    <li>Calories: <b>{detailsCalories}kcal</b></li>
                    <li>Protein: <b>{detailsProtein}g</b></li>
                    <li>Carbs: <b>{detailsCarbs}g</b></li>
                    <li>Fat: <b>{detailsFat}g</b></li>
                </ul>
            </div>
        </div>
    )
}
export default ItemDetails