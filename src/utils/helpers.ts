// Helper Utility Functions

/**
 * Calculate time display from scroll progress (0-1)
 * Maps to 6:00 AM - 10:00 AM
 */
export function calculateTime(progress: number): string {
  const startMinutes = 6 * 60; // 6:00 AM
  const endMinutes = 10 * 60; // 10:00 AM
  const currentMinutes = startMinutes + (endMinutes - startMinutes) * progress;

  const hours = Math.floor(currentMinutes / 60);
  const minutes = Math.floor(currentMinutes % 60);

  return `${hours}:${minutes.toString().padStart(2, '0')} AM`;
}

/**
 * Calculate note speed from scroll velocity
 */
export function calculateNoteSpeed(scrollVelocity: number): number {
  const baseSpeed = 2;
  return baseSpeed * (1 + scrollVelocity * 0.5);
}

/**
 * Check if device is mobile
 */
export function isMobile(): boolean {
  return typeof window !== 'undefined' && window.innerWidth < 768;
}

/**
 * Check if device is desktop
 */
export function isDesktop(): boolean {
  return typeof window !== 'undefined' && window.innerWidth >= 1024;
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        textArea.remove();
        return true;
      } catch (error) {
        textArea.remove();
        return false;
      }
    }
  } catch (error) {
    return false;
  }
}

/**
 * Get random item from array
 */
export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}
