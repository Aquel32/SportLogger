export type Exercise = {
  title: string;
  description: string;
  imageUrl: string;
};

export type Activity = {
  exercise: Exercise;
  sets: Number;
  reps: Number;
  weight: Number;
};

export type Workout = {
  exercises: Array<Activity>;
  date: Date;
  categories: Array<string>;
};

export enum Category {
  "Barki" = "Barki",
  "Biceps" = "Biceps",
  "Triceps" = "Triceps",
  "Przedramie" = "Przedramie",
  "Klata" = "Klata",
  "Brzuch" = "Brzuch",
  "Nogi" = "Nogi",
}
