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

const ExerciseDetails = () => {
  const { id } = useLocalSearchParams();
  const {
    exercisesList,
    updateExercisesList,
    workoutsList,
    updateWorkoutList,
  } = useGlobalContext();
  const exercise = exercisesList[Number(id)];

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
      if (activity.exerciseIndex == exercisesList.indexOf(exercise)) {
        const date = new Date(workout.date);
        const dateString = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;

        let sumWeight = 0;
        let sumSets = 0;
        activity.sets.forEach((set) => {
          sumWeight += Number(set.reps) * Number(set.weight);
          sumSets += Number(set.reps);
        });

        const avgWeight = sumWeight / sumSets;

        chartData.labels.push(dateString);
        chartData.datasets[0].data.push(avgWeight);
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
            width={350} // from react-native
            height={220}
            yAxisLabel=""
            yAxisSuffix="kg"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "gray",
              backgroundGradientFrom: "gray",
              backgroundGradientTo: "lightgray",
              decimalPlaces: 1, // optional, defaults to 2dp
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
