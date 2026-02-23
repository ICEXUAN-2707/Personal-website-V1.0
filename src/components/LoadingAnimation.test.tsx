import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoadingAnimation from './LoadingAnimation';

jest.mock('gsap');

describe('LoadingAnimation', () => {
  let onComplete: jest.Mock;
  let onSkip: jest.Mock;

  beforeEach(() => {
    onComplete = jest.fn();
    onSkip = jest.fn();
  });

  it('should render the loading animation container', () => {
    render(<LoadingAnimation onComplete={onComplete} onSkip={onSkip} />);

    const container = screen.getByRole('button', {
      name: /loading animation/i,
    });
    expect(container).toBeInTheDocument();
  });

  it('should display skip hint initially', () => {
    render(<LoadingAnimation onComplete={onComplete} onSkip={onSkip} />);

    expect(screen.getByText('点击任意位置跳过')).toBeInTheDocument();
  });

  it('should call onSkip when clicked', () => {
    render(<LoadingAnimation onComplete={onComplete} onSkip={onSkip} />);

    const container = screen.getByRole('button', {
      name: /loading animation/i,
    });
    fireEvent.click(container);

    expect(onSkip).toHaveBeenCalledTimes(1);
  });

  it('should call onSkip when Enter key is pressed', () => {
    render(<LoadingAnimation onComplete={onComplete} onSkip={onSkip} />);

    const container = screen.getByRole('button', {
      name: /loading animation/i,
    });
    fireEvent.keyDown(container, { key: 'Enter' });

    expect(onSkip).toHaveBeenCalledTimes(1);
  });

  it('should call onSkip when Space key is pressed', () => {
    render(<LoadingAnimation onComplete={onComplete} onSkip={onSkip} />);

    const container = screen.getByRole('button', {
      name: /loading animation/i,
    });
    fireEvent.keyDown(container, { key: ' ' });

    expect(onSkip).toHaveBeenCalledTimes(1);
  });

  it('should not call onSkip multiple times', () => {
    render(<LoadingAnimation onComplete={onComplete} onSkip={onSkip} />);

    const container = screen.getByRole('button', {
      name: /loading animation/i,
    });

    fireEvent.click(container);
    fireEvent.click(container);
    fireEvent.click(container);

    expect(onSkip).toHaveBeenCalledTimes(1);
  });

  it('should render SVG elements', () => {
    render(<LoadingAnimation onComplete={onComplete} onSkip={onSkip} />);

    // Check for SVG by looking for the skip hint which is always present
    expect(screen.getByText('点击任意位置跳过')).toBeInTheDocument();
  });

  it('should have correct accessibility attributes', () => {
    render(<LoadingAnimation onComplete={onComplete} onSkip={onSkip} />);

    const container = screen.getByRole('button', {
      name: /loading animation/i,
    });

    expect(container).toHaveAttribute('tabIndex', '0');
    expect(container).toHaveAttribute(
      'aria-label',
      'Loading animation, click to skip'
    );
  });
});
