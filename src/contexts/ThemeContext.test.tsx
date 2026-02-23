import { renderHook, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext';
import { themes } from '../utils/constants';

describe('ThemeContext', () => {
  it('should provide default morning theme', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    expect(result.current.theme).toBe('morning');
    expect(result.current.colors).toEqual(themes.morning);
  });

  it('should throw error when useTheme is used outside ThemeProvider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => {
      renderHook(() => useTheme());
    }).toThrow('useTheme must be used within a ThemeProvider');

    consoleSpy.mockRestore();
  });

  it('should toggle theme from morning to night', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('night');
    expect(result.current.colors).toEqual(themes.night);
  });

  it('should toggle theme from night back to morning', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('night');

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('morning');
  });

  it('should set theme directly', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    act(() => {
      result.current.setTheme('night');
    });

    expect(result.current.theme).toBe('night');
    expect(result.current.colors).toEqual(themes.night);
  });

  it('should inject CSS variables when theme changes', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    // Check initial morning theme CSS variables
    const root = document.documentElement;
    expect(root.getAttribute('data-theme')).toBe('morning');
    expect(root.style.getPropertyValue('--bg-primary')).toBe(
      themes.morning.bgPrimary
    );
    expect(root.style.getPropertyValue('--text-primary')).toBe(
      themes.morning.textPrimary
    );

    // Toggle to night theme
    act(() => {
      result.current.toggleTheme();
    });

    // Check night theme CSS variables
    expect(root.getAttribute('data-theme')).toBe('night');
    expect(root.style.getPropertyValue('--bg-primary')).toBe(
      themes.night.bgPrimary
    );
    expect(root.style.getPropertyValue('--text-primary')).toBe(
      themes.night.textPrimary
    );
  });
});
