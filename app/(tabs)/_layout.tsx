
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, Tabs } from 'expo-router';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerRight: () => <Link href="/settings"><Ionicons name="settings" size={24} /></Link>,
        headerRightContainerStyle: {right: 20},
      }}>
      <Tabs.Screen
        name="history"
        options={{
          title: 'Historia',
          tabBarIcon: ({ color }) => <AntDesign name="copy1" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trening',
          tabBarIcon: ({ color }) => <AntDesign name="pluscircleo" size={28} color={color} />,
        }
      }
      />
      <Tabs.Screen
        name="excercises"
        options={{
          title: 'Ćwiczenia',
          tabBarIcon: ({ color }) => <Ionicons name="barbell-outline" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}