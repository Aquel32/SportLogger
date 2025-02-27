import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";
import { View } from "react-native";


export default function SettingsPage() {
  const { updateExercisesList, updateWorkoutList, updateTemplateList } =
    useGlobalContext();

  function resetData() {
    updateExercisesList([]);
    updateWorkoutList([]);
    updateTemplateList([]);
  }

  return (
    <View className="bg-background h-full items-center p-10 gap-5 w-full ">
      <CustomButton
        title={"Importuj dane"}
        handlePress={() => {}}
        containerStyles={"bg-cyan-100 px-5 w-[90%]"}
        textStyles={""}
        isLoading={false}
      />
      <CustomButton
        title={"Eksportuj dane"}
        handlePress={() => {}}
        containerStyles={"bg-cyan-100 px-5 w-[90%]"}
        textStyles={""}
        isLoading={false}
      />
      <CustomButton
        title={"Reset do ustawień fabrycznych"}
        handlePress={resetData}
        containerStyles={"bg-red-400 px-5 w-[90%]"}
        textStyles={"text-black font-bold"}
        isLoading={false}
      />
    </View>
  );
}
