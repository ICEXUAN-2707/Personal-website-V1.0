import React, { useEffect, useState, useRef } from 'react';
import styles from './SensoryJourney.module.css';

export const SensoryJourney: React.FC = () => {
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [showCoffee, setShowCoffee] = useState(false);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      const currentScrollY = window.scrollY;
      const deltaY = Math.abs(currentScrollY - lastScrollY.current);
      const deltaTime = now - lastScrollTime.current;

      const velocity = deltaTime > 0 ? deltaY / deltaTime : 0;
      setScrollVelocity(velocity);

      lastScrollY.current = currentScrollY;
      lastScrollTime.current = now;

      // Check if coffee section is in view
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const inView =
          rect.top < window.innerHeight / 2 &&
          rect.bottom > window.innerHeight / 2;
        setShowCoffee(inView);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const noteSpeed = 2 + scrollVelocity * 0.5;

  return (
    <section ref={sectionRef} className={styles.container}>
      <h2 className={styles.title}>感官漫游</h2>

      {/* 五线谱音符 */}
      <div className={styles.musicStaff}>
        <svg className={styles.staffSvg} viewBox="0 0 1000 200">
          {/* 五线谱线条 */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="0"
              y1={40 + i * 30}
              x2="1000"
              y2={40 + i * 30}
              stroke="var(--text-secondary)"
              strokeWidth="1"
              opacity="0.3"
            />
          ))}
        </svg>

        {/* 流动的音符 */}
        <div className={styles.notesContainer}>
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className={styles.note}
              style={{
                animationDuration: `${20 / noteSpeed}s`,
                animationDelay: `${i * 1.5}s`,
                top: `${20 + (i % 5) * 15}%`,
                fontSize:
                  i % 3 === 0 ? '2rem' : i % 3 === 1 ? '1.5rem' : '1rem',
                opacity: i % 3 === 0 ? 0.3 : i % 3 === 1 ? 1 : 0.5,
              }}
            >
              {['♪', '♫', '♬'][i % 3]}
            </div>
          ))}
        </div>

        <p className={styles.caption}>
          散步时的背景音：风声、鸟鸣、远处车流，还有耳机里的旋律
        </p>
      </div>

      {/* 咖啡完成瞬间 */}
      {showCoffee && (
        <div className={styles.coffeeMoment}>
          <h3 className={styles.momentTitle}>这一刻，世界静止</h3>

          <div className={styles.coffeeContainer}>
            <svg className={styles.coffeeSvg} viewBox="0 0 200 200">
              {/* 咖啡杯（俯视图） */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="var(--accent-1)"
                stroke="var(--text-primary)"
                strokeWidth="2"
              />

              {/* 最后一滴 */}
              <circle
                cx="100"
                cy="100"
                r="5"
                fill="var(--accent-3)"
                className={styles.lastDrop}
              />

              {/* 涟漪 */}
              {[1, 2, 3].map((i) => (
                <circle
                  key={i}
                  cx="100"
                  cy="100"
                  r="20"
                  fill="none"
                  stroke="var(--accent-2)"
                  strokeWidth="2"
                  className={styles.ripple}
                  style={{
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              ))}

              {/* 蒸汽 */}
              {[1, 2, 3, 4].map((i) => (
                <path
                  key={i}
                  d={`M ${80 + i * 10} 100 Q ${85 + i * 10} 70, ${80 + i * 10} 40`}
                  fill="none"
                  stroke="var(--accent-2)"
                  strokeWidth="2"
                  opacity="0.5"
                  className={styles.steam}
                  style={{
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </svg>
          </div>
        </div>
      )}
    </section>
  );
};
