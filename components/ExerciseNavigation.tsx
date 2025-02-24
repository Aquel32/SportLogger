import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function ExerciseNavigation({ index }: { index: number }) {
  return (
    <View className="flex flex-row w-full justify-around bg-gray-900 py-4">
      <TouchableOpacity
        onPress={() =>
          router.replace({
            pathname: `/exerciseDetails/about/[id]`,
            params: { id: index },
          })
        }
        className="text-white text-lg font-semibold"
      >
        <Text>ABOUT</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          router.replace({
            pathname: `/exerciseDetails/history/[id]`,
            params: { id: index },
          })
        }
        className="text-white text-lg font-semibold"
      >
        <Text>HISTORY</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          router.replace({
            pathname: `/exerciseDetails/charts/[id]`,
            params: { id: index },
          })
        }
        className="text-white text-lg font-semibold"
      >
        <Text>CHARTS</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          router.replace({
            pathname: `/exerciseDetails/records/[id]`,
            params: { id: index },
          })
        }
        className="text-white text-lg font-semibold"
      >
        <Text>RECORDS</Text>
      </TouchableOpacity>
    </View>
  );
}
