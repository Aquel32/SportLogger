import ActivitiesList from "@/components/ActivitiesList";
import CustomButton from "@/components/CustomButton";
import { ExerciseCard } from "@/components/ExerciseCard";
import FormField from "@/components/FormField";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Activity, Category, Exercise, Set, Workout } from "@/lib/types";
import { router } from "expo-router";
import { SetStateAction, useEffect, useState } from "react";
import {
  FlatList,
  GestureResponderEvent,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  MultipleSelectList,
  SelectList,
} from "react-native-dropdown-select-list";
import SelectExercise from "../../components/selectExercise";

export default function WorkoutScreen() {
  const {
    exercisesList,
    workoutsList,
    updateWorkoutList,
    templateList,
    updateTemplateList,
  } = useGlobalContext();

  const [workout, setWorkout] = useState<Workout>({
    exercises: [],
    date: new Date(),
    categories: [],
  });

  const [showExercisePanel, setShowExercisePanel] = useState(false);

  function submitForm() {
    //check if form is empty
    updateWorkoutList([...workoutsList, workout]);

    //setSelfTemplate(-100);

    setWorkout({
      exercises: [],
      date: new Date(),
      categories: [],
    });

    router.replace("/history");
    router.push({
      pathname: "/trainingDetails/[id]",
      params: { id: workoutsList.length },
    });
  }

  function addNewExercise(selectedExercise: Exercise) {
    if (
      workout.exercises
        .map((activity) => activity.exercise)
        .indexOf(selectedExercise) != -1
    )
      return;

    const newActivity: Activity = {
      exercise: selectedExercise,
      sets: [],
    };

    setWorkout({
      ...workout,
      categories: [...workout.categories, selectedExercise.category],
      exercises: [...workout.exercises, newActivity],
    });

    //removeSelfTemplate();
  }

  // const [selfTemplate, setSelfTemplate] = useState(-100);

  // function saveAsTemplate() {
  //   if (selfTemplate != -100) return;
  //   updateTemplateList([...templateList, workout]);
  //   setSelfTemplate(templateList.length - 1);
  // }

  // function removeSelfTemplate() {
  //   if (selfTemplate == -100) return;

  //   removeTemplate(selfTemplate);
  //   setSelfTemplate(-100);
  // }

  // function removeTemplate(index: number) {
  //   var array = [...templateList];
  //   array.splice(index, 1);
  //   updateTemplateList(array);
  // }

  // function applyTemplate(template: Workout) {
  //   removeSelfTemplate();
  //   setWorkout(template);
  // }

  return (
    <SafeAreaView className="bg-primary h-full">
      <SelectExercise
        show={showExercisePanel}
        setShow={setShowExercisePanel}
        addNewExercise={addNewExercise}
      />

      <FlatList
        data={[]}
        renderItem={(item) => <></>}
        keyExtractor={(item, index) => String(index)}
        nestedScrollEnabled={true}
        ListHeaderComponent={
          <View className="w-full items-center">
            <Text className="text-slate-500 font-bold mt-5">NOWY TRENING</Text>

            {/* <View className="w-[70%]">
              <Text className="text-white mt-5">TEMPLATE</Text>

              <View className="flex flex-row justify-between">
                <CustomButton
                  title={
                    selfTemplate == -100
                      ? "ZAPISZ JAKO TEMPLATE"
                      : "ZAPISANO JAKO TEMPLATE"
                  }
                  handlePress={saveAsTemplate}
                  containerStyles={"bg-slate-400 px-3 my-5"}
                  textStyles={"text-xs"}
                  isLoading={false}
                />

                <CustomButton
                  title={"WYCZYŚĆ"}
                  handlePress={() => {
                    setWorkout({
                      exercises: [],
                      date: new Date(),
                      categories: [],
                    });
                    removeSelfTemplate();
                  }}
                  containerStyles={"bg-slate-400 px-5 my-5"}
                  textStyles={""}
                  isLoading={false}
                />
              </View>

              <FlatList
                className="flex flex-column gap-5"
                data={templateList}
                renderItem={(item) => (
                  <TouchableOpacity
                    className="bg-gray-500 w-20 h-20 p-2 rounded-xl"
                    onPress={() => {
                      applyTemplate(item.item);
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => removeTemplate(item.index)}
                    >
                      <Text className="text-xs bg-red-300 w-5 h-5 items-center justify-center">
                        X
                      </Text>
                    </TouchableOpacity>
                    <View>
                      {item.item.exercises.map(
                        (activity, index) =>
                          index < 3 && (
                            <Text
                              key={activity.exercise.title}
                              className="text-xs"
                              numberOfLines={1}
                            >
                              {activity.exercise.title}
                            </Text>
                          )
                      )}
                    </View>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={() => (
                  <Text className="text-xs text-slate-500 font-bold">
                    NIE DODAŁEŚ ŻADNYCH TEMPLATEÓW
                  </Text>
                )}
                keyExtractor={(item, index) => index.toString()}
                horizontal
              />
            </View> */}

            <View className="w-[70%]">
              <Text className="text-white mt-5">ĆWICZENIA</Text>
              <ActivitiesList
                workout={workout}
                setWorkout={setWorkout}
                edit={true}
              />
            </View>

            <CustomButton
              title={"DODAJ ĆWICZENIE"}
              handlePress={() => setShowExercisePanel(true)}
              containerStyles={"bg-slate-400 px-5 my-5"}
              textStyles={""}
              isLoading={false}
            />

            <CustomButton
              title={"DODAJ TRENING"}
              handlePress={submitForm}
              containerStyles={"bg-slate-400 px-5 my-5"}
              textStyles={""}
              isLoading={false}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
}
