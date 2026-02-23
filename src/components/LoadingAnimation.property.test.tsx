import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import * as fc from 'fast-check';
import LoadingAnimation from './LoadingAnimation';

jest.mock('gsap');

describe('LoadingAnimation - Property Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Feature: personal-website, Property 2: 跳过动画响应
  it('skip animation responds to any click event', () => {
    fc.assert(
      fc.property(fc.constantFrom('click', 'Enter', ' '), (interactionType) => {
        const onComplete = jest.fn();
        const onSkip = jest.fn();

        render(<LoadingAnimation onComplete={onComplete} onSkip={onSkip} />);

        const button = screen.getByRole('button', {
          name: /loading animation/i,
        });

        if (interactionType === 'click') {
          fireEvent.click(button);
        } else {
          fireEvent.keyDown(button, { key: interactionType });
        }

        // onSkip should be called exactly once
        expect(onSkip).toHaveBeenCalledTimes(1);

        return true;
      }),
      { numRuns: 50 }
    );
  });

  it('skip prevents multiple calls', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 10 }), (clickCount) => {
        const onComplete = jest.fn();
        const onSkip = jest.fn();

        render(<LoadingAnimation onComplete={onComplete} onSkip={onSkip} />);

        const button = screen.getByRole('button', {
          name: /loading animation/i,
        });

        // Click multiple times
        for (let i = 0; i < clickCount; i++) {
          fireEvent.click(button);
        }

        // onSkip should only be called once, regardless of click count
        expect(onSkip).toHaveBeenCalledTimes(1);

        return true;
      }),
      { numRuns: 50 }
    );
  });
});
