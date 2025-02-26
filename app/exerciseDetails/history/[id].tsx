import { useGlobalContext } from "@/context/GlobalProvider";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View, Image, FlatList, TouchableOpacity } from "react-native";
import ExerciseNavigation from "@/components/ExerciseNavigation";
import { WorkoutCard } from "@/app/(tabs)/history";
import { ActivityCard } from "@/components/ActivitiesList";
import { Activity } from "@/lib/types";

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
        source={
          exercise.imageUrl
            ? { uri: exercise.imageUrl }
            : require("../../../assets/images/noimage.png")
        }
        className="w-full h-40"
      />

      <Text className="text-4xl text-white m-2">{exercise.title}</Text>

      {/* {wystapienia w historii} */}

      <FlatList
        className="mb-5"
        data={workoutsList.filter((workout) =>
          workout.exercises.some(
            (activity) =>
              activity.exerciseIndex == exercisesList.indexOf(exercise)
          )
        )}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item }) => {
          let exerciseToShow: Activity = {
            exerciseIndex: -100,
            sets: [],
          };

          const founded = item.exercises.find(
            (activity) =>
              activity.exerciseIndex == exercisesList.indexOf(exercise)
          );

          if (founded !== undefined) {
            exerciseToShow = founded;
          }
          const date = new Date(item.date);

          return (
            <TouchableOpacity
              className="bg-slate-500 p-3 mb-2"
              onPress={() =>
                router.push({
                  pathname: `/trainingDetails/[id]`,
                  params: { id: workoutsList.indexOf(item) },
                })
              }
            >
              <Text className="text-white text-lg">
                {date.getDate() +
                  "." +
                  (date.getMonth() + 1) +
                  "." +
                  date.getFullYear()}
              </Text>
              <ActivityCard
                activity={exerciseToShow}
                index={exercisesList.indexOf(exercise)}
                removeExercise={() => {}}
                updateActivity={() => {}}
                edit={false}
              />
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={() => {
          return (
            <View>
              <Text className="text-gray-100 font-bold">
                NIE WYKONYWAŁEŚ TEGO ĆWICZENIA W PRZESZŁOŚCI
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ExerciseDetails;
