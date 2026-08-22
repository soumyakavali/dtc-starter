import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import CheckboxWithLabel from "../checkbox"

describe("CheckboxWithLabel UI Component", () => {
  it("renders correctly with label", () => {
    render(<CheckboxWithLabel label="Accept Terms" name="terms" data-testid="test-checkbox" />)
    
    // Check if label is rendered
    expect(screen.getByText("Accept Terms")).toBeInTheDocument()
    
    // Check if checkbox is rendered
    const checkbox = screen.getByTestId("test-checkbox")
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).toHaveAttribute("name", "terms")
  })

  it("triggers onChange when clicked", () => {
    const handleChange = jest.fn()
    render(<CheckboxWithLabel label="Click me" onChange={handleChange} data-testid="test-checkbox" />)
    
    const checkbox = screen.getByTestId("test-checkbox")
    fireEvent.click(checkbox)
    
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it("reflects checked state properly", () => {
    render(<CheckboxWithLabel label="Checked Box" checked={true} data-testid="checked-checkbox" />)
    
    const checkbox = screen.getByTestId("checked-checkbox")
    expect(checkbox).toBeChecked()
    expect(checkbox).toHaveAttribute("aria-checked", "true")
  })
})
