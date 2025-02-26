import CustomButton from "@/components/CustomButton";
import { View } from "react-native";

export default function SettingsPage() {
  return (
    <View className="bg-primary h-full items-center p-10 gap-10">
      <CustomButton
        title={"Importuj dane"}
        handlePress={() => {}}
        containerStyles={"bg-slate-400 px-5"}
        textStyles={""}
        isLoading={false}
      />
      <CustomButton
        title={"Eksportuj dane"}
        handlePress={() => {}}
        containerStyles={"bg-slate-400 px-5"}
        textStyles={""}
        isLoading={false}
      />
      <CustomButton
        title={"Reset do ustawień fabrycznych"}
        handlePress={() => {}}
        containerStyles={"bg-red-400 px-5"}
        textStyles={"text-black font-bold"}
        isLoading={false}
      />
    </View>
  );
}
