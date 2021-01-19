import React from 'react'
import { useGlobalContext } from './context'
import SummaryRow from './SummaryRow'

const FoodSummary = () => {
    const { foodSummary } = useGlobalContext()
    return (
        <table className="summary-table">
            <thead>
            <tr>
                <th>Food</th>
                <th>Amount</th>
                <th>Unit</th>
                <th>Calories</th>
            </tr> 
            </thead>
            <tbody>
                {
                    //  Iterate through each item in local storage and create a new row
                    //  based on its data
                    foodSummary ?
                    foodSummary.map((row, i) => {
                        return <SummaryRow key={i} row={row} />
                    }) :
                    null
                }
            </tbody>
        </table>
    )
}

export default FoodSummary