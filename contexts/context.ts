import { createContext, useContext } from 'react';

export type Alarm = {
    id: number;
    sound: string;
    label: string;
    vibrate: boolean;
    repeat: boolean;
    coords: string;
    radius: number;
}

interface DBContextType {
    alarms: Alarm[];
    addAlarm: (sound: string,
    label: string,
    vibrate: boolean,
    repeat: boolean,
    coords: string,
    radius: number) => void;
    deleteAlarm: (id: number) => void;
    fetchAlarms: () => void;

}

export const DBContext = createContext<DBContextType | undefined>(undefined);

export function useDBContext() {
  const db = useContext(DBContext);

  if (db === undefined) {
    throw new Error("useDBContext must be used within a DBProvider")
  }

  return db
}