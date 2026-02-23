import React, { useState, useEffect } from 'react';
import { PathChoice } from '../types';
import styles from './Connection.module.css';

interface ConnectionProps {
  pathChoice: PathChoice;
}

const easterEggs = {
  rational: [
    '啊哈，理性派。我猜你也是那种会给咖啡豆分类的人？',
    '选择理性面的你，大概率也有个整理得很好的书签栏吧',
    '理性的选择！我们可以聊聊算法、设计模式，或者...咖啡的最佳萃取温度',
    '理性派登场！是不是也喜欢用思维导图整理想法？',
  ],
  emotional: [
    '感性派！我们可以一起听黑胶，聊聊那些说不清的情绪',
    '选感性面的你，是不是也会因为一首歌单曲循环一整天？',
    '感性的选择！也许我们能在某个下午，边喝咖啡边聊聊生活',
    '感性派出现！我猜你的播放列表一定很有故事',
  ],
};

export const Connection: React.FC<ConnectionProps> = ({ pathChoice }) => {
  const [copied, setCopied] = useState(false);
  const [easterEgg, setEasterEgg] = useState<string>('');

  useEffect(() => {
    if (pathChoice) {
      const eggs = easterEggs[pathChoice];
      const randomEgg = eggs[Math.floor(Math.random() * eggs.length)];
      setEasterEgg(randomEgg);
    }
  }, [pathChoice]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('17850232317');
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>联结邀请</h2>

      {/* 彩蛋文案 */}
      {easterEgg && (
        <div className={styles.easterEgg}>
          <p className={styles.easterEggText}>{easterEgg}</p>
        </div>
      )}

      {/* 两杯咖啡视觉 */}
      <div className={styles.coffeeCups}>
        <svg viewBox="0 0 400 200" className={styles.cupsSvg}>
          {/* 左边的杯子 */}
          <g className={styles.leftCup}>
            {/* 杯身 */}
            <path
              d="M 80 80 L 70 150 L 130 150 L 120 80 Z"
              fill="var(--accent-1)"
              stroke="var(--text-primary)"
              strokeWidth="2"
            />
            {/* 把手 */}
            <path
              d="M 130 100 Q 150 100, 150 120 Q 150 140, 130 140"
              fill="none"
              stroke="var(--text-primary)"
              strokeWidth="2"
            />
            {/* 咖啡液面 */}
            <ellipse
              cx="100"
              cy="90"
              rx="20"
              ry="5"
              fill="var(--accent-3)"
              opacity="0.8"
            />
            {/* 蒸汽 */}
            {[1, 2, 3].map((i) => (
              <path
                key={i}
                d={`M ${85 + i * 10} 80 Q ${87 + i * 10} 60, ${85 + i * 10} 40`}
                fill="none"
                stroke="var(--accent-2)"
                strokeWidth="2"
                opacity="0.6"
                className={styles.steam}
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </g>

          {/* 右边的杯子 */}
          <g className={styles.rightCup}>
            {/* 杯身 */}
            <path
              d="M 280 80 L 270 150 L 330 150 L 320 80 Z"
              fill="var(--accent-1)"
              stroke="var(--text-primary)"
              strokeWidth="2"
            />
            {/* 把手 */}
            <path
              d="M 270 100 Q 250 100, 250 120 Q 250 140, 270 140"
              fill="none"
              stroke="var(--text-primary)"
              strokeWidth="2"
            />
            {/* 咖啡液面 */}
            <ellipse
              cx="300"
              cy="90"
              rx="20"
              ry="5"
              fill="var(--accent-3)"
              opacity="0.8"
            />
            {/* 蒸汽 */}
            {[1, 2, 3].map((i) => (
              <path
                key={i}
                d={`M ${285 + i * 10} 80 Q ${287 + i * 10} 60, ${285 + i * 10} 40`}
                fill="none"
                stroke="var(--accent-2)"
                strokeWidth="2"
                opacity="0.6"
                className={styles.steam}
                style={{ animationDelay: `${i * 0.3 + 0.15}s` }}
              />
            ))}
          </g>

          {/* 连接的心形 */}
          <path
            d="M 200 120 Q 180 100, 160 120 Q 140 140, 200 180 Q 260 140, 240 120 Q 220 100, 200 120"
            fill="var(--accent-2)"
            opacity="0.3"
            className={styles.heart}
          />
        </svg>
      </div>

      {/* 联系方式 */}
      <div className={styles.contactCard}>
        <p className={styles.inviteText}>
          如果你也喜欢咖啡、音乐、代码，或者只是想聊聊天
        </p>
        <p className={styles.inviteText}>欢迎加我微信</p>

        <div className={styles.wechatWrapper}>
          <div className={styles.wechatId}>17850232317</div>
          <button
            className={styles.copyButton}
            onClick={handleCopy}
            aria-label="复制微信号"
          >
            {copied ? '✓ 已复制' : '复制'}
          </button>
        </div>

        {copied && (
          <p className={styles.successMessage}>微信号已复制到剪贴板！</p>
        )}
      </div>

      {/* 匿名提问箱 */}
      <div className={styles.questionBox}>
        <a 
          href="https://qntwx.cn/M6HV59" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.questionLink}
        >
          📮 匿名提问箱
        </a>
        <p className={styles.questionDescription}>人与人之间的联结也许就从一个问题开始</p>
      </div>

      {/* 结束语 */}
      <div className={styles.farewell}>
        <p className={styles.farewellText}>
          感谢你花时间看完这个小小的个人介绍
        </p>
        <p className={styles.farewellText}>
          希望我们能在某个咖啡飘香的午后相遇 ☕
        </p>
      </div>
    </section>
  );
};
