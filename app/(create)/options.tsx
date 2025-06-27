import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

function OptionsScreen() {
  const [vibrate, setVibrate] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [label, setLabel] = useState('Home Arrival');
  const [alarmSound, setAlarmSound] = useState('Default');
  const [modalVisible, setModalVisible] = useState(false);
  const [tempLabel, setTempLabel] = useState('')

  const handleSave = async () => {
    var coords;
    var radius;
    try {
        const storedCoords = await AsyncStorage.getItem('COORDS');
        const storedRadius = await AsyncStorage.getItem('RADIUS');
        if (storedCoords && storedRadius) {
          coords = JSON.parse(storedCoords);
          radius = parseInt(storedRadius)

          console.log('Loaded pin location:', coords);
        }
      } catch (e) {
        console.error('Failed to load coords or radius:', e);
      } finally {
        // GO ABOUT STORING ALL THE VALUES FROM HERE
        // setReady(true);
      }
    }

  const handleAlarmSoundPress = () => {
    setModalVisible(!modalVisible)
  }

  const handleLabelPress = () => {

  }


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.header}>Set Alarm Options</Text>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.centeredView}>
              <View style={styles.modalView}>
                <TextInput
                  style={styles.inputBox}
                  onEndEditing={(e) => {setTempLabel(e.nativeEvent.text)}}
                  placeholder={alarmSound}/>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => { setModalVisible(!modalVisible); setAlarmSound(tempLabel) }}>
                  <Text style={styles.saveButtonText}>Hide Modal</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </Modal>

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

export default OptionsScreen 