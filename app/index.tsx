import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AlarmItem from '@/components/AlarmItem';

import { useDBContext } from '@/contexts/context';
import { router } from 'expo-router';
import { useEffect } from 'react';


export default function HomeScreen() {
  const db = useDBContext();

  useEffect(() => {
    db.fetchAlarms();
    db.alarms.forEach(alarm => {
      console.log(alarm.coords, alarm.label, alarm.sound);
    });
  }, [])

  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => router.push('/location')}>
                <Text style={styles.buttonText}>+ New Alarm</Text>
            </TouchableOpacity>
            <ScrollView>
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
});
