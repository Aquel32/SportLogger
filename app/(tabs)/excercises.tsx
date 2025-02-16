import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Exercise } from "@/lib/types";
import { router } from "expo-router";
import {
  FlatList,
  GestureResponderEvent,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ExerciseCard = ({ exercise }: { exercise: Exercise }) => {
  const { exercisesList, setExercisesList, workoutsList, setWorkoutsList } =
    useGlobalContext();

  function deleteExercise(event: GestureResponderEvent) {
    var array = [...exercisesList]; // make a separate copy of the array
    var index = array.indexOf(exercise);
    if (index !== -1) {
      array.splice(index, 1);
      setExercisesList(array);
    }
  }

  return (
    <View className="w-full flex-row justify-evenly items-center bg-gray-300 p-2 rounded-2xl">
      <Text>{exercise.title}</Text>
      <TouchableOpacity
        className="w-10 h-10 bg-secondary justify-center items-center"
        onPress={deleteExercise}
      >
        <Text className="text-white">U</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function ExercisesScreen() {
  const { exercisesList, setExercisesList, workoutsList, setWorkoutsList } =
    useGlobalContext();

  return (
    <SafeAreaView className="bg-primary h-full py-10 items-center">
      <FlatList
        data={exercisesList}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item }) => <ExerciseCard exercise={item} />}
        ListEmptyComponent={() => {
          return (
            <View>
              <Text className="text-gray-100 font-bold">
                LISTA ĆWICZEŃ JEST PUSTA
              </Text>
            </View>
          );
        }}
      />
      <CustomButton
        title={"DODAJ NIESTANDARDOWE ĆWICZENIE"}
        handlePress={() => router.push("/createExercise")}
        containerStyles={"w-[80%] bg-slate-400"}
        textStyles={""}
        isLoading={false}
      ></CustomButton>
    </SafeAreaView>
  );
}
