import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders Message App heading", () => {
  render(<App />);
  const heading = screen.getByText(/Message App/i);
  expect(heading).toBeInTheDocument();
});
