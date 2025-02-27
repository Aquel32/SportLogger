import { useGlobalContext } from "@/context/GlobalProvider";
import { useLocalSearchParams } from "expo-router";
import { Text, View, Image, Dimensions } from "react-native";
import ExerciseNavigation from "@/components/ExerciseNavigation";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { Category, Exercise } from "@/lib/types";

const ExerciseDetails = () => {
  const { id } = useLocalSearchParams();
  const {
    exercisesList,
    updateExercisesList,
    workoutsList,
    updateWorkoutList,
  } = useGlobalContext();

  let exercise: Exercise = {
    id: -1,
    title: "",
    description: "",
    imageUrl: "",
    category: Category.Brak,
  };

  exercisesList.find((founded) => {
    if (founded.id === Number(id)) {
      exercise = founded;
    }
  });

  const chartData = {
    labels: Array<string>(),
    datasets: [
      {
        data: Array<number>(),
      },
    ],
  };

  workoutsList.filter((workout) =>
    workout.exercises.some((activity) => {
      if (activity.exerciseIndex == exercise.id) {
        const date = new Date(workout.date);
        const dateString = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;

        let sumWeight = 0;
        let sumSets = 0;
        activity.sets.forEach((set) => {
          sumWeight += Number(set.reps) * Number(set.weight);
          sumSets += Number(set.reps);
        });

        if (sumSets != 0) {
          const avgWeight = sumWeight / sumSets;

          chartData.labels.push(dateString);
          chartData.datasets[0].data.push(avgWeight);
        }
      }
    })
  );

  return (
    <View className="bg-background h-full">
      <ExerciseNavigation index={Number(id)}></ExerciseNavigation>
      <Image
        source={
          exercise.imageUrl
            ? { uri: exercise.imageUrl }
            : require("../../../assets/images/noimage.png")
        }
        className="w-full h-40"
      />

      <Text className="text-4xl text-white m-2">{exercise.title}</Text>

      {chartData.labels.length > 0 ? (
        <View className="m-2 items-center">
          <Text className="text-white">Średnia ciężarów</Text>
          <LineChart
            data={chartData}
            width={350}
            height={220}
            yAxisLabel=""
            yAxisSuffix="kg"
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: "gray",
              backgroundGradientFrom: "gray",
              backgroundGradientTo: "lightgray",
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "black",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      ) : (
        <Text className="text-white m-2">Brak danych do wyświetlenia</Text>
      )}
    </View>
  );
};

export default ExerciseDetails;
