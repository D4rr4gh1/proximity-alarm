import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { Stack } from "expo-router";
import { useEffect } from "react";
const LOCATION_TASK_NAME = 'background-location-task';

// TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
//   if (error) {
//     console.error('Location task error:', error);
//     return;
//   }

//   if (data) {
//     const locations = data;
//     console.log('📍 Background location update:', locations);
//   }
// });

export default function RootLayout() {

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
      

      // // Check if the background task is already running, if not, start it up
      // const isRunning = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
      // if (!isRunning) {
      //     await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      //       accuracy: Location.Accuracy.High,
      //       timeInterval: 10000,
      //       distanceInterval: 10,
      //       showsBackgroundLocationIndicator: true,
      //       pausesUpdatesAutomatically: false,
      //     });
        
      //   // Update the storage so that we can know it is running
      //   await AsyncStorage.setItem('BACKGROUND_TRACKING_STARTED', 'true');
      //   console.log('✅ Background tracking started for the first time.');
      //}
    } catch(err) {
      console.error('Failed to set up background tracking:', err);
    }
  };
  
  startBackgroundTask()

  }, []);
  return(
    <Stack screenOptions={{ headerShown: true}}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>

  );
}
