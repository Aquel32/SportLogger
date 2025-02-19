import { View, Text, TouchableOpacity} from "react-native";
import { router } from "expo-router";

export default function ExerciseNavigation({index}:{index: number}){
return(
    <View className="flex flex-row w-full justify-around bg-gray-900 py-4">
        <TouchableOpacity 
        onPress={() => router.push({ pathname: `/exerciseDetails/about/[id]`, params: { id: index} })}
        className="text-white text-lg font-semibold"
        >ABOUT</TouchableOpacity>
        <TouchableOpacity onPress={() => router.push({ pathname: `/exerciseDetails/history/[id]`, params: { id: index} })}
        className="text-white text-lg font-semibold"
        >HISTORY</TouchableOpacity>
        <TouchableOpacity onPress={() => router.push({ pathname: `/exerciseDetails/charts/[id]`, params: { id: index} })}
        className="text-white text-lg font-semibold"  
        >CHARTS</TouchableOpacity>
        <TouchableOpacity onPress={() => router.push({ pathname: `/exerciseDetails/records/[id]`, params: { id: index} })}
        className="text-white text-lg font-semibold"  
        >RECORDS</TouchableOpacity>
    </View>
)
};