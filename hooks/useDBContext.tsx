import { Alarm } from '@/types/shared';
import * as SQLite from 'expo-sqlite';
import React, { ReactNode, useEffect, useState } from 'react';
import { DBContext } from "../contexts/context";

interface DBProviderProps {
  children: ReactNode;
}

function DBContextProvider({children} : DBProviderProps) {
    const [alarms, setAlarms] = useState<Alarm[]>([])
    const [db, setDB] = useState<SQLite.SQLiteDatabase | null>(null)
    const [dbVersion, setDBVersion] = useState(0);


    useEffect(() => {
        const setupDB = async () => {
            try{
                const dbInstance = await SQLite.openDatabaseAsync('alarmsDatabase.db');
                await setupTables(dbInstance);
                setDB(dbInstance);
            } catch (e){
                console.error("Failed to init db: ", e)
            }
        };
        setupDB()
    }, []);

    const setupTables = async (db: SQLite.SQLiteDatabase) => {
        try{
            await db.execAsync(`CREATE TABLE IF NOT EXISTS alarms(
                        id INTEGER PRIMARY KEY NOT NULL,
                        label TEXT NOT NULL,
                        sound TEXT NOT NULL,
                        vibrate BOOL NOT NULL,
                        repeat BOOL NOT NULL,
                        coords TEXT NOT NULL,
                        radius INTEGER NOT NULL,
                        active BOOL NOT NULL);`);
        } catch (e) {
            console.error("Error creating table:", e);
        }
    }

    if (!db) return null;

    const fetchAlarms = async () => {
        const allAlarms = await db.getAllAsync<Alarm>('SELECT * FROM alarms');
        setAlarms(allAlarms);
    }

    const addAlarm = async (sound: string,
            label: string,
            vibrate: boolean,
            repeat: boolean,
            coords: string,
            radius: number) => {
        try{ 
            const result = await db.runAsync('INSERT INTO alarms (label, sound, vibrate, repeat, coords, radius, active) VALUES (?, ?, ?, ?, ?, ?, ?)', 
                label, sound, vibrate, repeat, coords, radius, true);
            console.log(result.lastInsertRowId, result.changes);
            setDBVersion(prev => prev + 1);
        } catch (e) {
            console.error("Error when adding to database: ", e);
        }


    }

    const deleteAlarm = async (id: number) => {
        try{
            await db.runAsync('DELETE FROM alarms WHERE id = ?', id);
            setDBVersion(prev => prev + 1);
        } catch (e) {
            console.error("Error when deleting from database: ", e);
        }
    }

    const turnAlarmOff = async (id: number, flip: boolean) => {
        try{
            await db.runAsync('UPDATE alarms SET active = ? WHERE id = ?', flip, id)
            setDBVersion(prev => prev + 1);
        } catch (e) {
            console.error("Error when turning alarm On/Off: ", e);
        }
    }

    const getAlarm = async (id: number) => {
        try{
            const result = await db.getFirstAsync(`SELECT * FROM alarms WHERE id = ?`, id)

            if(result && typeof result === 'object'){
                try{                 
                    const alarm = result as Alarm;
                    return alarm
                }catch (e){
                    console.error('Invalid JSON format');
                }
            }
        } catch (e) {
            console.error("Error when fetching alarm: ", e);
        }
    }

  return (
    <DBContext.Provider value={{alarms, addAlarm, fetchAlarms, deleteAlarm, turnAlarmOff, dbVersion, getAlarm}}>
        {children}
    </DBContext.Provider>
  )
}

export default DBContextProvider