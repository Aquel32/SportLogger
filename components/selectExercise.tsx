import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { ExerciseCard } from "@/components/ExerciseCard";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Exercise } from "@/lib/types";

const SelectExercise = ({
  show,
  setShow,
  addNewExercise,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  addNewExercise: (exercise: Exercise) => void;
}) => {
  const {
    exercisesList,
    workoutsList,
    updateWorkoutList,
    templateList,
    updateTemplateList,
  } = useGlobalContext();

  if (show === false) return <></>;
  return (
    <View className="w-full h-full items-center my-5 gap-5 bg-gray-500 rounded-xl">
      <View className="w-[80%] items-end">
        <TouchableOpacity
          className="w-10 h-10 items-center justify-center rounded-full bg-red-300"
          onPress={() => setShow(false)}
        >
          <Text>X</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        className="mb-5"
        data={exercisesList}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item, index }) => (
          <ExerciseCard
            exercise={item}
            index={index}
            onPress={() => {
              addNewExercise(item);
              setShow(false);
            }}
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
    </View>
  );
};

export default SelectExercise;
