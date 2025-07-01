import { alarmSounds } from '@/assets/alarmsounds';
import { AudioPlayerContext } from '@/contexts/alarmContext';
import { useDBContext } from '@/contexts/context';
import { useAudioPlayer } from 'expo-audio';
import { ReactNode } from 'react';
import { Vibration } from 'react-native';

interface AudioContextProps {
    children: ReactNode;
}

const PATTERN = [
    0,
    1000
]

export const AudioPlayerProvider = ({ children }: AudioContextProps) => {
  const audioPlayer = useAudioPlayer(null);
  const db = useDBContext();

  const startAlarm = async (id: number) => {
    const result = await db.getAlarm(id)

    if(!result) { console.error("No alarm found"); return }

    audioPlayer.replace(alarmSounds[result.sound])
    audioPlayer.loop = true;
    audioPlayer.play();
    Vibration.vibrate(PATTERN, true);
  }

  const stopAlarm = () => {
    Vibration.cancel();
    audioPlayer.pause()
    audioPlayer.loop = false;
  }

  return (
    <AudioPlayerContext.Provider value={{startAlarm, stopAlarm}}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export default AudioPlayerProvider