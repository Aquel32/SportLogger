import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Exercise } from "@/lib/types";
import { router } from "expo-router";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ExerciseCard = ({ exercise }: { exercise: Exercise }) => {
  return (
    <TouchableOpacity className="w-48 h-[145px] bg-gray-100 rounded-2xl mb-5 overflow-hidden items-center">
      <Image
        className="w-full h-28"
        source={
          exercise.imageUrl
            ? { uri: exercise.imageUrl }
            : require("../../assets/images/noimage.png")
        }
      />

      <View className="w-[90%]">
        <Text className="text-2xl text-black font-bold">{exercise.title}</Text>
        <Text className="text-xs text-black font-bold" numberOfLines={1}>
          {exercise.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function ExercisesScreen() {
  const {
    exercisesList,
    updateExercisesList,
    workoutsList,
    updateWorkoutList,
  } = useGlobalContext();

  // function deleteExercise(index: number) {
  //   var array = [...exercisesList]; // make a separate copy of the array
  //   if (index !== -1) {
  //     array.splice(index, 1);
  //     setExercisesList(array);
  //   }
  // }

  return (
    <SafeAreaView className="bg-primary h-full py-10 items-center">
      <FlatList
        className="mb-5"
        data={exercisesList}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item, index }) => <ExerciseCard exercise={item} />}
        ListEmptyComponent={() => {
          return (
            <View>
              <Text className="text-gray-100 font-bold">
                LISTA ĆWICZEŃ JEST PUSTA
              </Text>
            </View>
          );
        }}
        numColumns={2}
        columnWrapperClassName="gap-5"
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
