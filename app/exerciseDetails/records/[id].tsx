import { useGlobalContext } from "@/context/GlobalProvider";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View, Image, TouchableOpacity } from "react-native";
import ExerciseNavigation from "@/components/ExerciseNavigation";
import { Category, Exercise } from "@/lib/types";

const ExerciseDetails = () => {
  const { id } = useLocalSearchParams();
  const {
    exercisesList,
    updateExercisesList,
    workoutsList,
    updateWorkoutList,
  } = useGlobalContext();

  let exercise: Exercise = {
    id: -1,
    title: "",
    description: "",
    imageUrl: "",
    category: Category.Brak,
  };

  exercisesList.find((founded) => {
    if (founded.id === Number(id)) {
      exercise = founded;
    }
  });

  let max = -1;
  let date = new Date();
  workoutsList.filter((workout) =>
    workout.exercises.some((activity) => {
      if (activity.exerciseIndex == exercisesList.indexOf(exercise)) {
        activity.sets.forEach((set) => {
          if (Number(set.weight) > max) {
            max = Number(set.weight);
            date = new Date(workout.date);
          }
        });
      }
    })
  );

  return (
    <View className="bg-background h-full ">
      <ExerciseNavigation index={Number(id)}></ExerciseNavigation>
      <Image
        source={
          exercise.imageUrl
            ? { uri: exercise.imageUrl }
            : require("../../../assets/images/noimage.png")
        }
        className="w-full h-40"
      />

      <Text className="text-4xl text-white m-2">{exercise.title}</Text>

      {max !== -1 ? (
        <TouchableOpacity
          className="bg-[#4B5563] rounded-lg m-2"
          onPress={() =>
            router.push({
              pathname: `/trainingDetails/[id]`,
              params: { id: Number(id) },
            })
          }
        >
          <Text className="text-xl text-white m-2">
            Rekordowy ciężar: {max}
          </Text>
          <Text className="text-xl text-white m-2">
            Pobity dnia:{" "}
            {date.getDate() +
              "." +
              (date.getMonth() + 1) +
              "." +
              date.getFullYear()}
          </Text>
        </TouchableOpacity>
      ) : (
        <Text className="text-xl text-white m-2">Brak rekordów w historii</Text>
      )}
    </View>
  );
};

export default ExerciseDetails;
