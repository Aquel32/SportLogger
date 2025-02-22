import CustomButton from "@/components/CustomButton";
import { ExerciseCard } from "@/components/ExerciseCard";
import FormField from "@/components/FormField";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Activity, Category, Exercise, Set, Workout } from "@/lib/types";
import { router } from "expo-router";
import { useEffect, useState } from "react";
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

const ActivityCard = ({
  activity,
  index,
  removeExercise,
  updateActivity,
}: {
  activity: Activity;
  index: number;
  removeExercise: () => void;
  updateActivity: (index: number, sets: Array<Set>) => void;
}) => {
  function addSet() {
    const newSet: Set = {
      reps: 0,
      weight: 0,
    };

    var arrayFromActivities = [...activity.sets];
    arrayFromActivities.push(newSet);

    updateActivity(index, arrayFromActivities);
  }
  function removeSet(i: number) {
    var arrayFromActivities = [...activity.sets];
    if (i !== -1) {
      arrayFromActivities.splice(i, 1);
      updateActivity(index, arrayFromActivities);
    }
  }

  function updateSet(i: number, reps: Number, weight: Number) {
    var arrayFromActivities = [...activity.sets];
    arrayFromActivities[i].reps = reps;
    arrayFromActivities[i].weight = weight;
    updateActivity(index, arrayFromActivities);
  }

  return (
    <View className="bg-gray-500 p-2 my-2 rounded-xl">
      <View className="w-full flex flex-row justify-between pr-3">
        <Text className="">{activity.exercise.title}</Text>
        <TouchableOpacity
          className="bg-red-300 px-1 flex justify-center items-center"
          onPress={() => removeExercise()}
        >
          <Text>X</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        scrollEnabled={false}
        className="flex flex-column gap-5"
        data={activity.sets}
        renderItem={(item) => (
          <View className="w-full flex flex-row gap-3">
            <Text className="self-center">{item.index + 1}</Text>
            <FormField
              title="Powtórzenia"
              value={String(item.item.reps)}
              handleChangeText={(e: string) =>
                updateSet(item.index, Number(e), item.item.weight)
              }
              placeholder={"Powtórzenia"}
              otherStyles={"grow"}
            />
            <FormField
              title="Ciężar"
              value={String(item.item.weight)}
              handleChangeText={(e: string) => {
                updateSet(item.index, item.item.reps, Number(e));
              }}
              placeholder={"Ciężar"}
              otherStyles={"grow"}
            />
            <TouchableOpacity
              className="bg-red-300 w-10 h-10 self-center"
              onPress={() => removeSet(item.index)}
            >
              <Text>-</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <Text className="text-xs text-black font-bold">
            NIE DODAŁEŚ ŻADNYCH SERII DO ĆWICZENIA
          </Text>
        )}
      />

      <CustomButton
        title={"DODAJ SERIĘ"}
        handlePress={addSet}
        containerStyles={"m-2 bg-slate-400"}
        textStyles={""}
        isLoading={false}
      />
    </View>
  );
};

export default function WorkoutScreen() {
  const { exercisesList, workoutsList, updateWorkoutList } = useGlobalContext();

  const [workout, setWorkout] = useState<Workout>({
    exercises: [],
    date: new Date(),
    categories: [],
  });

  const [selectedCategories, setSelectedCategories] = useState<Array<string>>(
    []
  );
  const [workoutExercises, setWorkoutExercises] = useState<Array<Exercise>>([]);
  const [workoutActivities, setWorkoutActivities] = useState<Array<Activity>>(
    []
  );

  const [addNewExercisePanel, setAddNewExercisePanel] = useState(false);

  function submitForm() {
    //check if form is empty
    updateWorkoutList([
      ...workoutsList,
      {
        ...workout,
        categories: selectedCategories,
        exercises: workoutActivities,
      },
    ]);

    setWorkout({
      exercises: [],
      date: new Date(),
      categories: [],
    });
    setSelectedCategories([]);
    // router push to workout details
  }

  const exercisesData: Array<{ key: Exercise; value: string }> = [];

  exercisesList.forEach((exercise) =>
    exercisesData.push({
      key: exercise,
      value: String(exercise.title),
    })
  );

  function addNewExercise(selectedExercise: Exercise) {
    if (workoutExercises.indexOf(selectedExercise) != -1) return;

    setWorkoutExercises([...workoutExercises, selectedExercise]);
    setSelectedCategories([...selectedCategories, selectedExercise.category]);

    const newActivity: Activity = {
      exercise: selectedExercise,
      sets: [],
    };

    setWorkoutActivities([...workoutActivities, newActivity]);
  }

  function removeExercise(index: number) {
    var arrayFromActivities = [...workoutActivities];
    var arrayFromExercises = [...workoutExercises];
    var arrayFromCategories = [...selectedCategories];
    if (index !== -1) {
      arrayFromActivities.splice(index, 1);
      arrayFromExercises.splice(index, 1);
      arrayFromCategories.splice(index, 1);
      setWorkoutActivities(arrayFromActivities);
      setWorkoutExercises(arrayFromExercises);
      setSelectedCategories(arrayFromCategories);
    }
  }

  function updateActivity(index: number, sets: Array<Set>) {
    if (index !== -1) {
      var arrayFromActivities = [...workoutActivities];
      arrayFromActivities[index].sets = sets;

      setWorkoutActivities(arrayFromActivities);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      {addNewExercisePanel && (
        <View className="w-full h-full items-center my-5 gap-5 bg-gray-500 rounded-xl">
          <View className="w-[80%] items-end">
            <TouchableOpacity
              className="p-2 bg-red-300"
              onPress={() => setAddNewExercisePanel(false)}
            >
              <Text>AA</Text>
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
                  setAddNewExercisePanel(false);
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
      )}

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
            <View className="flex flex-row items-center justify-between">
              <SelectList
                setSelected={addNewExercise}
                data={exercisesData}
                save="key"
              />
              <TouchableOpacity className="w-[auto] bg-green-500 p-2 rounded-xl">
                <Text>NOWY TEMPLATE</Text>
              </TouchableOpacity>
            </View>
          </View> */}

            <View className="w-[70%]">
              <Text className="text-white mt-5">ĆWICZENIA</Text>
              <FlatList
                scrollEnabled={false}
                className="flex flex-column gap-5"
                data={workoutActivities}
                renderItem={(item) => (
                  <ActivityCard
                    activity={item.item}
                    index={item.index}
                    removeExercise={() => removeExercise(item.index)}
                    updateActivity={updateActivity}
                  />
                )}
                ListEmptyComponent={() => (
                  <Text className="text-xs text-slate-500 font-bold">
                    NIE DODAŁEŚ ŻADNYCH ĆWICZEŃ DO TRENINGU
                  </Text>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>

            <CustomButton
              title={"DODAJ ĆWICZENIE"}
              handlePress={() => setAddNewExercisePanel(true)}
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
