import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Exercise, Workout } from "@/lib/types";
import { router } from "expo-router";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const WorkoutCard = ({ workout }: { workout: Workout }) => {
  const {
    exercisesList,
    updateExercisesList,
    workoutsList,
    updateWorkoutList,
  } = useGlobalContext();

  function deleteExercise(index: number) {
    var array = [...workoutsList]; // make a separate copy of the array
    if (index !== -1) {
      array.splice(index, 1);
      updateWorkoutList(array);
    }
  }

  const date = new Date(workout.date);

  return (
    <TouchableOpacity
      className="w-48 h-[145px] bg-gray-100 rounded-2xl mb-5 overflow-hidden items-center"
      onPress={() => deleteExercise(workoutsList.indexOf(workout))}
      //onPress={() => print()}
    >
      <View className="w-[90%]">
        <Text className="text-2xl text-black font-bold">
          {date.getDate() +
            "." +
            (date.getMonth() + 1) +
            "." +
            date.getFullYear()}
        </Text>

        <FlatList
          className="flex flex-row flex-wrap gap-2"
          data={workout.categories}
          renderItem={(element) => (
            <Text className="bg-red-100 rounded-xl p-1">{element.item}</Text>
          )}
        />
      </View>
    </TouchableOpacity>
  );
};

export default function HistoryScreen() {
  const {
    exercisesList,
    updateExercisesList,
    workoutsList,
    updateWorkoutList,
  } = useGlobalContext();

  return (
    <SafeAreaView className="bg-primary h-full py-10 items-center">
      <FlatList
        className="mb-5"
        data={workoutsList}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item }) => <WorkoutCard workout={item} />}
        ListEmptyComponent={() => {
          return (
            <View>
              <Text className="text-gray-100 font-bold">
                TWOJA HISTORIA JEST PUSTA
              </Text>
            </View>
          );
        }}
        numColumns={2}
        columnWrapperClassName="gap-5"
      />
    </SafeAreaView>
  );
}
