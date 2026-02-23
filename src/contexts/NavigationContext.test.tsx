import { renderHook, act } from '@testing-library/react';
import { NavigationProvider, useNavigation } from './NavigationContext';
import { ReactNode } from 'react';

const wrapper = ({ children }: { children: ReactNode }) => (
  <NavigationProvider>{children}</NavigationProvider>
);

describe('NavigationContext', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useNavigation(), { wrapper });

    expect(result.current.currentChapter).toBe(0);
    expect(result.current.pathChoice).toBeNull();
    expect(result.current.scrollProgress).toBe(0);
    expect(result.current.completedSteps).toEqual({
      loading: false,
      morningRitual: false,
      cognitiveMap: false,
      sensoryJourney: false,
      soundArchive: false,
      buildLog: false,
      connection: false,
    });
  });

  it('should update current chapter', () => {
    const { result } = renderHook(() => useNavigation(), { wrapper });

    act(() => {
      result.current.setCurrentChapter(2);
    });

    expect(result.current.currentChapter).toBe(2);
  });

  it('should update path choice', () => {
    const { result } = renderHook(() => useNavigation(), { wrapper });

    act(() => {
      result.current.setPathChoice('rational');
    });

    expect(result.current.pathChoice).toBe('rational');

    act(() => {
      result.current.setPathChoice('emotional');
    });

    expect(result.current.pathChoice).toBe('emotional');
  });

  it('should update scroll progress', () => {
    const { result } = renderHook(() => useNavigation(), { wrapper });

    act(() => {
      result.current.setScrollProgress(0.5);
    });

    expect(result.current.scrollProgress).toBe(0.5);
  });

  it('should complete individual steps', () => {
    const { result } = renderHook(() => useNavigation(), { wrapper });

    act(() => {
      result.current.completeStep('loading');
    });

    expect(result.current.completedSteps.loading).toBe(true);
    expect(result.current.completedSteps.morningRitual).toBe(false);

    act(() => {
      result.current.completeStep('morningRitual');
    });

    expect(result.current.completedSteps.loading).toBe(true);
    expect(result.current.completedSteps.morningRitual).toBe(true);
  });

  it('should complete multiple steps independently', () => {
    const { result } = renderHook(() => useNavigation(), { wrapper });

    act(() => {
      result.current.completeStep('cognitiveMap');
      result.current.completeStep('soundArchive');
    });

    expect(result.current.completedSteps.cognitiveMap).toBe(true);
    expect(result.current.completedSteps.soundArchive).toBe(true);
    expect(result.current.completedSteps.sensoryJourney).toBe(false);
  });

  it('should reset navigation to initial state', () => {
    const { result } = renderHook(() => useNavigation(), { wrapper });

    act(() => {
      result.current.setCurrentChapter(3);
      result.current.setPathChoice('rational');
      result.current.setScrollProgress(0.75);
      result.current.completeStep('loading');
      result.current.completeStep('morningRitual');
    });

    expect(result.current.currentChapter).toBe(3);
    expect(result.current.pathChoice).toBe('rational');

    act(() => {
      result.current.resetNavigation();
    });

    expect(result.current.currentChapter).toBe(0);
    expect(result.current.pathChoice).toBeNull();
    expect(result.current.scrollProgress).toBe(0);
    expect(result.current.completedSteps).toEqual({
      loading: false,
      morningRitual: false,
      cognitiveMap: false,
      sensoryJourney: false,
      soundArchive: false,
      buildLog: false,
      connection: false,
    });
  });

  it('should throw error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => {
      renderHook(() => useNavigation());
    }).toThrow('useNavigation must be used within a NavigationProvider');

    consoleSpy.mockRestore();
  });

  it('should maintain state across multiple updates', () => {
    const { result } = renderHook(() => useNavigation(), { wrapper });

    act(() => {
      result.current.setCurrentChapter(1);
      result.current.setPathChoice('emotional');
    });

    expect(result.current.currentChapter).toBe(1);
    expect(result.current.pathChoice).toBe('emotional');

    act(() => {
      result.current.setScrollProgress(0.3);
    });

    // Previous state should be maintained
    expect(result.current.currentChapter).toBe(1);
    expect(result.current.pathChoice).toBe('emotional');
    expect(result.current.scrollProgress).toBe(0.3);
  });
});
