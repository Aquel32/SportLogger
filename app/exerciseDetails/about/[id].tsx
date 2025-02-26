import { useGlobalContext } from "@/context/GlobalProvider";
import { useLocalSearchParams } from "expo-router";
import { Text, View, Image, TouchableOpacity } from "react-native";
import ExerciseNavigation from "@/components/ExerciseNavigation";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import FormField from "@/components/FormField";

const ExerciseDetails = () => {
  const { id } = useLocalSearchParams();
  const {
    exercisesList,
    updateExercisesList,
    workoutsList,
    updateWorkoutList,
  } = useGlobalContext();
  const exercise = exercisesList[Number(id)];
  const [edit, setEdit] = useState(false);

  function deleteExercise() {
    //set to null in exerciseList
    //remove from all workouts
    //remove from all templates
  }

  function updateExercise(title: string, description: string) {
    const updatedExercise = {
      ...exercise,
      title: title,
      description: description,
    };

    const updatedExercisesList = [...exercisesList];
    updatedExercisesList[Number(id)] = updatedExercise;
    updateExercisesList(updatedExercisesList);
  }

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
      <View className="flex flex-row justify-between m-2">
        {edit ? (
          <Text className="text-4xl text-white">{exercise.title}</Text>
        ) : (
          <FormField
            title=""
            value={exercise.title}
            placeholder={exercise.title}
            handleChangeText={(e: string) =>
              updateExercise(e, exercise.description)
            }
            otherStyles="text-4xl text-white w-[70%]"
          />
        )}

        <View className="flex flex-row gap-2">
          <TouchableOpacity onPress={() => setEdit(!edit)} className="">
            <Ionicons name="create-outline" size={24} color={"white"} />
          </TouchableOpacity>

          <TouchableOpacity onPress={deleteExercise} className="">
            <Ionicons
              name="trash-outline"
              size={24}
              color={"white"}
              className=""
            />
          </TouchableOpacity>
        </View>
      </View>

      {edit ? (
        <Text className="text-xl text-white m-2">{exercise.description}</Text>
      ) : (
        <FormField
          title=""
          value={exercise.description}
          placeholder={exercise.description}
          handleChangeText={(e: string) => updateExercise(exercise.title, e)}
          otherStyles="text-4xl text-white w-[90%] m-2"
        />
      )}
    </View>
  );
};

export default ExerciseDetails;
