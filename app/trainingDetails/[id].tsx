import { useGlobalContext } from "@/context/GlobalProvider";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ActivitiesList from "@/components/ActivitiesList";
import { Activity, Exercise, Set, Workout } from "@/lib/types";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import SelectExercise from "../../components/selectExercise";
import DateTimePicker, {
  DateType,
  getDefaultStyles,
} from "react-native-ui-datepicker";

const TrainingDetails = () => {
  const { id } = useLocalSearchParams();
  const {
    exercisesList,
    updateExercisesList,
    workoutsList,
    updateWorkoutList,
  } = useGlobalContext();

  const [workout, setWorkout] = useState<Workout>(workoutsList[Number(id)]);
  const [showExercisePanel, setShowExercisePanel] = useState(false);
  const [showDate, setShowDate] = useState(false);

  function updateWorkout(newWorkout: Workout) {
    setWorkout(newWorkout);

    var array = [...workoutsList];
    array[Number(id)] = newWorkout;
    updateWorkoutList(array);
  }

  const [edit, setEdit] = useState(false);

  function addNewExercise(selectedExercise: Exercise) {
    if (
      workout.exercises
        .map((activity) => exercisesList[activity.exerciseIndex])
        .indexOf(selectedExercise) != -1
    )
      return;

    const newActivity: Activity = {
      exerciseIndex: exercisesList.indexOf(selectedExercise),
      sets: [],
    };

    updateWorkout({
      ...workout,
      categories: [...workout.categories, selectedExercise.category],
      exercises: [...workout.exercises, newActivity],
    });
  }

  function deleteExercise() {
    router.replace("/history");
    var array = [...workoutsList];
    array.splice(array.indexOf(workout), 1);
    updateWorkoutList(array);
  }

  const defaultStyles = getDefaultStyles();
  const [selected, setSelected] = useState<DateType>(workout.date);

  function updateDate(newDate: DateType) {
    setSelected(newDate);
    const date = selected as Date;
    updateWorkout({ ...workout, date: date });
  }

  return (
    <View className="bg-background h-full">
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
          <View className="flex-column py-5">
            <View className="flex-row justify-between px-4">
              <View className="flex flex-row items-center">
                <TouchableOpacity
                  onPress={() => {
                    if (edit) {
                      setShowDate(!showDate);
                    }
                  }}
                >
                  <Text
                    className={`text-4xl text-white m-2 ${
                      edit === true && "underline"
                    }`}
                  >
                    {(selected as Date).getDate() +
                      "." +
                      ((selected as Date).getMonth() + 1) +
                      "." +
                      (selected as Date).getFullYear()}
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="flex-row gap-3">
                <TouchableOpacity
                  onPress={() => {
                    setEdit(!edit);
                    setShowDate(false);
                  }}
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

            {edit === true && showDate === true && (
              <View className="w-full items-center">
                <View className="w-[70%]">
                  <DateTimePicker
                    mode="single"
                    date={selected}
                    onChange={({ date }) => updateDate(date)}
                    styles={{
                      ...defaultStyles,
                      today: { backgroundColor: "#ababab" },
                    }}
                    className="bg-white p-2 rounded-xl"
                  />
                </View>
              </View>
            )}

            <View className="items-center">
              <View className="w-[70%]">
                <ActivitiesList
                  workout={workout}
                  setWorkout={updateWorkout}
                  edit={edit}
                />
              </View>
            </View>

            {edit && (
              <CustomButton
                title={"DODAJ ĆWICZENIE"}
                handlePress={() => setShowExercisePanel(true)}
                containerStyles={"bg-cyan-100 px-5 my-5"}
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
