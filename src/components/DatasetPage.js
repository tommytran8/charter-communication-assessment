import React, { useEffect, useState } from "react";
import fetchData from "../API/fetchData";

const calculatePastThreeMonths = () => {
  const currentMonth = new Date().getMonth() % 12;
  const monthThreeMonthsPrior = (currentMonth - 3 + 12) % 12;
  return [
    (monthThreeMonthsPrior + 1) % 12,
    (monthThreeMonthsPrior + 2) % 12,
    (monthThreeMonthsPrior + 3) % 12,
  ];
};

const DatasetPage = ({ setShowSolution, setCustomerRewardPoints }) => {
  const [customerTransactions, setCustomerTransactions] = useState(null);
  const [month1, month2, month3] = calculatePastThreeMonths();
  useEffect(() => {
    fetchData().then((res) => {
      setCustomerTransactions(res.data.transactions);
    });
  }, []);

  useEffect(() => {
    customerTransactions?.forEach((transaction) => {
      const totalRewardPoints = calculateTotalRewards(transaction);
      const monthOfTransaction = new Date(
        transaction.date_of_transaction
      ).getMonth();
      setCustomerRewardPoints((prev) => {
        return {
          ...prev,
          [transaction.customer_id]: {
            ...prev[transaction.customer_id],
            total_points: prev[transaction.customer_id]
              ? prev[transaction.customer_id].total_points + totalRewardPoints
              : totalRewardPoints,
            points_last_three_months: prev[transaction.customer_id]
              ? {
                  ...prev[transaction.customer_id].points_last_three_months,
                  [monthOfTransaction]:
                    prev[transaction.customer_id].points_last_three_months[
                      [monthOfTransaction]
                    ] + totalRewardPoints,
                }
              : {
                  [month1]: 0,
                  [month2]: 0,
                  [month3]: 0,
                  [monthOfTransaction]: totalRewardPoints,
                },
          },
        };
      });
    });
  }, [customerTransactions]);

  const calculateTotalRewards = (transaction) => {
    let totalRewardPoints = 0;
    if (transaction.customer_expense > 100) {
      const dollarsSpentOver100 = transaction.customer_expense - 100;
      const dollarsSpentOver50 =
        transaction.customer_expense - dollarsSpentOver100 - 50;
      totalRewardPoints += 2 * dollarsSpentOver100;
      totalRewardPoints += 1 * dollarsSpentOver50;
    } else if (transaction.customer_expense > 50) {
      const dollarsSpentOver50 = transaction.customer_expense - 50;
      totalRewardPoints += 1 * dollarsSpentOver50;
    }
    return totalRewardPoints;
  };

  return (
    <div className="dataset-container">
      <span>Dataset:</span>
      <ul>
        {customerTransactions?.map((transaction) => {
          return (
            <li>
              <ul>
                <li>customer_id : {transaction.customer_id}</li>
                <li>customer_name : {transaction.customer_name}</li>
                <li>customer_expense : {transaction.customer_expense}</li>
                <li>date_of_transaction : {transaction.date_of_transaction}</li>
              </ul>
            </li>
          );
        })}
      </ul>
      <button onClick={() => setShowSolution((prev) => !prev)}>
        Show Solution
      </button>
    </div>
  );
};

export default DatasetPage;
