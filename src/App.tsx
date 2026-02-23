import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { NavigationProvider } from './contexts/NavigationContext';
import { ThemeToggle } from './components/ThemeToggle';
import { ProgressBar } from './components/ProgressBar';
import LoadingAnimation from './components/LoadingAnimation';
import { MorningRitual } from './components/MorningRitual';
import { CognitiveMap } from './components/CognitiveMap';
import { SensoryJourney } from './components/SensoryJourney';
import { SoundArchive } from './components/SoundArchive';
import { BuildLog } from './components/BuildLog';
import { Connection } from './components/Connection';
import { PathChoice } from './types';
import './styles/global.css';

function App() {
  const [showLoading, setShowLoading] = useState(true);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pathChoice, setPathChoice] = useState<PathChoice>(null);

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setCurrentChapter(1);
  };

  const handleLoadingSkip = () => {
    setShowLoading(false);
    setCurrentChapter(1);
  };

  const handlePathChoice = (choice: PathChoice) => {
    setPathChoice(choice);
    setCurrentChapter(2);
  };

  // Simulate scroll progress (in real app, this would be based on actual scroll)
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ThemeProvider>
      <NavigationProvider>
        <div className="App">
          {showLoading ? (
            <LoadingAnimation
              onComplete={handleLoadingComplete}
              onSkip={handleLoadingSkip}
            />
          ) : (
            <>
              <ThemeToggle />
              <ProgressBar
                currentChapter={currentChapter}
                scrollProgress={scrollProgress}
              />

              <main>
                {currentChapter === 1 && (
                  <MorningRitual onComplete={handlePathChoice} />
                )}

                {currentChapter >= 2 && pathChoice === 'rational' && (
                  <CognitiveMap />
                )}

                {currentChapter >= 2 && pathChoice === 'emotional' && (
                  <SensoryJourney />
                )}

                {currentChapter >= 2 && <SoundArchive />}

                {currentChapter >= 2 && <BuildLog />}

                {currentChapter >= 2 && <Connection pathChoice={pathChoice} />}
              </main>
            </>
          )}
        </div>
      </NavigationProvider>
    </ThemeProvider>
  );
}

export default App;
