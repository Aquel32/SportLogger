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
  setExercisesList: Dispatch<SetStateAction<Array<Exercise>>>;
  workoutsList: Array<Workout>;
  setWorkoutsList: Dispatch<SetStateAction<Array<Workout>>>;
}

const GlobalContext = createContext<ContextType>({
  exercisesList: [],
  setExercisesList: () => {},
  workoutsList: [],
  setWorkoutsList: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [exercisesList, setExercisesList] = useState<Array<Exercise>>([]);
  const [workoutsList, setWorkoutsList] = useState<Array<Workout>>([]);

  useEffect(() => {
    // IF FILE DOESNT EXISTS GENERATE WITH DEFAULT VALUES (for exercises)
    // LOAD DATA FROM FILE
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        exercisesList,
        setExercisesList,
        workoutsList,
        setWorkoutsList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
