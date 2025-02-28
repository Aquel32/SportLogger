import {
  View,
  Text,
  SafeAreaView,
  GestureResponderEvent,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Category, Exercise } from "@/lib/types";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";
import { SelectList } from "react-native-dropdown-select-list";
import * as DocumentPicker from "expo-document-picker";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function CreateExercise() {
  const {
    exercisesList,
    updateExercisesList,
    workoutsList,
    updateWorkoutList,
  } = useGlobalContext();

  const [exercise, setExercise] = useState<Exercise>({
    id: exercisesList.length,
    title: "",
    description: "",
    imageUrl: "",
    category: Category.Brak,
  });

  function submitForm() {
    //check if form is empty

    if (
      exercise.title === "" ||
      exercise.description === "" ||
      exercise.category === Category.Brak
    ) {
      Alert.alert("Błąd", "Musisz wypełnić wszystkie pola.");
      return;
    }

    updateExercisesList([...exercisesList, exercise]);
    router.back();
  }

  async function openPicker() {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/png", "image/jpg", "image/jpeg"],
    });

    if (!result.canceled) {
      setExercise({ ...exercise, imageUrl: result.assets[0].uri });
    }
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

        {exercise.imageUrl === "" ? (
          <CustomButton
            title={"Wybierz zdjęcie"}
            handlePress={openPicker}
            containerStyles={"bg-black-100 px-5 border-2 border-black-200"}
            textStyles={"text-white"}
            isLoading={false}
          />
        ) : (
          <TouchableOpacity className="w-full relative" onPress={openPicker}>
            <TouchableOpacity
              className="absolute z-10 right-1 top-1"
              onPress={() => setExercise({ ...exercise, imageUrl: "" })}
            >
              <Ionicons
                name="trash-outline"
                size={24}
                color={"black"}
                className="bg-red-300 p-2 rounded-full"
              />
            </TouchableOpacity>
            <Image
              source={{ uri: exercise.imageUrl }}
              className="h-60 w-full object-scale-down"
            />
          </TouchableOpacity>
        )}

        <SelectList
          setSelected={(e: string) =>
            setExercise({ ...exercise, category: e as Category })
          }
          data={selectListData}
          save="key"
          dropdownTextStyles={{ color: "white" }}
          disabledTextStyles={{ color: "white" }}
          inputStyles={{ color: "white" }}
        />
      </View>

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
