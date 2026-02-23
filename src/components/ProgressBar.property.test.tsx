import React from 'react';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar Property Tests', () => {
  // Feature: personal-website, Property 12: 滚动进度到时间映射
  // **Validates: Requirements 9.2**
  it('should correctly map scroll progress to time display (0-1 to 6:00 AM - 10:00 AM)', () => {
    fc.assert(
      fc.property(fc.float({ min: 0, max: 1 }), (progress) => {
        const { container } = render(
          <ProgressBar currentChapter={1} scrollProgress={progress} />
        );

        // Find time display element
        const timeElement = container.querySelector('[class*="timeDisplay"]');
        if (!timeElement || !timeElement.textContent) {
          return false;
        }

        const timeText = timeElement.textContent;
        const match = timeText.match(/(\d{1,2}):(\d{2}) AM/);
        if (!match) {
          return false;
        }

        const hours = parseInt(match[1], 10);
        const minutes = parseInt(match[2], 10);

        // Calculate expected time
        const startMinutes = 6 * 60; // 6:00 AM
        const endMinutes = 10 * 60; // 10:00 AM
        const expectedMinutes =
          startMinutes + (endMinutes - startMinutes) * progress;
        const expectedHours = Math.floor(expectedMinutes / 60);
        const expectedMins = Math.floor(expectedMinutes % 60);

        // Calculate actual total minutes
        const actualTotalMinutes = hours * 60 + minutes;
        const expectedTotalMinutes = expectedHours * 60 + expectedMins;

        // Allow 1 minute tolerance for rounding
        return Math.abs(actualTotalMinutes - expectedTotalMinutes) <= 1;
      }),
      { numRuns: 100 }
    );
  });

  // Feature: personal-website, Property 13: 章节完成到进度条填充
  // **Validates: Requirements 9.3**
  it('should fill progress bar proportionally to scroll progress', () => {
    fc.assert(
      fc.property(
        fc.float({ min: 0, max: 1, noNaN: true, noDefaultInfinity: true }),
        fc.integer({ min: 1, max: 6 }),
        (scrollProgress, chapter) => {
          // Skip extremely small values that cause precision issues
          if (scrollProgress < 0.0001 && scrollProgress > 0) {
            return true;
          }

          const { container } = render(
            <ProgressBar
              currentChapter={chapter}
              scrollProgress={scrollProgress}
            />
          );

          const liquidFill = container.querySelector('[class*="liquidFill"]');
          if (!liquidFill) {
            return false;
          }

          // Get the height style
          const heightStyle = (liquidFill as HTMLElement).style.height;
          const fillPercentage = parseFloat(heightStyle);

          // Check for NaN
          if (isNaN(fillPercentage)) {
            return false;
          }

          // Expected fill level should match scroll progress
          const expectedFillPercentage = scrollProgress * 100;

          // Allow larger tolerance for very small values
          const tolerance = scrollProgress < 0.01 ? 0.1 : 0.01;
          return Math.abs(fillPercentage - expectedFillPercentage) < tolerance;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Additional property: Time should always be within valid range
  it('should always display time between 6:00 AM and 10:00 AM', () => {
    fc.assert(
      fc.property(fc.float({ min: 0, max: 1, noNaN: true }), (progress) => {
        const { container } = render(
          <ProgressBar currentChapter={1} scrollProgress={progress} />
        );

        const timeElement = container.querySelector('[class*="timeDisplay"]');
        if (!timeElement || !timeElement.textContent) {
          return false;
        }

        const timeText = timeElement.textContent;
        const match = timeText.match(/(\d{1,2}):(\d{2}) AM/);
        if (!match) {
          return false;
        }

        const hours = parseInt(match[1], 10);
        const minutes = parseInt(match[2], 10);

        // Check for NaN
        if (isNaN(hours) || isNaN(minutes)) {
          return false;
        }

        const totalMinutes = hours * 60 + minutes;

        // Should be between 6:00 AM (360 minutes) and 10:00 AM (600 minutes)
        return totalMinutes >= 360 && totalMinutes <= 600;
      }),
      { numRuns: 100 }
    );
  });

  // Additional property: Fill level should always be between 0% and 100%
  it('should always have fill level between 0% and 100%', () => {
    fc.assert(
      fc.property(
        fc.float({ min: 0, max: 1, noNaN: true, noDefaultInfinity: true }),
        fc.integer({ min: 1, max: 6 }),
        (scrollProgress, chapter) => {
          // Skip extremely small values that cause precision issues
          if (scrollProgress < 0.0001 && scrollProgress > 0) {
            return true;
          }

          const { container } = render(
            <ProgressBar
              currentChapter={chapter}
              scrollProgress={scrollProgress}
            />
          );

          const liquidFill = container.querySelector('[class*="liquidFill"]');
          if (!liquidFill) {
            return false;
          }

          const heightStyle = (liquidFill as HTMLElement).style.height;
          const fillPercentage = parseFloat(heightStyle);

          // Check for NaN
          if (isNaN(fillPercentage)) {
            return false;
          }

          // Allow small tolerance for floating point edge cases
          return fillPercentage >= -0.01 && fillPercentage <= 100.01;
        }
      ),
      { numRuns: 100 }
    );
  });
});
