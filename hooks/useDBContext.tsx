import * as SQLite from 'expo-sqlite';
import { ReactNode, useEffect, useState } from "react";
import { Alarm, DBContext } from "../contexts/context";


import React from 'react';

interface DBProviderProps {
  children: ReactNode;
}

function DBContextProvider({children} : DBProviderProps) {
    const [alarms, setAlarms] = useState<Alarm[]>([])
    const [db, setDB] = useState<SQLite.SQLiteDatabase | null>(null)

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
        } catch (e) {
            console.error("Error when adding to database: ", e);
        }


    }

    const deleteAlarm = async (id: number) => {
        try{
            await db.runAsync('DELETE FROM alarms WHERE id = ?', id);
        } catch (e) {
            console.error("Error when deleting from database: ", e);
        }
    }

  return (
    <DBContext.Provider value={{alarms, addAlarm, fetchAlarms, deleteAlarm}}>
        {children}
    </DBContext.Provider>
  )
}

export default DBContextProvider