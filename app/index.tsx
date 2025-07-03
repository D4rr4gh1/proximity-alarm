import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AlarmItem from '@/components/AlarmItem';

import { useSharedAudioPlayer } from '@/contexts/alarmContext';
import { useDBContext } from '@/contexts/context';
import { useLocation } from '@/hooks/useLocation';
import { Alarm } from '@/types/shared';
import * as Location from 'expo-location';
import { LocationRegion } from 'expo-location';
import { router } from 'expo-router';
import * as TaskManager from 'expo-task-manager';
import { useEffect, useState } from 'react';
import { GEOFENCE_TASK } from './_layout';


export default function HomeScreen() {
  const { location, errorMsg } = useLocation();
  const [regionArray, setRegionArray] = useState<LocationRegion[]>([])
  const db = useDBContext();
  const [distance, setDistance] = useState(0);
  const {startAlarm, stopAlarm} = useSharedAudioPlayer();
  

  // Enable below for notification perms

  // const notificationPermissions = async () => {
  //   await notifee.requestPermission();
  // }

  // useEffect(() => {
  //   notificationPermissions();
  // }, [])


  useEffect(() => {
    db.fetchAlarms();
  }, [])

  useEffect(() => {

    const alarmToRegionMap: LocationRegion[] = db.alarms.map((alarm: Alarm): LocationRegion => {

      const coords = JSON.parse(alarm.coords);

      return {
        identifier: alarm.id.toString(),
        latitude: coords['lat'],
        longitude: coords['long'],
        radius: alarm.radius,
      }
    })

    const setupGeofencing = async () => {
      if (!regionArray || regionArray.length === 0) return;

      const isRegistered = await TaskManager.isTaskRegisteredAsync(GEOFENCE_TASK);
      if (isRegistered) {
        await Location.stopGeofencingAsync(GEOFENCE_TASK);
      }
      await Location.startGeofencingAsync(GEOFENCE_TASK, alarmToRegionMap);
    };

    setupGeofencing();
  }, [db.alarms]);


  useEffect(() => {
    if(db.newAlarmRinging){
      startAlarm(db.newAlarmRinging);
      db.setRingingAlarm(null);
      router.push('/ringing');
      return;
    }

    stopAlarm();
  }, [db.newAlarmRinging])


  console.log("LOADED HOME")

  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => router.push('/location')}>
                <Text style={styles.buttonText}>+ New Alarm</Text>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={{alignItems: 'center'}} style={styles.itemsContainer}>
              {db.alarms.map((alarm) => (
                <AlarmItem key={alarm.id} alarm={alarm}/>
              ))}
            </ScrollView>
        </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f7faff",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 42,
    padding: 12,
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: '#3277D6',
    borderRadius: 15,
    marginHorizontal: 10,
    marginTop: 30,
    marginBottom: 10,
    padding: 20,
    width: '90%'
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  itemsContainer: {
    width: '100%'
  }
});
