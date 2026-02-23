// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock GSAP
jest.mock('gsap', () => {
  const createMockTimeline = () => {
    const tl: any = {
      add: jest.fn(),
      to: jest.fn(),
      kill: jest.fn(),
      play: jest.fn(),
      pause: jest.fn(),
      progress: jest.fn(),
    };

    // Make all methods chainable
    tl.add.mockReturnValue(tl);
    tl.to.mockReturnValue(tl);
    tl.kill.mockReturnValue(tl);
    tl.play.mockReturnValue(tl);
    tl.pause.mockReturnValue(tl);
    tl.progress.mockReturnValue(tl);

    return tl;
  };

  return {
    gsap: {
      timeline: jest.fn((config?: any) => {
        const tl = createMockTimeline();
        // Call onComplete immediately if provided
        if (config?.onComplete) {
          setTimeout(config.onComplete, 0);
        }
        return tl;
      }),
      to: jest.fn(),
      from: jest.fn(),
      fromTo: jest.fn(),
    },
  };
});

// Mock window.matchMedia for tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Property-based testing configuration
export const propertyTestConfig = {
  numRuns: 100,
  verbose: true,
};
