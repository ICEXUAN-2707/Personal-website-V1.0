import React, { useEffect, useState, useRef } from 'react';
import styles from './BuildLog.module.css';

interface LogEntry {
  date: string;
  icon: 'duolingo' | 'code';
  title: string;
  description: string;
  progress: number;
  humorText?: string;
}

const logEntries: LogEntry[] = [
  {
    date: '2025-11',
    icon: 'duolingo',
    title: '多邻国 日常打卡者',
    description: '日语学习中',
    progress: 20,
    humorText: '成就解锁：多儿的好友位*1',
  },
  {
    date: '2026-01',
    icon: 'code',
    title: 'vibe coding 初体验',
    description: '啥都不知道 → 知道一点点',
    progress: 10,
    humorText: '进度条：刚刚开始的冒险',
  },
  {
    date: '2026-02',
    icon: 'code',
    title: '第一个 React 项目',
    description: '从 Hello World 到这个网站',
    progress: 20,
    humorText: '边学边做，边做边学',
  },
  {
    date: '2024-04',
    icon: 'duolingo',
    title: '日记写作者',
    description: '很喜欢在日记本/朋友圈/微信笔记等各个角落进行碎碎念',
    progress: 45,
    humorText: '多语言切换中...',
  },
];

export const BuildLog: React.FC = () => {
  const [visibleEntries, setVisibleEntries] = useState<number[]>([]);
  const entryRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute('data-index') || '0'
            );
            setVisibleEntries((prev) =>
              prev.includes(index) ? prev : [...prev, index]
            );
          }
        });
      },
      { threshold: 0.2 }
    );

    entryRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>构建日志</h2>
      <p className={styles.subtitle}>记录这段旅程的点点滴滴</p>

      <div className={styles.timeline}>
        {logEntries.map((entry, index) => (
          <div
            key={index}
            ref={(el) => {
              entryRefs.current[index] = el;
            }}
            data-index={index}
            className={`${styles.entry} ${
              visibleEntries.includes(index) ? styles.visible : ''
            }`}
          >
            {/* 装饰胶带 */}
            <div className={styles.tape} />

            {/* 日期标签 */}
            <div className={styles.date}>{entry.date}</div>

            {/* 图标 */}
            <div className={styles.iconWrapper}>
              {entry.icon === 'duolingo' ? (
                <div className={styles.duolingoIcon}>🦉</div>
              ) : (
                <div className={styles.codeIcon}>💻</div>
              )}
            </div>

            {/* 内容卡片 */}
            <div className={styles.card}>
              <h3 className={styles.entryTitle}>{entry.title}</h3>
              <p className={styles.description}>{entry.description}</p>

              {/* 进度条 */}
              <div className={styles.progressWrapper}>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${entry.progress}%` }}
                  />
                </div>
                <span className={styles.progressText}>{entry.progress}%</span>
              </div>

              {/* 幽默文案 */}
              {entry.humorText && (
                <p className={styles.humorText}>✨ {entry.humorText}</p>
              )}
            </div>

            {/* 便签装饰 */}
            <div className={styles.stickyNote} />
          </div>
        ))}
      </div>

      {/* 时间轴线 */}
      <div className={styles.timelineLine} />
    </section>
  );
};
