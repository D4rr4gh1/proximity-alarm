import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AlarmItem from '@/components/AlarmItem';
import Button from '@/components/Button';

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
            <Button url="/(create)/location"/>
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
});
