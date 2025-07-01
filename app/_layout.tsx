import AudioPlayerProvider from '@/hooks/useAlarmController';
import useAudioSetup from '@/hooks/useAudioSetup';
import DBContextProvider from '@/hooks/useDBContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Text } from 'react-native';
const GEOFENCE_TASK = 'geofence-task';

// TaskManager.defineTask(GEOFENCE_TASK, async ({ data , error }: TaskManager.TaskManagerTaskBody) => {
//   if (error) {
//     console.error('Geofence task error:', error);
//     return;
//   }

//   const { eventType, region } = data as {
//     eventType: Location.GeofencingEventType;
//     region: Location.LocationRegion;
//   };

//   if (eventType === Location.GeofencingEventType.Enter) {
//     console.log('Entered region:', region.identifier);
//     // Trigger alarm or notification here
//   } else if (eventType === Location.GeofencingEventType.Exit) {
//     console.log('Exited region:', region.identifier);
//   }
// });



export default function RootLayout() {
  const [foregroundStatus, setForegroundStatus] = useState<Location.LocationObject | null>(null);
  const { isConfigured, error } = useAudioSetup()


  if(error) return <Text>Error: {error.message}</Text>

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

        // const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
        // if (backgroundStatus !== 'granted') return;
        
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
