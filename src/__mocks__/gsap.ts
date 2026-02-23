// Manual mock for GSAP
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

export const gsap = {
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
};
