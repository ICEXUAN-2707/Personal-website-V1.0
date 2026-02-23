import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import { PathChoice } from '../types';
import styles from './MorningRitual.module.css';

interface MorningRitualProps {
  onComplete: (choice: PathChoice) => void;
}

export const MorningRitual: React.FC<MorningRitualProps> = ({ onComplete }) => {
  const { completeStep } = useNavigation();
  const [steps, setSteps] = useState({
    grind: false,
    pour: false,
    wait: false,
  });

  const handleStepClick = (step: keyof typeof steps) => {
    setSteps((prev) => ({ ...prev, [step]: true }));
  };

  const allStepsComplete = steps.grind && steps.pour && steps.wait;

  const handlePathChoice = (choice: 'rational' | 'emotional') => {
    completeStep('morningRitual');
    onComplete(choice);
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>晨间仪式</h2>

      <div className={styles.steps}>
        <button
          className={`${styles.step} ${steps.grind ? styles.completed : ''}`}
          onClick={() => handleStepClick('grind')}
          disabled={steps.grind}
        >
          <span className={styles.stepIcon}>☕</span>
          <span className={styles.stepText}>研磨咖啡豆</span>
        </button>

        <button
          className={`${styles.step} ${steps.pour ? styles.completed : ''}`}
          onClick={() => handleStepClick('pour')}
          disabled={steps.pour}
        >
          <span className={styles.stepIcon}>💧</span>
          <span className={styles.stepText}>注入热水</span>
        </button>

        <button
          className={`${styles.step} ${steps.wait ? styles.completed : ''}`}
          onClick={() => handleStepClick('wait')}
          disabled={steps.wait}
        >
          <span className={styles.stepIcon}>⏳</span>
          <span className={styles.stepText}>等待萃取</span>
        </button>
      </div>

      {allStepsComplete && (
        <div className={styles.infoCard}>
          <h3 className={styles.name}>高冰轩 (ice)</h3>
          <div className={styles.tags}>
            <span className={styles.tag}>world-explorer</span>
            <span className={styles.tag}>self-builder</span>
          </div>

          <div className={styles.pathChoice}>
            <p className={styles.question}>想了解我的哪一面？</p>
            <div className={styles.buttons}>
              <button
                className={styles.choiceButton}
                onClick={() => handlePathChoice('rational')}
              >
                理性面
              </button>
              <button
                className={styles.choiceButton}
                onClick={() => handlePathChoice('emotional')}
              >
                感性面
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
