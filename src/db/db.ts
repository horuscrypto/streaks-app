import Dexie, { type EntityTable } from 'dexie';

export type HabitShape = 'sphere' | 'icosahedron' | 'block' | 'flower' | 'pyramid' | 'cylinder' | 'cross' | 'star' | 'diamond' | 'rings';

export interface Habit {
  id: string; // uuid
  title: string;
  createdAt: number;
  active: boolean;
  shape?: HabitShape;
  color?: string; // For the monochromatic 3D renders later
}

export interface Strike {
  id: string;
  habitId: string;
  dateCompleted: string; // YYYY-MM-DD
  timestamp: number;
  progress?: number;
}

export interface JournalEntry {
  id: string;
  habitId: string;
  timestamp: number;
  content: string;
  photo?: string;
}

const db = new Dexie('StrikeDB') as Dexie & {
  habits: EntityTable<Habit, 'id'>,
  strikes: EntityTable<Strike, 'id'>,
  journal: EntityTable<JournalEntry, 'id'>
};

// Schema declaration
db.version(4).stores({
  habits: 'id, createdAt, active',
  strikes: 'id, habitId, dateCompleted, [habitId+dateCompleted]',
  journal: 'id, habitId, timestamp'
});

export { db };
