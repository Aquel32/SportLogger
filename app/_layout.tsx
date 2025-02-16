import GlobalProvider from "@/context/GlobalProvider";
import "../global.css";

import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <GlobalProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#1A1C31" },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="settings"
          options={{
            title: "Ustawienia",
          }}
        />
        <Stack.Screen
          name="createExercise"
          options={{
            title: "DODAJ ĆWICZENIE",
          }}
        />
      </Stack>
    </GlobalProvider>
  );
}
