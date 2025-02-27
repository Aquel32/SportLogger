import { useGlobalContext } from "@/context/GlobalProvider";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View, Image, TouchableOpacity } from "react-native";
import ExerciseNavigation from "@/components/ExerciseNavigation";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import FormField from "@/components/FormField";
import { Category, Exercise } from "@/lib/types";

const ExerciseDetails = () => {
  const { id } = useLocalSearchParams();
  const {
    exercisesList,
    updateExercisesList,
    workoutsList,
    updateWorkoutList,
    templateList,
    updateTemplateList,
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

  const [edit, setEdit] = useState(false);

  function deleteExercise() {
    router.replace("/excercises");

    //remove from all templates
    const updatedTemplateList = [...templateList];

    updatedTemplateList.filter((workout) =>
      workout.exercises.some((activity, index) => {
        if (activity.exerciseIndex == exercise.id) {
          workout.exercises.splice(index, 1);
        }
      })
    );

    updateTemplateList(updatedTemplateList);

    //remove from all workouts
    const updatedWorkoutList = [...workoutsList];

    //remove category if there are no more exercise from this category
    let anotherFromThisCategory = false;
    updatedWorkoutList.forEach((workout) =>
      workout.exercises.forEach((activity, index) => {
        if (activity.exerciseIndex != exercise.id) {
          exercisesList.forEach((founded) => {
            if (founded.id === activity.exerciseIndex) {
              if (founded.category === exercise.category) {
                anotherFromThisCategory = true;
                console.log(founded.title);
              }
            }
          });
        }
      })
    );

    updatedWorkoutList.forEach((workout) =>
      workout.exercises.forEach((activity, index) => {
        if (activity.exerciseIndex == exercise.id) {
          workout.exercises.splice(index, 1);

          if (anotherFromThisCategory === false) {
            workout.categories = workout.categories.filter(
              (category) => category !== exercise.category
            );
          }
        }
      })
    );

    updateWorkoutList(updatedWorkoutList);

    //remove from exerciseList
    const updatedExerciseList = [...exercisesList];

    for (let i = 0; i < updatedExerciseList.length; i++) {
      if (updatedExerciseList[i].id === exercise.id) {
        updatedExerciseList.splice(i, 1);
        break;
      }
    }

    updateExercisesList(updatedExerciseList);
  }

  function updateExercise(title: string, description: string) {
    const updatedExercise = {
      ...exercise,
      title: title,
      description: description,
    };

    const updatedExercisesList = [...exercisesList];
    updatedExercisesList.find((exercise) => {
      if (exercise.id === Number(id)) {
        exercise = updatedExercise;
      }
    });
    updateExercisesList(updatedExercisesList);
  }

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
      <View className="flex flex-row justify-between m-2">
        {edit === false ? (
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

      {edit === false ? (
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
