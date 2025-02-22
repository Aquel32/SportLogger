import CustomButton from "@/components/CustomButton";
import { ExerciseCard } from "@/components/ExerciseCard";
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
        renderItem={({ item, index }) => (
          <ExerciseCard
            exercise={item}
            index={index}
            onPress={() =>
              router.push({
                pathname: `/exerciseDetails/[id]`,
                params: {
                  id: index,
                  description: item.description,
                  image: item.imageUrl,
                  name: item.title,
                },
              })
            }
          />
        )}
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
