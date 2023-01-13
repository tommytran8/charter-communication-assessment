import React from "react";

const SolutionPage = ({ showSolution, customerRewardPoints }) => {
  return (
    <div className="solution-container">
      <ul>
        {customerRewardPoints && showSolution ? (
          Object.keys(customerRewardPoints).map((customer_id) => {
            return (
              <li>
                customer_id: {customer_id}
                <ul>
                  <li>
                    total_points :{" "}
                    {customerRewardPoints[customer_id].total_points}
                  </li>
                  <li>
                    points_last_three_months:{" "}
                    {JSON.stringify(
                      customerRewardPoints[customer_id].points_last_three_months
                    )}
                  </li>
                </ul>
              </li>
            );
          })
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
};

export default SolutionPage;
