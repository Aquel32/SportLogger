import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Activity, Category, Exercise, Workout } from "@/lib/types";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
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
  updateActivity: (
    index: number,
    sets: number,
    reps: number,
    weight: number
  ) => void;
}) => {
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

      <View className="w-full flex flex-row gap-3">
        <FormField
          title="Serie"
          value={String(activity.sets)}
          handleChangeText={(e: string) =>
            updateActivity(
              index,
              Number(e),
              Number(activity.reps),
              Number(activity.weight)
            )
          }
          placeholder={"Serie"}
          otherStyles={"grow"}
        />
        <FormField
          title="Powtórzenia"
          value={String(activity.reps)}
          handleChangeText={(e: string) =>
            updateActivity(
              index,
              Number(activity.sets),
              Number(e),
              Number(activity.weight)
            )
          }
          placeholder={"Powtórzenia"}
          otherStyles={"grow"}
        />
        <FormField
          title="Ciężar"
          value={String(activity.weight)}
          handleChangeText={(e: string) =>
            updateActivity(
              index,
              Number(activity.sets),
              Number(activity.reps),
              Number(e)
            )
          }
          placeholder={"Ciężar"}
          otherStyles={"grow"}
        />
      </View>
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

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [workoutExercises, setWorkoutExercises] = useState<Array<Exercise>>([]);
  const [workoutActivities, setWorkoutActivities] = useState<Array<Activity>>(
    []
  );

  function submitForm() {
    //check if form is empty
    updateWorkoutList([
      ...workoutsList,
      { ...workout, categories: selectedCategories },
    ]);

    setWorkout({
      exercises: [],
      date: new Date(),
      categories: [],
    });
    setSelectedCategories([]);
    // router push to workout details
  }

  const categoriesData: Array<{ key: string; value: string }> = [];
  Object.values(Category).forEach((name) =>
    categoriesData.push({ key: String(name), value: String(name) })
  );

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

    const newActivity: Activity = {
      exercise: selectedExercise,
      reps: 0,
      sets: 0,
      weight: 0,
    };

    setWorkoutActivities([...workoutActivities, newActivity]);
  }

  function removeExercise(index: number) {
    var arrayFromActivities = [...workoutActivities];
    var arrayFromExercises = [...workoutExercises];
    if (index !== -1) {
      arrayFromActivities.splice(index, 1);
      arrayFromExercises.splice(index, 1);
      setWorkoutActivities(arrayFromActivities);
      setWorkoutExercises(arrayFromExercises);
    }
  }

  function updateActivity(
    index: number,
    sets: number,
    reps: number,
    weight: number
  ) {
    if (index !== -1) {
      var arrayFromActivities = [...workoutActivities];
      arrayFromActivities[index].sets = sets;
      arrayFromActivities[index].reps = reps;
      arrayFromActivities[index].weight = weight;

      setWorkoutActivities(arrayFromActivities);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        className="flex flex-column w-full h-full"
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Text className="text-slate-500 font-bold mt-5">NOWY TRENING</Text>

        <View className="w-[70%]">
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
        </View>

        <View className="w-[70%]">
          <Text className="text-white mt-5">ĆWICZENIA</Text>
          <FlatList
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
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <View className="w-[70%]">
          <Text className="text-white mt-5">DODAJ ĆWICZENIE</Text>
          <SelectList
            setSelected={addNewExercise}
            data={exercisesData}
            save="key"
          />
        </View>

        <View className="w-[70%]">
          <Text className="text-white mt-5">WYBIERZ PARTIĘ</Text>
          <MultipleSelectList
            setSelected={setSelectedCategories}
            data={categoriesData}
            save="value"
            label="Kategorie"
            search={true}
            dropdownShown={false}
            placeholder="Wybierz partie"
            searchPlaceholder="Wyszukaj partię"
            notFoundText="Żadna partia nie pasuje do wpisanej nazwy"
            dropdownTextStyles={{ color: "white" }}
            inputStyles={{ color: "white" }}
            labelStyles={{ color: "white" }}
            disabledTextStyles={{ color: "white" }}
            checkBoxStyles={{ backgroundColor: "#f0f0f0" }}
          />
        </View>

        <CustomButton
          title={"DODAJ TRENING"}
          handlePress={submitForm}
          containerStyles={"bg-slate-400 px-5 my-5"}
          textStyles={""}
          isLoading={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
