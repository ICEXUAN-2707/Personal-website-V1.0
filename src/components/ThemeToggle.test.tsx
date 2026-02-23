import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from './ThemeToggle';
import { ThemeProvider } from '../contexts/ThemeContext';

describe('ThemeToggle', () => {
  it('should render the toggle button', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should show sun icon in morning mode', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', '切换到深夜模式');
    expect(button.textContent).toContain('☀️');
  });

  it('should toggle to night mode when clicked', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');

    // Initial state: morning mode
    expect(button).toHaveAttribute('aria-label', '切换到深夜模式');

    // Click to toggle
    fireEvent.click(button);

    // Should now be in night mode
    expect(button).toHaveAttribute('aria-label', '切换到晨间模式');
  });

  it('should toggle back to morning mode on second click', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');

    // Click twice
    fireEvent.click(button);
    fireEvent.click(button);

    // Should be back to morning mode
    expect(button).toHaveAttribute('aria-label', '切换到深夜模式');
  });

  it('should have proper accessibility attributes', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label');
    expect(button).toHaveAttribute('title');
  });

  it('should contain both sun and moon icons', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');
    // Both icons should be in the DOM (visibility controlled by CSS)
    expect(button.textContent).toContain('☀️');
    expect(button.textContent).toContain('🌙');
  });
});
