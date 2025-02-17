import { View, Text, SafeAreaView, GestureResponderEvent } from "react-native";
import React, { useState } from "react";
import { Exercise } from "@/lib/types";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";

export default function CreateExercise() {
  const {
    exercisesList,
    updateExercisesList,
    workoutsList,
    updateWorkoutList,
  } = useGlobalContext();

  const [exercise, setExercise] = useState<Exercise>({
    title: "",
    description: "",
    imageUrl: "",
  });

  function submitForm() {
    //check if form is empty
    updateExercisesList([...exercisesList, exercise]);
    router.back();
  }

  return (
    <SafeAreaView className="bg-primary h-full py-10 items-center gap-5">
      <Text className="text-slate-500 font-bold">NOWE ĆWICZENIE</Text>

      <FormField
        title={"Nazwa ćwiczenia"}
        value={exercise.title}
        placeholder={"Wpisz tutaj nazwę ćwiczenia"}
        handleChangeText={(e) => setExercise({ ...exercise, title: e })}
        otherStyles={""}
      />

      <FormField
        title={"Opis ćwiczenia"}
        value={exercise.description}
        placeholder={"Wpisz tutaj opis ćwiczenia"}
        handleChangeText={(e) => setExercise({ ...exercise, description: e })}
        otherStyles={""}
      />

      <FormField
        title={"URL Zdjęcia"}
        value={exercise.imageUrl}
        placeholder={"Wpisz tutaj URL do zdjęcia"}
        handleChangeText={(e) => setExercise({ ...exercise, imageUrl: e })}
        otherStyles={""}
      />

      {/*KATEGORIA*/}

      <CustomButton
        title={"Dodaj ćwiczenie"}
        handlePress={submitForm}
        containerStyles={"bg-slate-400 px-5"}
        textStyles={""}
        isLoading={false}
      />
    </SafeAreaView>
  );
}
