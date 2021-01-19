import './App.css';
import AddFood from './components/AddFood';
import FoodSummary from './components/FoodSummary';
import ItemDetails from './components/ItemDetails';
import MacrosSummary from './components/MacrosSummary';

function App() {
  return (
    <div className="App">
      <AddFood />
      <FoodSummary />
      <MacrosSummary />
      <ItemDetails />
    </div>
  );
}

export default App;
