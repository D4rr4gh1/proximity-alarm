import OptionsModal from '@/components/OptionsModal';
import { useDBContext } from '@/contexts/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

function OptionsScreen() {
  const [vibrate, setVibrate] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [label, setLabel] = useState('Home Arrival');
  const [alarmSound, setAlarmSound] = useState('Classic');
  const [alarmModalVisible, setAlarmModalVisible] = useState(false);
  const [labelModalVisible, setLabelModalVisible] = useState(false);
  const db = useDBContext();


 const handleSave = async () => {
    try {
        const storedCoords = await AsyncStorage.getItem('COORDS');
        const storedRadius = await AsyncStorage.getItem('RADIUS');
        if (storedCoords && storedRadius) {
          const radius = parseInt(storedRadius);

          if(isNaN(radius)){
            console.warn("Invalid Radius: ", storedRadius);
            return;
          }

          db.addAlarm(alarmSound, label, vibrate, repeat, storedCoords, radius);
          await AsyncStorage.removeItem('COORDS')
          await AsyncStorage.removeItem('RADIUS')
          router.push('/')
        }
        else {
          console.warn('Failed to load coords or radius.');
        }
    } catch (e) {
        console.error('Failed to load coords or radius:', e);
      }
  } 

  const handleAlarmSoundPress = () => {
    setLabelModalVisible(false);
    setAlarmModalVisible(!alarmModalVisible);
  }

  const handleLabelPress = () => {
    setAlarmModalVisible(false);
    setLabelModalVisible(!labelModalVisible);
  }


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.header}>Set Alarm Options</Text>
        
          <OptionsModal
            setModalVisible={setAlarmModalVisible}
            modalVisible={alarmModalVisible}
            setOption={setAlarmSound}
            placeholder={alarmSound}
            inputType='Select'
          />

          <OptionsModal
            setModalVisible={setLabelModalVisible}
            modalVisible={labelModalVisible}
            setOption={setLabel}
            placeholder={label}
            inputType='Select'
          />
          
          

        {/* Alarm Sound */}
        <TouchableOpacity style={styles.optionRow} onPress={handleAlarmSoundPress}>
          <Text style={styles.optionLabel}>Alarm Sound</Text>
          <View style={styles.rowRight}>
            <Text style={styles.optionValue}>{alarmSound}</Text>
            <Text style={styles.chevron}>›</Text>
          </View>
        </TouchableOpacity>

        {/* Vibrate */}
        <View style={styles.optionRow}>
          <Text style={styles.optionLabel}>Vibrate</Text>
          <Switch
            value={vibrate}
            onValueChange={setVibrate}
            trackColor={{ false: '#ccc', true: '#007AFF' }}
            thumbColor="#ffffff"
          />
        </View>

        {/* Repeat Alarm */}
        <View style={styles.optionRow}>
          <Text style={styles.optionLabel}>Repeat Alarm</Text>
          <Switch
            value={repeat}
            onValueChange={setRepeat}
            trackColor={{ false: '#ccc', true: '#007AFF' }}
            thumbColor="#ffffff"
          />
        </View>

        {/* Label */}
        <TouchableOpacity style={styles.optionRow} onPress={handleLabelPress}>
          <Text style={styles.optionLabel}>Label</Text>
          <View style={styles.rowRight}>
            <Text style={styles.optionValue}>{label}</Text>
            <Text style={styles.chevron}>›</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
    </SafeAreaProvider>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollArea: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  optionLabel: {
    fontSize: 16,
    color: '#000',
  },
  optionValue: {
    fontSize: 16,
    color: '#888',
    marginRight: 6,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chevron: {
    fontSize: 18,
    color: '#888',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 16,
    margin: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxWidth: 'auto',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'rgba(0,0,0, 0.2)',
    borderRadius: 16,
    fontSize: 16
  },
});

export default OptionsScreen;