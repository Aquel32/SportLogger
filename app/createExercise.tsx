import { View, Text, SafeAreaView, GestureResponderEvent } from "react-native";
import React, { useState } from "react";
import { Category, Exercise } from "@/lib/types";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";
import { SelectList } from "react-native-dropdown-select-list";

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
    category: Category.Brak,
  });

  function submitForm() {
    //check if form is empty
    updateExercisesList([...exercisesList, exercise]);
    router.back();
  }

  const selectListData: Array<{ key: string; value: string }> = [];
  Object.values(Category).forEach((name) => {
    if (name !== "") {
      selectListData.push({ key: String(name), value: String(name) });
    }
  });

  return (
    <SafeAreaView className="bg-background h-full py-10 items-center gap-5">
      <Text className="text-slate-500 font-bold">NOWE ĆWICZENIE</Text>

      <View className="w-[70%] gap-5">
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

        <SelectList
          setSelected={(e: string) =>
            setExercise({ ...exercise, category: e as Category })
          }
          data={selectListData}
          save="key"
        />
      </View>

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
