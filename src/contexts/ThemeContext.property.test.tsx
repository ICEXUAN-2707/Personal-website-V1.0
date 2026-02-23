import { renderHook, act } from '@testing-library/react';
import * as fc from 'fast-check';
import { ThemeProvider, useTheme } from './ThemeContext';
import { Theme } from '../types';

// Property test configuration
const propertyTestConfig = {
  numRuns: 100,
  verbose: true,
};

describe('ThemeContext Property Tests', () => {
  // Feature: personal-website, Property 14: 主题切换往返
  // **Validates: Requirements 10.2, 10.6**
  test('theme toggle is reversible - toggling twice returns to original theme', () => {
    fc.assert(
      fc.property(fc.constantFrom('morning', 'night'), (initialTheme) => {
        const { result } = renderHook(() => useTheme(), {
          wrapper: ThemeProvider,
        });

        // Set initial theme
        act(() => {
          result.current.setTheme(initialTheme as Theme);
        });
        const afterFirst = result.current.theme;

        // First toggle
        act(() => {
          result.current.toggleTheme();
        });
        const afterToggle = result.current.theme;

        // Second toggle
        act(() => {
          result.current.toggleTheme();
        });
        const afterSecondToggle = result.current.theme;

        // Verify the property:
        // 1. Initial theme is set correctly
        // 2. First toggle changes to different theme
        // 3. Second toggle returns to original theme
        return (
          afterFirst === initialTheme &&
          afterToggle !== initialTheme &&
          afterSecondToggle === initialTheme
        );
      }),
      propertyTestConfig
    );
  });
});
