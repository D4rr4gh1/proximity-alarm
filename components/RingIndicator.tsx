import { useDBContext } from '@/contexts/context';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type RingProps = {
  active: boolean;
  id: number;
};

const RingIndicator = ({ active, id}: RingProps) => {
  const db = useDBContext()
  const [ringColor, setRingColor] = useState('#B0B0B0')

  useEffect(() => {
    active ? setRingColor('#4CAF50') : setRingColor('#B0B0B0')
  })

  const handlePress = () => {
    db.turnAlarmOff(id, !active);
  }


  return (
    <TouchableOpacity 
        style={[styles.outerCircle, { borderColor: ringColor, backgroundColor: ringColor }]}
        onPress={handlePress}>
      <View style={[styles.innerCircle, { backgroundColor: 'white' }]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outerCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  innerCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});

export default RingIndicator;