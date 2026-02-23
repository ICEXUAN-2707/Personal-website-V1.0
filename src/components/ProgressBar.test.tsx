import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('should render the progress bar with initial time', () => {
    render(<ProgressBar currentChapter={1} scrollProgress={0} />);

    // Should show 6:00 AM at 0% progress
    expect(screen.getByText('6:00 AM')).toBeInTheDocument();
    expect(screen.getByText('晨间时光')).toBeInTheDocument();
  });

  it('should display correct time at 50% progress', () => {
    render(<ProgressBar currentChapter={3} scrollProgress={0.5} />);

    // At 50% progress: 6:00 AM + 2 hours = 8:00 AM
    expect(screen.getByText('8:00 AM')).toBeInTheDocument();
  });

  it('should display correct time at 100% progress', () => {
    render(<ProgressBar currentChapter={6} scrollProgress={1} />);

    // At 100% progress: 10:00 AM
    expect(screen.getByText('10:00 AM')).toBeInTheDocument();
  });

  it('should display correct time at 25% progress', () => {
    render(<ProgressBar currentChapter={2} scrollProgress={0.25} />);

    // At 25% progress: 6:00 AM + 1 hour = 7:00 AM
    expect(screen.getByText('7:00 AM')).toBeInTheDocument();
  });

  it('should display correct time with minutes', () => {
    render(<ProgressBar currentChapter={2} scrollProgress={0.125} />);

    // At 12.5% progress: 6:00 AM + 30 minutes = 6:30 AM
    expect(screen.getByText('6:30 AM')).toBeInTheDocument();
  });

  it('should update time when scroll progress changes', () => {
    const { rerender } = render(
      <ProgressBar currentChapter={1} scrollProgress={0} />
    );

    expect(screen.getByText('6:00 AM')).toBeInTheDocument();

    // Update progress to 75%
    rerender(<ProgressBar currentChapter={5} scrollProgress={0.75} />);

    // At 75% progress: 6:00 AM + 3 hours = 9:00 AM
    expect(screen.getByText('9:00 AM')).toBeInTheDocument();
  });

  it('should render liquid fill element', () => {
    const { container } = render(
      <ProgressBar currentChapter={1} scrollProgress={0.5} />
    );

    const liquidFill = container.querySelector('[class*="liquidFill"]');
    expect(liquidFill).toBeInTheDocument();
    expect(liquidFill).toHaveStyle({ height: '50%' });
  });

  it('should update fill level based on scroll progress', () => {
    const { container, rerender } = render(
      <ProgressBar currentChapter={1} scrollProgress={0.3} />
    );

    let liquidFill = container.querySelector('[class*="liquidFill"]');
    expect(liquidFill).toHaveStyle({ height: '30%' });

    rerender(<ProgressBar currentChapter={2} scrollProgress={0.8} />);

    liquidFill = container.querySelector('[class*="liquidFill"]');
    expect(liquidFill).toHaveStyle({ height: '80%' });
  });
});
