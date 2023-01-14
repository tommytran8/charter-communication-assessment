import React, { useEffect, useRef, useState } from "react";
import fetchData from "../API/fetchData";

const getMonthOfTransaction = (transaction) => {
  return new Date(transaction.dateOfTransaction).toLocaleString("default", {
    month: "short",
  });
};

const generateMonthArr = (customerTransactions) => {
  const monthSet = new Set();
  customerTransactions.forEach((transaction) => {
    const monthOfTransaction = getMonthOfTransaction(transaction);
    monthSet.add(monthOfTransaction);
  });
  return monthSet;
};

const calculateTotalRewards = (transaction) => {
  let totalRewardPoints = 0;
  if (transaction.customerExpense > 100) {
    const dollarsSpentOver100 = transaction.customerExpense - 100;
    const dollarsSpentOver50 =
      transaction.customerExpense - dollarsSpentOver100 - 50;
    totalRewardPoints += 2 * dollarsSpentOver100 + 1 * dollarsSpentOver50;
  } else if (transaction.customerExpense > 50) {
    const dollarsSpentOver50 = transaction.customerExpense - 50;
    totalRewardPoints += 1 * dollarsSpentOver50;
  }
  return totalRewardPoints;
};

const MainPage = () => {
  const [customerTransactions, setCustomerTransactions] = useState(null);
  const [customerRewardPoints, setCustomerRewardPoints] = useState({});
  const monthSet = useRef([]);

  useEffect(() => {
    fetchData().then((res) => {
      monthSet.current = Array.from(generateMonthArr(res.data.transactions));
      setCustomerTransactions(res.data.transactions);
      const [month1, month2, month3] = monthSet.current;
      res.data.transactions.forEach((transaction) => {
        setCustomerRewardPoints((prev) => {
          return {
            ...prev,
            [transaction.customerId]: {
              ...prev[transaction.customerId],
              totalPoints: 0,
              pointsForEachMonth: {
                [month1]: 0,
                [month2]: 0,
                [month3]: 0,
              },
            },
          };
        });
      });
    });
  }, []);

  useEffect(() => {
    customerTransactions?.forEach((transaction) => {
      const totalRewardPoints = calculateTotalRewards(transaction);
      const monthOfTransaction = getMonthOfTransaction(transaction);
      setCustomerRewardPoints((prev) => {
        return {
          ...prev,
          [transaction.customerId]: {
            ...prev[transaction.customerId],
            totalPoints:
              prev[transaction.customerId].totalPoints + totalRewardPoints,
            pointsForEachMonth: {
              ...prev[transaction.customerId].pointsForEachMonth,
              [monthOfTransaction]:
                prev[transaction.customerId].pointsForEachMonth[
                  monthOfTransaction
                ] + totalRewardPoints,
            },
          },
        };
      });
    });
  }, [customerTransactions]);

  return (
    <div className="solution-container">
      <table>
        <tbody>
          <tr>
            <th>customerId</th>
            <th>totalPoints</th>
            {monthSet.current ? (
              monthSet.current.map((month) => <th key={month}>{month}</th>)
            ) : (
              <></>
            )}
          </tr>
          {customerRewardPoints ? (
            Object.keys(customerRewardPoints).map((customerId) => {
              return (
                <tr key={customerId}>
                  <td>{customerId}</td>
                  <td>{customerRewardPoints[customerId].totalPoints}</td>
                  {monthSet.current ? (
                    monthSet.current.map((month) => (
                      <td key={month}>
                        {
                          customerRewardPoints[customerId].pointsForEachMonth[
                            month
                          ]
                        }
                      </td>
                    ))
                  ) : (
                    <></>
                  )}
                </tr>
              );
            })
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MainPage;
