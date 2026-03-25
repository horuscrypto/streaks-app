import { useState } from 'react';
import { useHabits } from '../hooks/useHabits';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { getGoalFromTitle } from '../utils/goalParser';
import { DynamicGoalShape } from './ui/DynamicGoalShape';

export function CreateHabitView({ onDone }: { onDone: () => void }) {
  const { addHabit } = useHabits();
  const [title, setTitle] = useState('');

  const target = getGoalFromTitle(title);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await addHabit(title.trim());
    onDone();
  };

  return (
    <div className="pt-20 px-6 min-h-[80vh] flex flex-col justify-center max-w-lg mx-auto">
      <div className="flex justify-center mb-8">
        <DynamicGoalShape target={target} progress={0} className="w-32 h-32 opacity-80" />
      </div>

      <h2 className="text-display font-bold text-4xl mb-4 text-primary tracking-tight text-center">
        Forge a New Monolith
      </h2>
      <p className="text-on-surface-variant mb-12 text-lg text-center">
        Extract numbers to create fractional goals.
      </p>
      
      <form onSubmit={submit} className="w-full space-y-12 flex flex-col">
        <Input 
          autoFocus
          placeholder="e.g. Meditate for 15 minutes"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        
        <div className="flex justify-end pt-8">
          <Button 
            type="submit" 
            size="lg" 
            disabled={!title.trim()}
            className="w-full bg-primary-gradient shadow-ambient"
          >
            Create Strike
          </Button>
        </div>
      </form>
    </div>
  );
}
