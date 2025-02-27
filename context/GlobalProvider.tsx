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
  templateList: Array<Workout>;
  updateTemplateList: (data: Array<Workout>) => void;
}

const GlobalContext = createContext<ContextType>({
  exercisesList: [],
  updateExercisesList: () => {},
  workoutsList: [],
  updateWorkoutList: () => {},
  templateList: [],
  updateTemplateList: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [exercisesList, setExercisesList] = useState<Array<Exercise>>([]);
  const [workoutsList, setWorkoutsList] = useState<Array<Workout>>([]);
  const [templateList, setTemplateList] = useState<Array<Workout>>([]);

  function updateExercisesList(data: Array<Exercise>) {
    setExercisesList(data);
    Save("exercises.txt", data);
  }

  function updateWorkoutList(data: Array<Workout>) {
    setWorkoutsList(data);
    Save("workouts.txt", data);
  }

  function updateTemplateList(data: Array<Workout>) {
    setTemplateList(data);
    Save("templates.txt", data);
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
      if (await DoesFileExist("templates.txt")) {
        const loadedTemplates = await Load("templates.txt");
        setTemplateList(loadedTemplates ? loadedTemplates : []);
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
        templateList,
        updateTemplateList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
