import { render, screen } from "@testing-library/react";
import MainPage from "./MainPage";
import axios from "axios";

import fetchData from "../API/fetchData";

jest.mock("axios");

describe("MainPage", () => {
  describe("when API call is successful", () => {
    test("should return dataset of transactions", async () => {
      const transactions = [
        {
          customerId: 1,
          customerName: "Andrew Jackson",
          customerExpense: 105,
          dateOfTransaction: "11/10/2023",
        },
        {
          customerId: 2,
          customerName: "Jack Daniels",
          customerExpense: 200,
          dateOfTransaction: "12/03/2022",
        },
        {
          customerId: 3,
          customerName: "John Paul",
          customerExpense: 59,
          dateOfTransaction: "12/20/2022",
        },
      ];
      axios.get.mockResolvedValueOnce(transactions);

      const result = await fetchData();

      expect(axios.get).toHaveBeenCalledWith(`${window.location.origin}/data`);
      expect(result).toEqual(transactions);
    });
    test("render page with dataset", async () => {
      const transactions = [
        {
          customerId: 1,
          customerName: "Andrew Jackson",
          customerExpense: 105,
          dateOfTransaction: "11/10/2023",
        },
        {
          customerId: 2,
          customerName: "Jack Daniels",
          customerExpense: 200,
          dateOfTransaction: "12/03/2022",
        },
        {
          customerId: 3,
          customerName: "John Paul",
          customerExpense: 59,
          dateOfTransaction: "12/20/2022",
        },
      ];
      axios.get.mockResolvedValueOnce(transactions);
      const result = await fetchData();
      expect(axios.get).toHaveBeenCalledWith(`${window.location.origin}/data`);
      expect(result).toEqual(transactions);
      render(<MainPage />);
      expect(screen.getByText("/Dec/i")).toBeInTheDocument();
    });
  });
});
