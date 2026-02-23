import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { AnimationPhase } from '../types';
import styles from './LoadingAnimation.module.css';

interface LoadingAnimationProps {
  onComplete: () => void;
  onSkip: () => void;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({
  onComplete,
  onSkip,
}) => {
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>('dark');
  const [isSkipped, setIsSkipped] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create GSAP timeline for animation sequence
    const tl = gsap.timeline({
      onComplete: () => {
        setAnimationPhase('complete');
        onComplete();
      },
    });

    timelineRef.current = tl;

    // Phase 1: Dark background (3 seconds)
    tl.add(() => setAnimationPhase('dark'))
      .to({}, { duration: 3 })

      // Phase 2: Pouring (hot water pouring animation, 2 seconds)
      .add(() => setAnimationPhase('pouring'))
      .to('.water-path', {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power2.inOut',
      })

      // Phase 3: Dripping (coffee drops falling, 1.5 seconds)
      .add(() => setAnimationPhase('dripping'))
      .to('.coffee-drop', {
        y: 200,
        opacity: 0,
        duration: 1.5,
        ease: 'power1.in',
        stagger: 0.2,
      })

      // Phase 4: Filling (liquid level rising, 2 seconds)
      .add(() => setAnimationPhase('filling'))
      .to('.liquid-fill', {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 2,
        ease: 'power2.out',
      })

      // Phase 5: Transition (fade to white, 1 second)
      .to(containerRef.current, {
        backgroundColor: '#F7F5F0',
        duration: 1,
        ease: 'power2.inOut',
      });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  const handleSkip = () => {
    if (timelineRef.current && !isSkipped) {
      setIsSkipped(true);
      timelineRef.current.kill();
      setAnimationPhase('complete');
      onSkip();
    }
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onClick={handleSkip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleSkip();
        }
      }}
      aria-label="Loading animation, click to skip"
    >
      <div className={styles.content}>
        {/* SVG for coffee brewing animation */}
        <svg
          className={styles.svg}
          viewBox="0 0 400 600"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Filter/Dripper */}
          <g className={styles.dripper}>
            <path
              d="M 150 100 L 120 180 L 280 180 L 250 100 Z"
              fill="none"
              stroke="var(--text-primary)"
              strokeWidth="2"
            />
            <line
              x1="150"
              y1="100"
              x2="250"
              y2="100"
              stroke="var(--text-primary)"
              strokeWidth="2"
            />
          </g>

          {/* Hot water pouring path (Phase 2) */}
          {animationPhase !== 'dark' && (
            <path
              className="water-path"
              d="M 200 50 Q 195 75, 200 100 L 200 150"
              fill="none"
              stroke="var(--accent2)"
              strokeWidth="3"
              strokeDasharray="100"
              strokeDashoffset="100"
            />
          )}

          {/* Coffee drops (Phase 3) */}
          {(animationPhase === 'dripping' ||
            animationPhase === 'filling' ||
            animationPhase === 'complete') && (
            <>
              <circle
                className="coffee-drop"
                cx="200"
                cy="180"
                r="4"
                fill="var(--accent1)"
              />
              <circle
                className="coffee-drop"
                cx="190"
                cy="180"
                r="3"
                fill="var(--accent1)"
              />
              <circle
                className="coffee-drop"
                cx="210"
                cy="180"
                r="3"
                fill="var(--accent1)"
              />
            </>
          )}

          {/* Coffee cup */}
          <g className={styles.cup}>
            <path
              d="M 120 250 L 100 450 L 300 450 L 280 250 Z"
              fill="none"
              stroke="var(--text-primary)"
              strokeWidth="2"
            />
            {/* Handle */}
            <path
              d="M 300 280 Q 340 320, 300 360"
              fill="none"
              stroke="var(--text-primary)"
              strokeWidth="2"
            />
          </g>

          {/* Liquid fill (Phase 4) */}
          {(animationPhase === 'filling' || animationPhase === 'complete') && (
            <rect
              className="liquid-fill"
              x="100"
              y="250"
              width="200"
              height="200"
              fill="var(--accent1)"
              clipPath="inset(100% 0% 0% 0%)"
            />
          )}
        </svg>

        {/* Skip hint */}
        {animationPhase !== 'complete' && (
          <p className={styles.skipHint}>点击任意位置跳过</p>
        )}
      </div>
    </div>
  );
};

export default LoadingAnimation;
