import { renderHook, act } from '@testing-library/react';
import * as fc from 'fast-check';
import { NavigationProvider, useNavigation } from './NavigationContext';
import { ReactNode } from 'react';
import { PathChoice } from '../types';

const wrapper = ({ children }: { children: ReactNode }) => (
  <NavigationProvider>{children}</NavigationProvider>
);

describe('NavigationContext - Property Tests', () => {
  // Property: Chapter updates should always reflect the set value
  it('property: chapter updates are idempotent', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 6 }), (chapter) => {
        const { result } = renderHook(() => useNavigation(), { wrapper });

        act(() => {
          result.current.setCurrentChapter(chapter);
        });

        return result.current.currentChapter === chapter;
      }),
      { numRuns: 100 }
    );
  });

  // Property: Path choice updates should always reflect the set value
  it('property: path choice updates are idempotent', () => {
    fc.assert(
      fc.property(fc.constantFrom('rational', 'emotional', null), (choice) => {
        const { result } = renderHook(() => useNavigation(), { wrapper });

        act(() => {
          result.current.setPathChoice(choice as PathChoice);
        });

        return result.current.pathChoice === choice;
      }),
      { numRuns: 100 }
    );
  });

  // Property: Scroll progress updates should always reflect the set value
  it('property: scroll progress updates are idempotent', () => {
    fc.assert(
      fc.property(fc.float({ min: 0, max: 1, noNaN: true }), (progress) => {
        const { result } = renderHook(() => useNavigation(), { wrapper });

        act(() => {
          result.current.setScrollProgress(progress);
        });

        // Use approximate equality for floating point
        return Math.abs(result.current.scrollProgress - progress) < 0.0001;
      }),
      { numRuns: 100 }
    );
  });

  // Property: Completing a step should set it to true without affecting other steps
  it('property: completing a step is isolated', () => {
    const stepKeys = [
      'loading',
      'morningRitual',
      'cognitiveMap',
      'sensoryJourney',
      'soundArchive',
      'buildLog',
      'connection',
    ] as const;

    fc.assert(
      fc.property(fc.constantFrom(...stepKeys), (stepToComplete) => {
        const { result } = renderHook(() => useNavigation(), { wrapper });

        act(() => {
          result.current.completeStep(stepToComplete);
        });

        // The completed step should be true
        const isCompleted =
          result.current.completedSteps[stepToComplete] === true;

        // All other steps should remain false
        const otherStepsUnchanged = stepKeys
          .filter((key) => key !== stepToComplete)
          .every((key) => result.current.completedSteps[key] === false);

        return isCompleted && otherStepsUnchanged;
      }),
      { numRuns: 100 }
    );
  });

  // Property: Multiple step completions should accumulate
  it('property: multiple step completions accumulate', () => {
    const stepKeys = [
      'loading',
      'morningRitual',
      'cognitiveMap',
      'sensoryJourney',
      'soundArchive',
      'buildLog',
      'connection',
    ] as const;

    fc.assert(
      fc.property(
        fc.array(fc.constantFrom(...stepKeys), { minLength: 1, maxLength: 7 }),
        (stepsToComplete) => {
          const { result } = renderHook(() => useNavigation(), { wrapper });

          act(() => {
            stepsToComplete.forEach((step) => {
              result.current.completeStep(step);
            });
          });

          // All completed steps should be true
          const uniqueSteps = Array.from(new Set(stepsToComplete));
          return uniqueSteps.every(
            (step) => result.current.completedSteps[step] === true
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property: Reset should always return to initial state
  it('property: reset always returns to initial state', () => {
    fc.assert(
      fc.property(
        fc.record({
          chapter: fc.integer({ min: 0, max: 6 }),
          choice: fc.constantFrom('rational', 'emotional', null),
          progress: fc.float({ min: 0, max: 1, noNaN: true }),
          steps: fc.array(
            fc.constantFrom(
              'loading',
              'morningRitual',
              'cognitiveMap',
              'sensoryJourney',
              'soundArchive',
              'buildLog',
              'connection'
            ),
            { maxLength: 7 }
          ),
        }),
        ({ chapter, choice, progress, steps }) => {
          const { result } = renderHook(() => useNavigation(), { wrapper });

          // Make arbitrary changes
          act(() => {
            result.current.setCurrentChapter(chapter);
            result.current.setPathChoice(choice as PathChoice);
            result.current.setScrollProgress(progress);
            steps.forEach((step) => {
              result.current.completeStep(
                step as keyof typeof result.current.completedSteps
              );
            });
          });

          // Reset
          act(() => {
            result.current.resetNavigation();
          });

          // Verify initial state
          const isInitialState =
            result.current.currentChapter === 0 &&
            result.current.pathChoice === null &&
            result.current.scrollProgress === 0 &&
            Object.values(result.current.completedSteps).every(
              (value) => value === false
            );

          return isInitialState;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property: State updates should be independent
  it('property: state updates are independent', () => {
    fc.assert(
      fc.property(
        fc.record({
          chapter1: fc.integer({ min: 0, max: 6 }),
          chapter2: fc.integer({ min: 0, max: 6 }),
          progress: fc.float({ min: 0, max: 1, noNaN: true }),
        }),
        ({ chapter1, chapter2, progress }) => {
          const { result } = renderHook(() => useNavigation(), { wrapper });

          act(() => {
            result.current.setCurrentChapter(chapter1);
          });

          const chapterAfterFirst = result.current.currentChapter;

          act(() => {
            result.current.setScrollProgress(progress);
          });

          // Chapter should remain unchanged after setting progress
          const chapterUnchanged =
            result.current.currentChapter === chapterAfterFirst;

          act(() => {
            result.current.setCurrentChapter(chapter2);
          });

          // Progress should remain unchanged after setting chapter
          const progressUnchanged =
            Math.abs(result.current.scrollProgress - progress) < 0.0001;

          return chapterUnchanged && progressUnchanged;
        }
      ),
      { numRuns: 100 }
    );
  });
});
