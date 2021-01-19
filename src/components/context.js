import React, { useState, useContext, useEffect } from 'react'
import data from '../data'

const AppContext = React.createContext()

const AppProvider = ({children}) => {

    const getLocalStorage = () => {
        let foodSummary = localStorage.getItem('foodSummary')
        if (foodSummary) {
            return JSON.parse(localStorage.getItem('foodSummary'))
        } 
        else {
          return []
        }
    }

    const [foodSummary, setFoodSummary] = useState(getLocalStorage())
    const [totalCalories, setTotalCalories] = useState(0)
    const [totalProtein, setTotalProtein] = useState(0)
    const [totalCarbs, setTotalCarbs] = useState(0)
    const [totalFat, setTotalFat] = useState(0)
    const [selectedFood, setSelectedFood] = useState("")
    const [measurementUnit, setMeasurementUnit] = useState("grams")
    const [quantity, setQuantity ] = useState("")
    const [currentCalories, setCurrentCalories] = useState(0)
    const [currentProtein, setCurrentProtein] = useState(0)
    const [currentCarbs, setCurrentCarbs] = useState(0)
    const [currentFat, setCurrentFat] = useState(0)
    const [isEditingAmount, setIsEditingAmount] = useState(false)

    const dailyGoals = {
        dailyCalories: 2107,
        dailyProtein: 131.7,
        dailyCarbs: 210.7,
        dailyFat: 81.9
    }
    const resetMacros = () => {
        setTotalCalories(0)
        setTotalProtein(0)
        setTotalCarbs(0)
        setTotalFat(0)
    }

    const handleChooseFood = (e) => {
        setSelectedFood(e.target.value)
        data.map((item) => {
            if (item.food === e.target.value) {
                setMeasurementUnit(item.measurementUnit)
                setCurrentCalories(item.calories)
                setCurrentProtein(item.protein)
                setCurrentCarbs(item.carbohydrates)
                setCurrentFat(item.fat)
            }
        })
    }

    const handleAddFood = () => {
        // Check if user selected food and quantity
        if (!selectedFood || !quantity || quantity === 0) {
            return
        }
        // Add food to local storage 
        let newRow = {
            foodName: selectedFood,
            foodCalories: currentCalories,
            foodProtein: currentProtein,
            foodCarbs: currentCarbs,
            foodFat: currentFat,
            foodQuantity: quantity,
            foodMeasurement: measurementUnit
        }

        setFoodSummary([...foodSummary, newRow])
        localStorage.setItem('foodSummary', JSON.stringify([...foodSummary, newRow]))
        
        // Clear selected food and quantity
        setSelectedFood("Select Food")
        setQuantity("")

    }

    // Update Macronutrients Table each time new row is added
    useEffect(() => {
            let summaryCalories = 0
            let summaryProtein = 0
            let summaryCarbs = 0
            let summaryFat = 0
        foodSummary.map((row) => {
            const { foodQuantity, foodCalories, foodProtein, foodCarbs, foodFat } = row
            summaryCalories += foodCalories * foodQuantity
            summaryProtein += foodProtein * foodQuantity
            summaryCarbs += foodCarbs * foodQuantity
            summaryFat += foodFat * foodQuantity
            setTotalCalories(summaryCalories)
            setTotalProtein(summaryProtein)
            setTotalCarbs(summaryCarbs)
            setTotalFat(summaryFat)

        })
    }, [foodSummary])

    // Remove Row
    const handleRemoveRow = (e) => {
        let targetRow = e.target.parentElement.parentElement
        let tableRows = targetRow.parentElement.childNodes
        let targetIndex = Array.prototype.indexOf.call(tableRows, targetRow);

        for ( let i = 0; i < tableRows.length; i++) {
            if (i === targetIndex) {
                const newFoodSummary = foodSummary.filter(row => foodSummary.indexOf(row) !== i)
                setFoodSummary([...newFoodSummary])
                localStorage.setItem( 'foodSummary' , JSON.stringify(newFoodSummary))

                // Reset Macronutrients Table If foodSummary is empty
                if (foodSummary.length === 1) {
                    resetMacros()
                }
            }
        }
        setIsEditingAmount(false) // To prevent changeAmount bugs between rows
    }

    // Change Amount
    const handleChangeAmount = (e) => {
        setIsEditingAmount(true)        
    }

    const confirmNewAmount = (e) => {
        if (e.keyCode === 13) {
            let targetRow = e.target.parentElement.parentElement
            let tableRows = targetRow.parentElement.childNodes
            let targetIndex = Array.prototype.indexOf.call(tableRows, targetRow);
            for ( let i = 0; i < tableRows.length; i++) {
                if (i === targetIndex) {
                    let newAmount = e.target.value
                    if (!newAmount) {
                        newAmount = 0
                    }
                    foodSummary[i].foodQuantity = newAmount
                    setFoodSummary([...foodSummary])
                    localStorage.setItem( 'foodSummary' , JSON.stringify(foodSummary))
                }
            }
            
            setIsEditingAmount(false)
        }  
        if (e.keyCode === 27) {
            setIsEditingAmount(false)
        }
    }

    // Item Details Modal
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [detailsObj, setDetailsObj] = useState({})

    const handleOpenModal = (e) => {
        // If user clicked remove button, ignore it
        if (e.target.classList.contains("remove-row-btn") ) {
            return
        } else {
            // Open Modal and send it all data
            setIsModalOpen(true)
            let itemData = {}
            // Get data from 'data.js' based upon food name
            data.map((item) => {
                if (e.target.textContent === item.food) {
                    itemData = {
                        itemProtein: item.protein,
                        itemCarbs: item.carbohydrates,
                        itemFat: item.fat,
                    }
                }
            })
            // Get Item Amount, then use it to calculate macros for modal
            let itemAmount = e.target.nextSibling.textContent
            let details = (
                {
                    detailsFood: e.target.textContent,
                    detailsAmount: `${itemAmount} ${e.target.nextSibling.nextSibling.textContent}`,
                    detailsCalories: e.target.parentElement.children[3].textContent,
                    detailsProtein: (itemData.itemProtein * itemAmount).toFixed(1),
                    detailsCarbs: (itemData.itemCarbs * itemAmount).toFixed(1),
                    detailsFat: (itemData.itemFat * itemAmount).toFixed(1)
                }
            )
            setDetailsObj(details)
        }
    }
    
    return <AppContext.Provider value={{totalCalories, totalProtein, totalCarbs, totalFat, dailyGoals, handleAddFood, handleChooseFood, selectedFood, quantity, setQuantity, measurementUnit, currentCalories, foodSummary, handleRemoveRow, handleChangeAmount, isEditingAmount, confirmNewAmount, isModalOpen, setIsModalOpen, handleOpenModal, detailsObj}}>{children}</AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }