import { render, screen } from "@testing-library/react";
import Heading from "./Heading";

describe("Heading component", () => {
  it("renders the correct text", () => {
    render(
      <Heading size="md" className="test-class">
        Test Heading
      </Heading>
    );
    const headingElement = screen.getByText(/Test Heading/i);
    expect(headingElement).toBeInTheDocument();
  });

  it("applies the correct class based on size prop", () => {
    render(
      <Heading size="lg" className="test-class">
        Test Heading
      </Heading>
    );
    const headingElement = screen.getByText(/Test Heading/i);
    expect(headingElement).toHaveClass("text-7xl");
    expect(headingElement).toHaveClass("font-bold");
  });
});
