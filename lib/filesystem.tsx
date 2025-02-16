import * as FileSystem from "expo-file-system";
import { Exercise, Workout } from "./types";

export async function Save(
  fileName: string,
  data: Array<Workout> | Array<Exercise>
) {
  try {
    let fileUri = FileSystem.documentDirectory + fileName;
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data), {
      encoding: FileSystem.EncodingType.UTF8,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function Load(fileName: string) {
  try {
    let fileUri = FileSystem.documentDirectory + fileName;
    const fileInfo = await FileSystem.readAsStringAsync(fileUri);
    return JSON.parse(fileInfo);
  } catch (error) {
    console.error(error);
  }
}

export async function DoesFileExist(fileName: string) {
  try {
    let fileUri = FileSystem.documentDirectory + fileName;
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    return fileInfo.exists;
  } catch (error) {
    console.error(error);
  }
}
