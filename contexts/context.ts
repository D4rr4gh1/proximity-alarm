import { Alarm } from '@/types/shared';
import { createContext, useContext } from 'react';

export interface DBContextType {
    alarms: Alarm[];
    addAlarm: (sound: string,
    label: string,
    vibrate: boolean,
    repeat: boolean,
    coords: string,
    radius: number) => void;
    deleteAlarm: (id: number) => void;
    fetchAlarms: () => void;
    turnAlarmOff: (id: number, flip: boolean) => void;
    dbVersion: number;
    getAlarm: (id: number) => Promise<Alarm | undefined>;
    setRingingAlarm: (id: number | null) => void;
    newAlarmRinging: number | null;

}

export const DBContext = createContext<DBContextType | undefined>(undefined);

export function useDBContext() {
  const db = useContext(DBContext);

  if (db === undefined) {
    throw new Error("useDBContext must be used within a DBProvider")
  }

  return db
}
