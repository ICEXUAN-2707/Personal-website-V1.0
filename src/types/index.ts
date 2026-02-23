// Core Types for Personal Website

export type Theme = 'morning' | 'night';

export type PathChoice = 'rational' | 'emotional' | null;

export type AnimationPhase =
  | 'dark'
  | 'pouring'
  | 'dripping'
  | 'filling'
  | 'complete';

export interface ThemeColors {
  bgPrimary: string;
  bgSecondary: string;
  accent1: string;
  accent2: string;
  accent3: string;
  textPrimary: string;
  textSecondary: string;
}

export interface NavigationState {
  currentChapter: number;
  pathChoice: PathChoice;
  completedSteps: {
    loading: boolean;
    morningRitual: boolean;
    cognitiveMap: boolean;
    sensoryJourney: boolean;
    soundArchive: boolean;
    buildLog: boolean;
    connection: boolean;
  };
  scrollProgress: number;
}

export interface Node {
  id: string;
  label: string;
  icon: string;
  description: string;
  content: string;
  position: { x: number; y: number };
}

export interface MusicSection {
  id: 'jay' | 'rnb' | 'rock' | 'classic';
  label: string;
  color: string;
  lyrics: string[];
}

export interface LogEntry {
  date: string;
  icon: 'duolingo' | 'code';
  title: string;
  description: string;
  progress: number;
}

export interface Message {
  id: string;
  content: string;
  timestamp: number;
  author?: string;
}

export interface AnimationConfig {
  duration: {
    fast: number;
    normal: number;
    slow: number;
    theme: number;
  };
  easing: {
    smooth: string;
    bounce: string;
    elastic: string;
  };
  reducedMotion: boolean;
}
