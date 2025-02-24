import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { Activity, Set } from "@/lib/types";
import CustomButton from "./CustomButton";
import FormField from "./FormField";

const ActivityCard = ({
  activity,
  index,
  removeExercise,
  updateActivity,
  edit,
}: {
  activity: Activity;
  index: number;
  removeExercise: () => void;
  updateActivity: (index: number, sets: Array<Set>) => void;
  edit: boolean;
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
        {edit && (
          <TouchableOpacity
            className="bg-red-300 px-1 flex justify-center items-center"
            onPress={() => removeExercise()}
          >
            <Text>X</Text>
          </TouchableOpacity>
        )}
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
            {edit && (
              <TouchableOpacity
                className="bg-red-300 w-10 h-10 self-center"
                onPress={() => removeSet(item.index)}
              >
                <Text>-</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <Text className="text-xs text-black font-bold">
            NIE DODAŁEŚ ŻADNYCH SERII DO ĆWICZENIA
          </Text>
        )}
      />

      {edit && (
        <CustomButton
          title={"DODAJ SERIĘ"}
          handlePress={addSet}
          containerStyles={"m-2 bg-slate-400"}
          textStyles={""}
          isLoading={false}
        />
      )}
    </View>
  );
};

const ActivitiesList = ({
  workoutActivities,
  removeExercise,
  updateActivity,
  edit,
}: {
  workoutActivities: Array<Activity>;
  removeExercise: (i: number) => void;
  updateActivity: (i: number, sets: Array<Set>) => void;
  edit: boolean;
}) => {
  return (
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
          edit={edit}
        />
      )}
      ListEmptyComponent={() => (
        <Text className="text-xs text-slate-500 font-bold">
          NIE DODAŁEŚ ŻADNYCH ĆWICZEŃ DO TRENINGU
        </Text>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default ActivitiesList;
