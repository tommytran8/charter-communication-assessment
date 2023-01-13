import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders inital page with text: Dataset", () => {
  render(<App />);
  const textElement = screen.getByText(/customerId/i);
  expect(textElement).toBeInTheDocument();
});
