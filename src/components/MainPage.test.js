import { render, screen } from "@testing-library/react";
import MainPage from "./MainPage";
import axios from "axios";

jest.mock("axios");

const mockCall = () => {
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
    {
      customerId: 2,
      customerName: "Jack Daniels",
      customerExpense: 78,
      dateOfTransaction: "01/11/2023",
    },
  ];
  axios.get.mockResolvedValueOnce({ data: { transactions: transactions } });
};

describe("MainPage", () => {
  beforeEach(() => {
    mockCall();
  });
  test("should match snapshot", () => {
    const { asFragment } = render(<MainPage />);
    expect(asFragment()).toMatchSnapshot();
  });
  test("page render months", async () => {
    render(<MainPage />);
    const novEl = await screen.findByText(/nov/i);
    expect(novEl).toBeInTheDocument();
    const decEl = await screen.findByText(/dec/i);
    expect(decEl).toBeInTheDocument();
  });
  test("page render points", async () => {
    render(<MainPage />);
    const pointListForId1 = await screen.findAllByText(/60/i);
    expect(pointListForId1).toHaveLength(2);
    const pointListForId2 = await screen.findAllByText(/250/i);
    expect(pointListForId2).toHaveLength(1);
  });
});
