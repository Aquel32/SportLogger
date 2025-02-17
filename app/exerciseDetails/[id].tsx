import { useGlobalContext } from "@/context/GlobalProvider";
import { useLocalSearchParams } from "expo-router";
import { Text, View, Image } from "react-native";


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
    <View>
        <Image source={{uri: exercise.imageUrl}} className="w-full h-40"></Image>
        <Text className="text-4xl m-2">{exercise.title}</Text>
        <Text className="text-xl m-2">{exercise.description}</Text>
    </View>
  );
};

export default ExerciseDetails;
