import "./App.css";
import React, { useState } from "react";
import DatasetPage from "./components/DatasetPage";
import SolutionPage from "./components/SolutionPage";

function App() {
  const [customerRewardPoints, setCustomerRewardPoints] = useState({});
  const [showSolution, setShowSolution] = useState(false);

  console.log("solution", customerRewardPoints);

  return (
    <div className="App">
      <DatasetPage
        setShowSolution={setShowSolution}
        setCustomerRewardPoints={setCustomerRewardPoints}
      />
      <SolutionPage
        showSolution={showSolution}
        customerRewardPoints={customerRewardPoints}
      />
    </div>
  );
}

export default App;
