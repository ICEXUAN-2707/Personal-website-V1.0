import React, { useState } from 'react';
import styles from './SoundArchive.module.css';

interface MusicSection {
  id: string;
  name: string;
  color: string;
  lyrics: string[];
}

const musicSections: MusicSection[] = [
  {
    id: 'jay',
    name: 'Jay Chou',
    color: '#8B6F47',
    lyrics: [
      '我想就这样牵着你的手不放开',
      '爱能不能够永远单纯没有悲哀',
      '最美的不是下雨天，是曾与你躲过雨的屋檐',
      '你说你有点难追，想让我知难而退',
    ],
  },
  {
    id: 'rnb',
    name: 'R&B',
    color: '#E94560',
    lyrics: [
      "I can't feel my face when I'm with you",
      'But I love it, but I love it',
      'As long as you love me',
      'We could be starving, we could be homeless',
    ],
  },
  {
    id: 'indie',
    name: '音乐剧',
    color: '#4ECDC4',
    lyrics: [
      'I will wait, I will wait for you',
      'And I will hold you in my arms',
      "Home is wherever I'm with you",
      "We're just two lost souls swimming in a fish bowl",
    ],
  },
  {
    id: 'classical',
    name: 'JPop',
    color: '#95E1D3',
    lyrics: [
      '《Pretender》',
    ],
  },
];

export const SoundArchive: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [currentLyric, setCurrentLyric] = useState<string>('');
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleSectionClick = (sectionId: string) => {
    // 清除之前的定时器，防止多个定时器同时运行
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setActiveSection(sectionId);
    const section = musicSections.find((s) => s.id === sectionId);
    if (section && section.lyrics && section.lyrics.length > 0) {
      const randomLyric =
        section.lyrics[Math.floor(Math.random() * section.lyrics.length)];
      
      if (randomLyric) {
        setCurrentLyric('');

        let index = 0;
        intervalRef.current = setInterval(() => {
          if (index < randomLyric.length) {
            setCurrentLyric((prev) => prev + randomLyric[index]);
            index++;
          } else {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
          }
        }, 100);
      }
    }
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>声音档案</h2>
      <p className={styles.subtitle}>四个分区，记录不同心境的旋律</p>

      <div className={styles.recordPlayer}>
        <div
          className={`${styles.vinyl} ${isHovering ? styles.spinning : ''} ${
            activeSection ? styles.active : ''
          }`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <svg viewBox="0 0 400 400" className={styles.vinylSvg}>
            <circle
              cx="200"
              cy="200"
              r="190"
              fill="#1a1a1a"
              stroke="#333"
              strokeWidth="2"
            />

            {musicSections.map((section, index) => {
              const angle = index * 90 - 45;
              const isActive = activeSection === section.id;

              return (
                <g key={section.id}>
                  <path
                    d={`M 200 200 L ${200 + 150 * Math.cos((angle * Math.PI) / 180)} ${
                      200 + 150 * Math.sin((angle * Math.PI) / 180)
                    } A 150 150 0 0 1 ${
                      200 + 150 * Math.cos(((angle + 90) * Math.PI) / 180)
                    } ${200 + 150 * Math.sin(((angle + 90) * Math.PI) / 180)} Z`}
                    fill={isActive ? section.color : '#2a2a2a'}
                    stroke="#444"
                    strokeWidth="2"
                    className={styles.section}
                    onClick={() => handleSectionClick(section.id)}
                    style={{ cursor: 'pointer', transition: 'fill 0.3s' }}
                  />

                  <text
                    x={200 + 100 * Math.cos(((angle + 45) * Math.PI) / 180)}
                    y={200 + 100 * Math.sin(((angle + 45) * Math.PI) / 180)}
                    textAnchor="middle"
                    fill="white"
                    fontSize="14"
                    fontWeight="bold"
                    style={{ pointerEvents: 'none' }}
                  >
                    {section.name}
                  </text>
                </g>
              );
            })}

            <circle
              cx="200"
              cy="200"
              r="30"
              fill="#0a0a0a"
              stroke="#666"
              strokeWidth="2"
            />
            <circle cx="200" cy="200" r="15" fill="#1a1a1a" />

            {[...Array(8)].map((_, i) => (
              <circle
                key={i}
                cx="200"
                cy="200"
                r={50 + i * 15}
                fill="none"
                stroke="#333"
                strokeWidth="0.5"
                opacity="0.3"
              />
            ))}
          </svg>
        </div>

        <div
          className={`${styles.tonearm} ${isHovering ? styles.playing : ''}`}
        >
          <svg viewBox="0 0 100 200" className={styles.tonearmSvg}>
            <line
              x1="50"
              y1="20"
              x2="50"
              y2="180"
              stroke="#666"
              strokeWidth="3"
            />
            <circle cx="50" cy="20" r="8" fill="#888" />
            <circle cx="50" cy="180" r="5" fill="#444" />
          </svg>
        </div>
      </div>

      {currentLyric && (
        <div className={styles.lyricsDisplay}>
          <p className={styles.lyric}>{currentLyric}</p>
        </div>
      )}

      <p className={styles.description}>
        悬停唱片，看唱针落下；点击分区，听一句歌词
      </p>
    </section>
  );
};
