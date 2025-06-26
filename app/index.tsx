import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AlarmItem from '@/components/AlarmItem';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function HomeScreen() {

  const getSavedLoc = async () => {
     const raw = await AsyncStorage.getItem('COORDS');
     console.log(raw ? JSON.parse(raw) : "null")
  }

  useEffect(() => {
    getSavedLoc();
  })

  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
            <Pressable
              style={styles.buttonContainer}
              onPress={() => router.push('/location')}>
                <Text style={styles.buttonText}>+ New Alarm</Text>
            </Pressable>
            <ScrollView>
                <AlarmItem/>
                <AlarmItem/>
                <AlarmItem/>
                <AlarmItem/>
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
