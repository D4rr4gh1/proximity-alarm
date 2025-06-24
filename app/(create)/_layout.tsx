import { Stack } from "expo-router";

export default function CreateAlarmLayout() {
  return(
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="location"/>
      <Stack.Screen name="proximity"/>
      <Stack.Screen name="options"/>
    </Stack>

  );
}