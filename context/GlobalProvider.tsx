import { DoesFileExist, Load, Save } from "@/lib/filesystem";
import { Exercise, Workout } from "@/lib/types";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface ContextType {
  exercisesList: Array<Exercise>;
  updateExercisesList: (data: Array<Exercise>) => void;
  workoutsList: Array<Workout>;
  updateWorkoutList: (data: Array<Workout>) => void;
}

const GlobalContext = createContext<ContextType>({
  exercisesList: [],
  updateExercisesList: () => {},
  workoutsList: [],
  updateWorkoutList: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [exercisesList, setExercisesList] = useState<Array<Exercise>>([]);
  const [workoutsList, setWorkoutsList] = useState<Array<Workout>>([]);

  function updateExercisesList(data: Array<Exercise>) {
    setExercisesList(data);
    Save("exercises.txt", data);
  }

  function updateWorkoutList(data: Array<Workout>) {
    setWorkoutsList(data);
    Save("workouts.txt", data);
  }

  useEffect(() => {
    async function loadDataOnStart() {
      if (await DoesFileExist("exercises.txt")) {
        const loadedExercises = await Load("exercises.txt");
        setExercisesList(loadedExercises ? loadedExercises : []);
      }
      if (await DoesFileExist("workouts.txt")) {
        const loadedWorkouts = await Load("workouts.txt");
        setWorkoutsList(loadedWorkouts ? loadedWorkouts : []);
      }
    }

    loadDataOnStart();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        exercisesList,
        updateExercisesList,
        workoutsList,
        updateWorkoutList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
