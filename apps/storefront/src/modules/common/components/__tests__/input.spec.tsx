import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import Input from "../input"

describe("Input UI Component", () => {
  it("renders with label and placeholder", () => {
    render(<Input name="email" label="Email Address" type="email" data-testid="test-input" />)
    
    // The input label should be in the document
    expect(screen.getByText("Email Address")).toBeInTheDocument()
    
    // The input element itself
    const input = screen.getByTestId("test-input")
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute("type", "email")
    expect(input).toHaveAttribute("name", "email")
  })

  it("shows required asterisk when required=true", () => {
    render(<Input name="username" label="Username" required data-testid="test-input" />)
    
    expect(screen.getByText("*")).toBeInTheDocument()
    const input = screen.getByTestId("test-input")
    expect(input).toBeRequired()
  })

  it("toggles password visibility", () => {
    render(<Input name="password" label="Password" type="password" data-testid="test-password" />)
    
    const input = screen.getByTestId("test-password")
    // Initially should be password type
    expect(input).toHaveAttribute("type", "password")
    
    // Find the toggle button (EyeOff initially, then Eye)
    const toggleBtn = screen.getByRole("button")
    fireEvent.click(toggleBtn)
    
    // After click, it should change to text
    expect(input).toHaveAttribute("type", "text")
    
    // Click again to hide
    fireEvent.click(toggleBtn)
    expect(input).toHaveAttribute("type", "password")
  })
})
