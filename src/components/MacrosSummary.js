import React from 'react'
import { useGlobalContext } from './context'

const MacrosSummary = () => {

    const { totalCalories, totalProtein, totalCarbs, totalFat, dailyGoals } = useGlobalContext()
    const { dailyCalories, dailyProtein, dailyCarbs, dailyFat } = dailyGoals

    // Floor nutrients' values, to prevent multiple decimals
    const floorCalories = totalCalories.toFixed(1)
    const floorProtein = totalProtein.toFixed(1)
    const floorCarbs = totalCarbs.toFixed(1)
    const floorFat = totalFat.toFixed(1)

    // If macros intake is higher than daily goal, display red border
    setTimeout(() => {
      document.querySelectorAll(".fill-in-bar").forEach((bar) => {
        if (bar.style.width.replace("%", "") > 110) {
          bar.classList.add("fill-in-danger")
        } else {
          bar.classList.remove("fill-in-danger")
        }
     })
    }, 10)
    

    return (
        <div className="macros-summary">
        <h1>Macronutrients</h1>
        <div className="bars">
          <div id="calories-goal-container">
            <span>Calories: {`${floorCalories}kcal / ${dailyCalories}kcal (${Math.floor(floorCalories/dailyCalories*100)}%)`}</span>
            <div className="fill-in-bar" style={{width: `${floorCalories/dailyCalories*100}%`}}></div>
          </div>

          <div id="protein-goal-container">
            <span>Protein: {`${floorProtein}g / ${dailyProtein}g (${Math.floor(floorProtein/dailyProtein*100)}%)`}</span>
            <div className="fill-in-bar" style={{width: `${floorProtein/dailyProtein*100}%`}}></div>
          </div>

          <div id="carbs-goal-container">
            <span>Carbohydrates: {`${floorCarbs}g / ${dailyCarbs}g (${Math.floor(floorCarbs/dailyCarbs*100)}%)`}</span>
            <div className="fill-in-bar" style={{width: `${floorCarbs/dailyCarbs*100}%`}}></div>
          </div>
          
          <div id="fats-goal-container">
            <span>Fats: {`${floorFat}g / ${dailyFat}g (${Math.floor(floorFat/dailyFat*100)}%)`}</span>
            <div className="fill-in-bar" style={{width: `${floorFat/dailyFat*100}%`}}></div>
          </div>
        </div>
      </div>
    )
}
export default MacrosSummary