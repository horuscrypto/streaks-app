import { useLiveQuery } from 'dexie-react-hooks';
import type { HabitShape } from '../db/db';
import { db } from '../db/db';

export function useHabits() {
  const habits = useLiveQuery(async () => {
    const all = await db.habits.filter(h => h.active).toArray();
    return all.sort((a, b) => a.createdAt - b.createdAt);
  }) || [];

  const addHabit = async (title: string, shape: HabitShape = 'sphere', color: string = '#FFFFFF') => {
    const id = crypto.randomUUID();
    await db.habits.add({
      id,
      title,
      createdAt: Date.now(),
      active: true,
      shape,
      color,
    });
    return id;
  };

  const archiveHabit = async (id: string) => {
    await db.habits.update(id, { active: false });
  };

  return { habits, addHabit, archiveHabit };
}

export function useStrikes(habitId: string) {
  const strikes = useLiveQuery(() => 
    db.strikes.where('habitId').equals(habitId).toArray()
  ) || [];

  const toggleStrike = async (dateCompleted: string, increment: number = 5, target: number | null = null) => {
    const existing = await db.strikes.where({ habitId, dateCompleted }).first();
    
    if (existing) {
      if (target === null || target <= 1) {
        await db.strikes.delete(existing.id);
        return false;
      } else {
        const cur = existing.progress || 1;
        const p = Math.min(cur + increment, target);
        await db.strikes.update(existing.id, { progress: p, timestamp: Date.now() });
        return p > cur;
      }
    } else {
      const p = target && target > 1 ? Math.min(increment, target) : 1;
      await db.strikes.add({
        id: crypto.randomUUID(),
        habitId,
        dateCompleted,
        timestamp: Date.now(),
        progress: p
      });
      return true;
    }
  };

  const decrementStrike = async (dateCompleted: string, decrement: number = 5) => {
    const existing = await db.strikes.where({ habitId, dateCompleted }).first();
    if (!existing) return false;
    
    const p = (existing.progress || 1) - decrement;
    if (p <= 0) {
      await db.strikes.delete(existing.id);
    } else {
      await db.strikes.update(existing.id, { progress: p, timestamp: Date.now() });
    }
    return true;
  };

  return { strikes, toggleStrike, decrementStrike };
}
