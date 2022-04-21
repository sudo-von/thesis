type Mood = {
  id: string,
  userId: string,
  mood: number,
  creationDate: string,
};

type MoodPayload = {
  mood: number,
};

export type {
  Mood,
  MoodPayload,
};
