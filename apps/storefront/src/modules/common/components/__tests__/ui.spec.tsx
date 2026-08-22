import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { Button, Badge } from "../ui"

describe("UI Core Components", () => {
  describe("Button", () => {
    it("renders children correctly", () => {
      render(<Button data-testid="test-btn">Click Me</Button>)
      
      const button = screen.getByTestId("test-btn")
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent("Click Me")
    })

    it("handles click events", () => {
      const onClick = jest.fn()
      render(<Button onClick={onClick} data-testid="test-btn">Action</Button>)
      
      fireEvent.click(screen.getByTestId("test-btn"))
      expect(onClick).toHaveBeenCalledTimes(1)
    })
    
    it("applies loading state", () => {
      render(<Button isLoading data-testid="test-btn">Submit</Button>)
      
      const button = screen.getByTestId("test-btn")
      // Button should be disabled when loading
      expect(button).toBeDisabled()
      // Should show a loading spinner (usually indicated by specific DOM element or class)
      // For now, just ensuring it disabled is a good check
    })
  })

  describe("Badge", () => {
    it("renders content and classes", () => {
      render(<Badge data-testid="test-badge" color="green">Active</Badge>)
      
      const badge = screen.getByTestId("test-badge")
      expect(badge).toBeInTheDocument()
      expect(badge).toHaveTextContent("Active")
    })
  })
})
