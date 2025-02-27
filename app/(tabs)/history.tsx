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

export const WorkoutCard = ({ workout }: { workout: Workout }) => {
  const {
    exercisesList,
    updateExercisesList,
    workoutsList,
    updateWorkoutList,
  } = useGlobalContext();

  const date = new Date(workout.date);

  return (
    <TouchableOpacity
      className="w-[300px] h-[100px] bg-gray-100 rounded-2xl mb-5 p-2 overflow-hidden items-center"
      onPress={() =>
        router.push({
          pathname: `/trainingDetails/[id]`,
          params: { id: workoutsList.indexOf(workout) },
        })
      }
    >
      <View className="w-[90%] flex-row justify-between">
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

      <View className="w-[90%]">
        {workout.exercises.map((activity, index) => {
          if (index > 2) return;
          return (
            <View className="flex-row gap-5" key={index}>
              <Text className="text-black ">
                {exercisesList[activity.exerciseIndex].title}
              </Text>
            </View>
          );
        })}
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
    <SafeAreaView className="bg-background h-full py-10 items-center">
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
      />
    </SafeAreaView>
  );
}
