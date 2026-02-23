import React, { useState } from 'react';
import { Node } from '../types';
import styles from './CognitiveMap.module.css';

const nodes: Node[] = [
  {
    id: 'center',
    label: '认知探索',
    icon: '🧠',
    description: '用好奇心构建自我',
    content: '持续学习，保持开放的心态',
    position: { x: 50, y: 50 },
  },
  {
    id: 'ai',
    label: 'AI探索者',
    icon: '💬',
    description: '对AI相关很感兴趣！',
    content: '大模型/AI做图做视频/vibe coding......希望能够和大家一起学习',
    position: { x: 20, y: 25 },
  },
  {
    id: 'book',
    label: '《纳尔齐斯和歌尔德蒙》',
    icon: '✨',
    description: '感性 & 理性',
    content: '从网文到名著，尤其喜欢小说！欢迎安利~',
    position: { x: 80, y: 25 },
  },
  {
    id: 'bl',
    label: 'BL',
    icon: '🍴',
    description: '同人女再坏坏不到哪里去！',
    content: '震撼美味！',
    position: { x: 20, y: 75 },
  },
  {
    id: 'duolingo',
    label: '多邻国',
    icon: '🦉',
    description: '用绿鸟学日语',
    content: '快来和ice一起开启友情连胜吧~',
    position: { x: 80, y: 75 },
  },
];

// 定义节点之间的连接
const connections = [
  { from: 'center', to: 'ai' },
  { from: 'center', to: 'book' },
  { from: 'center', to: 'bl' },
  { from: 'center', to: 'duolingo' },
  { from: 'ai', to: 'book' },
  { from: 'book', to: 'bl' },
  { from: 'bl', to: 'duolingo' },
  { from: 'duolingo', to: 'ai' },
];

// 获取节点位置的辅助函数
const getNodePosition = (nodeId: string) => {
  const node = nodes.find((n) => n.id === nodeId);
  return node ? node.position : { x: 0, y: 0 };
};

export const CognitiveMap: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const selectedNodeData = nodes.find((n) => n.id === selectedNode);

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>认知地图</h2>

      <div className={styles.mapContainer}>
        <svg className={styles.svg} viewBox="0 0 100 100">
          {/* Connections */}
          {connections.map((connection, index) => {
            const fromPos = getNodePosition(connection.from);
            const toPos = getNodePosition(connection.to);
            return (
              <line
                key={`line-${index}`}
                x1={fromPos.x}
                y1={fromPos.y}
                x2={toPos.x}
                y2={toPos.y}
                className={`${styles.connection} ${index % 2 === 0 ? styles.connectionPrimary : styles.connectionSecondary}`}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const position = node.position;
            return (
              <g
                key={node.id}
                transform={`translate(${position.x}, ${position.y})`}
                className={styles.node}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setSelectedNode(node.id)}
              >
                <circle
                  r="6"
                  className={`${styles.nodeCircle} ${hoveredNode === node.id ? styles.hoveredCircle : ''}`}
                />
                <text
                  y="0"
                  className={`${styles.nodeLabel} ${hoveredNode === node.id ? styles.hoveredLabel : ''}`}
                >
                  {node.icon}
                </text>
                <text
                  y="10"
                  className={`${styles.nodeText} ${hoveredNode === node.id ? styles.hoveredText : ''}`}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {selectedNodeData && (
          <div className={styles.detailCard}>
            <button
              className={styles.closeButton}
              onClick={() => setSelectedNode(null)}
            >
              ✕
            </button>
            <div className={styles.cardIcon}>{selectedNodeData.icon}</div>
            <h3 className={styles.cardTitle}>{selectedNodeData.label}</h3>
            <p className={styles.cardDescription}>
              {selectedNodeData.description}
            </p>
            <p className={styles.cardContent}>{selectedNodeData.content}</p>
          </div>
        )}
      </div>
    </section>
  );
};
