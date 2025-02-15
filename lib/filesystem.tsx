import * as FileSystem from "expo-file-system";

export async function Save(data: any) {
  try {
    let fileUri = FileSystem.documentDirectory + "text.txt";
    console.log(fileUri);
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data), {
      encoding: FileSystem.EncodingType.UTF8,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function Load() {
  try {
    let fileUri = FileSystem.documentDirectory + "text.txt";
    const fileInfo = await FileSystem.readAsStringAsync(fileUri);
    console.log(JSON.parse(fileInfo));
  } catch (error) {
    console.error(error);
  }
}
