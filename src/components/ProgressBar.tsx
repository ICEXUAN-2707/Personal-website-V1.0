import React, { useRef } from 'react';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  currentChapter: number;
  scrollProgress: number;
}

/**
 * ProgressBar Component
 * Displays a fixed left-side progress indicator showing:
 * - Current time (6:00 AM - 10:00 AM) based on scroll progress
 * - Liquid fill animation representing completion
 * - Chapter progress tracking
 */
// Helper function to calculate time display
const calculateTimeDisplay = (progress: number): string => {
  const startMinutes = 6 * 60; // 6:00 AM
  const endMinutes = 10 * 60; // 10:00 AM
  const currentMinutes = startMinutes + (endMinutes - startMinutes) * progress;

  const hours = Math.floor(currentMinutes / 60);
  const minutes = Math.floor(currentMinutes % 60);

  return `${hours}:${minutes.toString().padStart(2, '0')} AM`;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentChapter,
  scrollProgress,
}) => {
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Calculate time display and fill level directly from props
  const timeDisplay = calculateTimeDisplay(scrollProgress);
  const fillLevel = scrollProgress * 100;

  return (
    <div className={styles.progressBar} ref={progressBarRef}>
      <div className={styles.timeDisplay}>{timeDisplay}</div>
      <div className={styles.barContainer}>
        <div className={styles.barBackground}>
          <div
            className={styles.liquidFill}
            style={{ height: `${fillLevel}%` }}
          />
        </div>
      </div>
      <div className={styles.label}>晨间时光</div>
    </div>
  );
};
