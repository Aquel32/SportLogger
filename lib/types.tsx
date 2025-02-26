export type Exercise = {
  title: string;
  description: string;
  imageUrl: string;
  category: Category;
};

export type Activity = {
  exerciseIndex: number;
  sets: Array<Set>;
};

export type Set = {
  reps: Number;
  weight: Number;
};

export type Workout = {
  exercises: Array<Activity>;
  date: Date;
  categories: Array<string>;
};

export enum Category {
  "Brak" = "",
  "Barki" = "Barki",
  "Biceps" = "Biceps",
  "Triceps" = "Triceps",
  "Przedramie" = "Przedramie",
  "Klata" = "Klata",
  "Brzuch" = "Brzuch",
  "Nogi" = "Nogi",
  "Plecy" = "Plecy",
}
