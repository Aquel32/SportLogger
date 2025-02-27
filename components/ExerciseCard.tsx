import { Exercise } from "@/lib/types";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export const ExerciseCard = ({
  exercise,
  index,
  onPress,
}: {
  exercise: Exercise;
  index: number;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      className="w-48 h-[125px] bg-gray-100 rounded-2xl mb-5 overflow-hidden items-center relative"
      onPress={onPress}
    >
      <Image
        className="w-full h-28"
        source={
          exercise.imageUrl
            ? { uri: exercise.imageUrl }
            : require("../assets/images/noimage.png")
        }
      />

      <View className="w-[90%]">
        <Text className="text-2xl text-black font-bold">{exercise.title}</Text>

      </View>

      <Text className="text-s text-black absolute top-[5px] right-[5px] bg-red-100 rounded-xl p-1">
        {exercise.category}
      </Text>
    </TouchableOpacity>
  );
};
