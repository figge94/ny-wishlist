export type Reminder = {
  id: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  time?: string; // HH:mm
  list?: string;
  done?: boolean;
};
