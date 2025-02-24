import { useGlobalContext } from "@/context/GlobalProvider";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ActivitiesList from "@/components/ActivitiesList";
import { Set } from "@/lib/types";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import SelectExercise from "../(tabs)/selectExercise";

const TrainingDetails = () => {
  const { id } = useLocalSearchParams();
  const {
    exercisesList,
    updateExercisesList,
    workoutsList,
    updateWorkoutList,
  } = useGlobalContext();
  const workout = workoutsList[Number(id)];
  const date = new Date(workout.date);
  const [edit, setEdit] = useState(false);

  function deleteExercise() {
    router.replace("/history");
    var array = [...workoutsList];
    array.splice(array.indexOf(workout), 1);
    updateWorkoutList(array);
  }

  const [newExercisePanel, setNewExercisePanel] = useState(false);

  return (
    <View className="bg-primary h-full">
      <SelectExercise
        show={newExercisePanel}
        setShow={setNewExercisePanel}
        addNewExercise={() => {}}
      />

      <FlatList
        data={[]}
        renderItem={(item) => <></>}
        keyExtractor={(item, index) => String(index)}
        nestedScrollEnabled={true}
        ListHeaderComponent={
          <View className="flex-column py-5">
            <View className="flex-row justify-between px-4">
              <Text className="text-4xl text-white m-2">
                {date.getDate() +
                  "." +
                  (date.getMonth() + 1) +
                  "." +
                  date.getFullYear()}
              </Text>

              <View className="flex-row gap-3">
                <TouchableOpacity
                  onPress={() => setEdit(!edit)}
                  className="bg-orange-500 w-12 h-12 items-center justify-center rounded-full"
                >
                  <Ionicons
                    name="create-outline"
                    size={24}
                    color={"white"}
                    className=""
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={deleteExercise}
                  className="bg-red-500 w-12 h-12 items-center justify-center rounded-full"
                >
                  <Ionicons
                    name="trash-outline"
                    size={24}
                    color={"white"}
                    className=""
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View className="items-center">
              <View className="w-[70%]">
                <ActivitiesList
                  workoutActivities={workout.exercises}
                  removeExercise={() => {}}
                  updateActivity={() => {}}
                  edit={edit}
                />
              </View>
            </View>

            {edit && (
              <CustomButton
                title={"DODAJ ĆWICZENIE"}
                handlePress={() => setNewExercisePanel(true)}
                containerStyles={"bg-slate-400 px-5 my-5"}
                textStyles={""}
                isLoading={false}
              />
            )}
          </View>
        }
      />
    </View>
  );
};

export default TrainingDetails;
