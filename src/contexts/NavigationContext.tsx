import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { NavigationState, PathChoice } from '../types';

interface NavigationContextValue extends NavigationState {
  setCurrentChapter: (chapter: number) => void;
  setPathChoice: (choice: PathChoice) => void;
  setScrollProgress: (progress: number) => void;
  completeStep: (step: keyof NavigationState['completedSteps']) => void;
  resetNavigation: () => void;
}

const NavigationContext = createContext<NavigationContextValue | undefined>(
  undefined
);

interface NavigationProviderProps {
  children: ReactNode;
}

const initialState: NavigationState = {
  currentChapter: 0,
  pathChoice: null,
  completedSteps: {
    loading: false,
    morningRitual: false,
    cognitiveMap: false,
    sensoryJourney: false,
    soundArchive: false,
    buildLog: false,
    connection: false,
  },
  scrollProgress: 0,
};

export const NavigationProvider: React.FC<NavigationProviderProps> = ({
  children,
}) => {
  const [state, setState] = useState<NavigationState>(initialState);

  const setCurrentChapter = useCallback((chapter: number) => {
    setState((prev) => ({ ...prev, currentChapter: chapter }));
  }, []);

  const setPathChoice = useCallback((choice: PathChoice) => {
    setState((prev) => ({ ...prev, pathChoice: choice }));
  }, []);

  const setScrollProgress = useCallback((progress: number) => {
    setState((prev) => ({ ...prev, scrollProgress: progress }));
  }, []);

  const completeStep = useCallback(
    (step: keyof NavigationState['completedSteps']) => {
      setState((prev) => ({
        ...prev,
        completedSteps: {
          ...prev.completedSteps,
          [step]: true,
        },
      }));
    },
    []
  );

  const resetNavigation = useCallback(() => {
    setState(initialState);
  }, []);

  const value: NavigationContextValue = {
    ...state,
    setCurrentChapter,
    setPathChoice,
    setScrollProgress,
    completeStep,
    resetNavigation,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextValue => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
