export type Exercise = {
  title: string;
  description: string;
  imageUrl: string;
};

export type Activity = {
  exercise: Exercise;
  sets: Number;
  reps: Number;
};

export type Workout = {
  title: string;
  exercises: Array<Activity>;
};
