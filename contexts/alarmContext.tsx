import { createContext, useContext } from 'react';

interface AudioPlayerContext {
    startAlarm: (id: number) => void;
    stopAlarm: () => void;
}

export const AudioPlayerContext = createContext<AudioPlayerContext | null>(null);

export const useSharedAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useSharedAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
};