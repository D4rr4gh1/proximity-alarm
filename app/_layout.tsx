import AudioPlayerProvider from '@/hooks/useAlarmController';
import DBContextProvider from '@/hooks/useDBContext';
import { getDB } from '@/services/audioPlayerBridge';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { Stack } from "expo-router";
import * as TaskManager from 'expo-task-manager';
import { useEffect, useState } from "react";
export const GEOFENCE_TASK = 'geofence-task';
const triggeredRegions = new Set<string>();

TaskManager.defineTask(GEOFENCE_TASK, async ({ data , error }: TaskManager.TaskManagerTaskBody) => {
  if (error) {
    console.error('Geofence task error:', error);
    return;
  }

  const { eventType, region } = data as {
    eventType: Location.GeofencingEventType;
    region: Location.LocationRegion;
  };

  const db = getDB();
  const regionId = region.identifier ? region.identifier : ""; // Maybe add some error handling here

  if (eventType === Location.GeofencingEventType.Enter) {
      if (triggeredRegions.has(regionId)) {
      console.log(`Already inside region ${regionId}, skipping alarm trigger`);
      return;
    }

    console.log(`ENTER region: ${regionId}`);
    triggeredRegions.add(regionId);
    if(!region.identifier) return; 
    db?.setRingingAlarm(parseInt(region.identifier));
  } 
  
  else if (eventType === Location.GeofencingEventType.Exit) {
    console.log(`EXIT region: ${regionId}`);
    triggeredRegions.delete(regionId);
    db?.setRingingAlarm(null)
  }
});



export default function RootLayout() {
  const [foregroundStatus, setForegroundStatus] = useState<Location.LocationObject | null>(null);


  useEffect( () => {

    const startBackgroundTask = async () => {
        // Start by seeing if we have already set up background location stuff

        try {
          const alreadyStarted = await AsyncStorage.getItem('BACKGROUND_TRACKING_STARTED');
          if (alreadyStarted) {
            console.log('⏭️ Background location already set up.');
            return;
          }

        // Request foreground and background permissions
        const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
        if (foregroundStatus !== 'granted') return;

        const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
        if (backgroundStatus !== 'granted') return;
        
      } catch(err) {
        console.error('Failed to set up background tracking:', err);
      }

  };
  
  startBackgroundTask()

  }, []);
  return(
    <DBContextProvider>
      <AudioPlayerProvider>
        <Stack screenOptions={{ headerShown: false}}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="ringing" options={{ headerShown: false }}/>
        </Stack>
      </AudioPlayerProvider>
    </DBContextProvider>

  );
}
