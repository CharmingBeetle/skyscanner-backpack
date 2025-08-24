import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createRoot } from 'react-dom/client';
import Calendar from './Calendar';

// Mock the CSS modules to avoid styling issues in tests
jest.mock('./App.scss', () => ({
  Calendar: 'Calendar',
  'Calendar__title': 'Calendar__title',
  'Calendar__input': 'Calendar__input',
  'Calendar__component': 'Calendar__component',
}));


describe('Calendar Component', () => {
  // Test 1: Basic Rendering
  it('renders calendar component without crashing', () => {
    // Arrange
    const div = document.createElement('div');
    const root = createRoot(div);
    
    // Act
    root.render(<Calendar />);
    
    // Assert
    // No explicit assertion needed - if it doesn't crash, the test passes
    root.unmount();
  });

  // Test 2: Check if all elements are present
  it('renders all required elements', () => {
    // Arrange / Act
    render(<Calendar />);
    
    // Assert
    expect(screen.getByText('Select Your Travel Date')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Departure date')).toBeInTheDocument();
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  // Test 3: Check input field properties
  it('renders input field with correct properties', () => {
    // Arrange / Act
    render(<Calendar />);
    const input = screen.getByPlaceholderText('Departure date');
    
    // Assert
    expect(input).toHaveAttribute('id', 'dateInput');
    expect(input).toHaveAttribute('name', 'date');
    expect(input).toHaveAttribute('type', 'text');
  });

  // Test 4: Check initial state
  it('starts with empty date selection', () => {
    // Arrange / Act
    render(<Calendar />);
    const input = screen.getByPlaceholderText('Departure date');
    
    // Assert
    expect(input.value).toBe('');
  });

  // Test 5: Test input change handler
  it('handles input changes', () => {
    // Arrange
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<Calendar />);
    const input = screen.getByPlaceholderText('Departure date');
    
    // Act
    fireEvent.change(input, { target: { value: '2024-01-15' } });
    
    // Assert
    expect(consoleSpy).toHaveBeenCalledWith('Input changed:', '2024-01-15');
    
    // Cleanup
    consoleSpy.mockRestore();
  });

  // Test 6: Test calendar navigation
  it('renders calendar navigation elements', () => {
    // Arrange / Act
    render(<Calendar />);
    
    // Assert
    expect(screen.getByText('Previous month')).toBeInTheDocument();
    expect(screen.getByText('Next month')).toBeInTheDocument();
  });

  // Test 7: Test calendar grid structure
  it('renders calendar grid with days', () => {
    // Arrange / Act
    render(<Calendar />);
    
    // Assert
    const calendarGrid = screen.getByRole('grid');
    expect(calendarGrid).toBeInTheDocument();
    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('Tue')).toBeInTheDocument();
  });

  // Test 8: Test accessibility
  it('has accessibility attributes', () => {
    // Arrange / Act
    render(<Calendar />);
    
    // Assert
    const calendar = screen.getByRole('grid');
    expect(calendar).toHaveAttribute('aria-label');
    
    const input = screen.getByPlaceholderText('Departure date');
    expect(input).toHaveAttribute('id', 'dateInput');
  });

  // Test 9: Test component structure
  it('has correct CSS classes applied', () => {
    // Arrange /  Act
    render(<Calendar />);
    
    // Assert
    const container = screen.getByText('Select Your Travel Date').parentElement;
    expect(container).toHaveClass('Calendar');
    
    const title = screen.getByText('Select Your Travel Date');
    expect(title).toHaveClass('Calendar__title');
    
    const input = screen.getByPlaceholderText('Departure date');
    expect(input).toHaveClass('Calendar__input');
  });
});
