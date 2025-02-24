import { useGlobalContext } from "@/context/GlobalProvider";
import { useLocalSearchParams } from "expo-router";
import { Text, View, Image, TouchableOpacity } from "react-native";
import ExerciseNavigation from "@/components/ExerciseNavigation";
import Ionicons from "@expo/vector-icons/Ionicons";

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
    <View className="bg-[#18122B] h-full ">
      <ExerciseNavigation index={Number(id)}></ExerciseNavigation>
      <Image
        source={{ uri: exercise.imageUrl }}
        className="w-full h-40"
      ></Image>
      <View className="relative">
        <Ionicons
          name="create-outline"
          size={24}
          color={"white"}
          className="absolute right-12 top-2"
        ></Ionicons>
        {/*after clicking this trash-outline*/}
        <Ionicons
          name="trash-outline"
          size={24}
          color={"white"}
          className="absolute right-3 top-2"
        ></Ionicons>

        <Text className="text-4xl text-white m-2">{exercise.title}</Text>
        <Text className="text-xl text-white m-2">{exercise.description}</Text>
      </View>
    </View>
  );
};

export default ExerciseDetails;
