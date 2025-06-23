import { Stack } from "expo-router";

export default function CreateAlarmLayout() {
  return(
    <Stack>
      <Stack.Screen name="location" options={{ headerShown: false }} />
      <Stack.Screen name="proximity" options={{ headerShown: false }} />
      <Stack.Screen name="options" options={{ headerShown: false }} />
    </Stack>

  );
}