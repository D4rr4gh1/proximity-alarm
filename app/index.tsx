import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AlarmItem from '@/components/AlarmItem';

import { useDBContext } from '@/contexts/context';
import { useLocation } from '@/hooks/useLocation';
import { router } from 'expo-router';
import { useEffect } from 'react';


export default function HomeScreen() {
  const { location, errorMsg } = useLocation();
  const db = useDBContext();

  useEffect(() => {
    db.fetchAlarms();
  }, [db.dbVersion])

  if (errorMsg) return <Text>Error: {errorMsg}</Text>;
  if (!location) return <Text>Loading...</Text>;
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
                <AlarmItem key={alarm.id} alarm={alarm} location={location}/>
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
