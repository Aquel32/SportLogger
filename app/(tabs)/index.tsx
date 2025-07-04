import ActivitiesList from "@/components/ActivitiesList";
import CustomButton from "@/components/CustomButton";
import { ExerciseCard } from "@/components/ExerciseCard";
import FormField from "@/components/FormField";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Activity, Category, Exercise, Set, Workout } from "@/lib/types";
import { router } from "expo-router";
import { SetStateAction, useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  FlatList,
  GestureResponderEvent,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
  const [showTemplatePanel, setShowTemplatePanel] = useState(true);
  const [selfTemplate, setSelfTemplate] = useState(-100);

  function updateWorkout(newWorkout: Workout) {
    setWorkout(newWorkout);
    setSelfTemplate(-100);
  }

  function submitForm() {
    //check if form is empty
    updateWorkoutList([...workoutsList, workout]);

    setSelfTemplate(-100);
    setShowTemplatePanel(true);

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

  //powtórzenie z [id]
  function addNewExercise(selectedExercise: Exercise) {
    if (
      workout.exercises
        .map((activity) => exercisesList[activity.exerciseIndex])
        .indexOf(selectedExercise) != -1
    )
      return;

    const newActivity: Activity = {
      exerciseIndex: selectedExercise.id,
      sets: [],
    };

    setWorkout({
      ...workout,
      categories: [...workout.categories, selectedExercise.category],
      exercises: [...workout.exercises, newActivity],
    });
  }

  function saveAsTemplate() {
    if (selfTemplate != -100) return;
    updateTemplateList([...templateList, workout]);
    setSelfTemplate(templateList.length - 1);
  }

  function removeTemplate(index: number) {
    var array = [...templateList];
    array.splice(index, 1);
    updateTemplateList(array);
  }

  if (showTemplatePanel) {
    return (
      <ScrollView
        className="bg-background h-full w-full"
        contentContainerStyle={{ alignItems: "center" }}
      >
        <View className="w-full px-4">
          <Text className="text-white mt-5 text-l font-bold text-center">
            SZABLONY
          </Text>

          <View className="flex flex-row gap-2">
            <CustomButton
              title={"PUSTY SZABLON"}
              handlePress={() => {
                setShowTemplatePanel(false);
                updateWorkout({
                  exercises: [],
                  date: new Date(),
                  categories: [],
                });
              }}
              containerStyles={"bg-cyan-100 px-3 my-5 w-[50%] shrink"}
              textStyles={"text-xs"}
              isLoading={false}
            />

            <CustomButton
              title={"POWRÓT"}
              handlePress={() => setShowTemplatePanel(false)}
              containerStyles={"bg-cyan-100 px-3 my-5 w-[50%] shrink"}
              textStyles={"text-xs"}
              isLoading={false}
            />
          </View>

          <FlatList
            className="flex flex-column gap-5 "
            data={templateList}
            renderItem={(item) => (
              <View className="bg-gray-400 w-full p-2 mb-5 rounded-xl relative flex flex-row">
                <TouchableOpacity
                  className="h-full w-[90%]"
                  onPress={() => {
                    const templateCopy = JSON.parse(JSON.stringify(item.item));
                    setWorkout(templateCopy);
                    setShowTemplatePanel(false);
                  }}
                >
                  <View className="flex">
                    {item.item.exercises.map(
                      (activity, index) =>
                        index < 3 && (
                          <Text
                            key={exercisesList[activity.exerciseIndex].title}
                            className="text-xs py-2"
                            numberOfLines={1}
                          >
                            {exercisesList[activity.exerciseIndex].title} x{" "}
                            {activity.sets.length}
                          </Text>
                        )
                    )}
                  </View>
                  {item.item.exercises.length > 3 && (
                    <Text className="text-s text-black-200 font-bold">
                      {item.item.exercises.length - 3} więcej...
                    </Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => removeTemplate(item.index)}
                  className="w-[10%] h-full bg-cyan-100 rounded-xl flex items-center justify-center"
                >
                  <AntDesign
                    name="close"
                    size={16}
                    color={"black"}
                    className="text-xs w-[100%]  items-center text-center p-1"
                  />
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={() => (
              <Text className="text-xs text-white font-bold text-center">
                NIE DODAŁEŚ ŻADNYCH SZABLONÓW
              </Text>
            )}
            keyExtractor={(item, index) => index.toString()}
            nestedScrollEnabled={false}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView className="bg-background h-full">
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
            <Text className="text-white font-bold mt-5">NOWY TRENING</Text>

            <View className="flex flex-row justify-between gap-2 px-4">
              <CustomButton
                title={"WYBIERZ SZABLON"}
                handlePress={() => setShowTemplatePanel(true)}
                containerStyles={"bg-cyan-100 px-3 my-5 w-[50%] shrink"}
                textStyles={"text-xs"}
                isLoading={false}
              />

              {selfTemplate == -100 && (
                <CustomButton
                  title={"ZAPISZ"}
                  handlePress={saveAsTemplate}
                  containerStyles={"bg-cyan-100 px-5 my-5 w-[50%] shrink"}
                  textStyles={"text-xs"}
                  isLoading={false}
                />
              )}
              {selfTemplate != -100 && (
                <CustomButton
                  title={"ZAPISANO"}
                  handlePress={() => {}}
                  containerStyles={"bg-cyan-100 px-5 my-5 w-[50%] shrink"}
                  textStyles={"text-xs"}
                  isLoading={false}
                />
              )}
            </View>

            <View className="flex px-4">
              <Text className="text-white text-center font-bold mt-5 mb-2">
                ĆWICZENIA
              </Text>
              <ActivitiesList
                workout={workout}
                setWorkout={updateWorkout}
                edit={true}
              />
            </View>

            <CustomButton
              title={"DODAJ ĆWICZENIE"}
              handlePress={() => setShowExercisePanel(true)}
              containerStyles={"bg-cyan-100 px-5 my-5 w-[90%] shrink"}
              textStyles={"text-xs"}
              isLoading={false}
            />

            <CustomButton
              title={"DODAJ TRENING"}
              handlePress={submitForm}
              containerStyles={"bg-cyan-100 px-5 my-5 w-[90%] shrink"}
              textStyles={"text-xs"}
              isLoading={false}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
}
