import { useGlobalContext } from "@/context/GlobalProvider";
import { useLocalSearchParams } from "expo-router";
import { Text, View, Image } from "react-native";
import ExerciseNavigation from "@/components/ExerciseNavigation";

const ExerciseDetails = () => {
  const { id } = useLocalSearchParams();
  const {
    exercisesList,
    updateExercisesList,
    workoutsList,
    updateWorkoutList,
  } = useGlobalContext();
  const exercise = exercisesList[Number(id)];
  return (
    <View className="bg-[#18122B] h-full">
      <ExerciseNavigation index={Number(id)}></ExerciseNavigation>
      <Image
        source={{ uri: exercise.imageUrl }}
        className="w-full h-40"
      ></Image>
      <Text className="text-xl m-2">{exercise.description}</Text>
    </View>
  );
};

export default ExerciseDetails;
