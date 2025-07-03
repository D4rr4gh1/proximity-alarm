import { alarmSounds } from '@/assets/alarmsounds';
import { AudioPlayerContext } from '@/contexts/alarmContext';
import { useDBContext } from '@/contexts/context';
import { setDBInstance } from '@/services/databaseBridge';
import { Alarm } from '@/types/shared';
import { useAudioPlayer } from 'expo-audio';
import { ReactNode, useEffect, useState } from 'react';
import { Vibration } from 'react-native';

interface AudioContextProps {
    children: ReactNode;
}

const PATTERN = [
    1000
]

export const AudioPlayerProvider = ({ children }: AudioContextProps) => {
  const audioPlayer = useAudioPlayer(null);
  const db = useDBContext();
  const [alarmRinging, setAlarmRinging] = useState<Alarm | null>(null) 

  useEffect(() => {
    setDBInstance(db);
  }, [db])

  const startAlarm = async (id: number) => {
    const result = await db.getAlarm(id)

    if(!result) { console.error("No alarm found"); return }

    audioPlayer.replace(alarmSounds[result.sound])
    audioPlayer.loop = true;
    audioPlayer.play();
    Vibration.vibrate(PATTERN, true);

    setAlarmRinging(result);
  }

  const stopAlarm = () => {
    Vibration.cancel();
    audioPlayer.pause()
    audioPlayer.loop = false;
    setAlarmRinging(null);
    db.setRingingAlarm(null);
  }


  return (
    <AudioPlayerContext.Provider value={{startAlarm, stopAlarm, alarmRinging}}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export default AudioPlayerProvider