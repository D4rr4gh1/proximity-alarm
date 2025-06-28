import React, { SetStateAction, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


interface OptionsModalProps{
    setModalVisible: React.Dispatch<SetStateAction<boolean>>;
    modalVisible: boolean
    setOption: React.Dispatch<SetStateAction<string>>;
    placeholder: string
    inputType: string
}


const OptionsModal = ({setModalVisible, modalVisible, setOption, placeholder, inputType} : OptionsModalProps) => {
  const [tempLabel, setTempLabel] = useState('')
  return (
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
                placeholder={placeholder}/>
            <TouchableOpacity
                style={styles.saveButton}
                onPress={() => { setModalVisible(!modalVisible); setOption(tempLabel) }}>
                <Text style={styles.saveButtonText}>Hide Modal</Text>
            </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    </Modal>
  )
}

const styles = StyleSheet.create({
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
})

export default OptionsModal