import { ThemeColors, AnimationConfig } from '../types';

// Theme Configuration
export const themes: Record<'morning' | 'night', ThemeColors> = {
  morning: {
    bgPrimary: '#F7F5F0',
    bgSecondary: '#EAE6DC',
    accent1: '#8B6F47',
    accent2: '#A4B494',
    accent3: '#D4A574',
    textPrimary: '#3D3D3D',
    textSecondary: '#6B6B6B',
  },
  night: {
    bgPrimary: '#1A1A2E',
    bgSecondary: '#16213E',
    accent1: '#E94560',
    accent2: '#FFD700',
    accent3: '#4ECDC4',
    textPrimary: '#F7F5F0',
    textSecondary: '#B8B8D1',
  },
};

// Animation Configuration
export const animationConfig: AnimationConfig = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.2,
    theme: 1.5,
  },
  easing: {
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    elastic: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  },
  reducedMotion:
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
};

// Responsive Breakpoints
export const breakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1440,
  wide: 1920,
};

// Easter Eggs
export const easterEggs = {
  rational: [
    '啊哈，理性派。我猜你也是那种会给咖啡豆分类的人？',
    '选择理性面的你，大概率也有个整理得很好的书签栏吧',
    '理性探索者！我们可以聊聊系统思维和认知框架',
  ],
  emotional: [
    '感性派！我们可以一起听黑胶，聊聊那些说不清的情绪',
    '选感性面的你，是不是也会因为一首歌单曲循环一整天？',
    '感性漫游者！让我们在音符和涟漪中相遇',
  ],
};
