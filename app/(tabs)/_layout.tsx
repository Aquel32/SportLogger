import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerRight: () => (
          <Link href="/settings">
            <Ionicons name="settings" size={24} color={"white"} />
          </Link>
        ),
        headerRightContainerStyle: { right: 20 },
        headerTintColor: "white",
        tabBarStyle: {
          backgroundColor: "#1A1C31",
          borderColor: "#1A1C31",
          height: 55,
        },
        headerStyle: { backgroundColor: "#1A1C31" },
        tabBarActiveTintColor: "#EDF2F4",
      }}
    >
      <Tabs.Screen
        name="history"
        options={{
          title: "Historia",
          tabBarIcon: ({ color }) => (
            <AntDesign name="copy1" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Nowy Trening",
          tabBarIcon: ({ color }) => (
            <AntDesign name="pluscircleo" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="excercises"
        options={{
          title: "Ćwiczenia",
          tabBarIcon: ({ color }) => (
            <Ionicons name="barbell-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
