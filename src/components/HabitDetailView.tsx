import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db';
import { useStrikes } from '../hooks/useHabits';
import { useJournal } from '../hooks/useJournal';
import { cn, Button } from './ui/Button';
import { useSound } from '../hooks/useSound';
import { getGoalFromTitle } from '../utils/goalParser';
import { DynamicGoalShape } from './ui/DynamicGoalShape';
import { CreateEntryView } from './CreateEntryView';

export function HabitDetailView({ habitId, onClose }: { habitId: string; onClose: () => void }) {
  const habit = useLiveQuery(() => db.habits.get(habitId), [habitId]);
  const { strikes, toggleStrike, decrementStrike } = useStrikes(habitId);
  const { entries } = useJournal(habitId);
  const { playStrikeSound } = useSound();
  const [viewDate, setViewDate] = useState(new Date());
  const [isAddingNote, setIsAddingNote] = useState(false);
  
  const target = habit ? getGoalFromTitle(habit.title) : null;
  const today = new Date().toISOString().split('T')[0];
  const todayStrike = strikes.find(s => s.dateCompleted === today);
  const currentProgress = todayStrike?.progress || 0;
  const totalCompletedDays = strikes.filter(s => target ? (s.progress || 0) >= target : true).length;

  const handleAdd = async () => {
    const hitNewLevel = await toggleStrike(today, 5, target);
    if (hitNewLevel) playStrikeSound();
  }
  
  const handleSubtract = async () => {
    await decrementStrike(today, 5);
  }

  if (!habit) return null;

  return (
    <div className="fixed inset-0 z-50 bg-surface-container-lowest flex flex-col pt-12 overflow-y-auto animate-in fade-in duration-300">
      <div className="px-6 flex justify-between items-center mb-8 shrink-0">
        <button onClick={onClose} className="text-on-surface-variant uppercase font-bold text-xs tracking-widest hover:text-primary p-2 -ml-2">
          ← Back
        </button>
      </div>
      
      <div className="flex-1 px-6 pb-32 flex flex-col items-center">
        <div className="flex justify-center mb-12 w-full max-w-sm">
          <DynamicGoalShape target={target} progress={currentProgress} className="w-48 h-48 opacity-90 mx-auto" />
        </div>
        
        <h1 className="text-display font-bold text-3xl sm:text-4xl text-primary text-center mb-12">
          {habit.title}
        </h1>

        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-16">
          <button onClick={handleSubtract} className="h-16 px-6 rounded-full border-2 border-surface flex items-center justify-center text-xl font-bold text-outline-variant hover:text-primary hover:border-outline-variant active:scale-95 transition-all">
            {target && target > 1 ? '-5 Units' : '-'}
          </button>
          <div className="flex flex-col items-center min-w-[100px]">
            <span className="text-display font-bold text-6xl text-primary">{totalCompletedDays}</span>
            <span className="text-xs font-bold uppercase tracking-widest text-outline-variant mt-2">Total Strikes</span>
          </div>
          <button onClick={handleAdd} className="h-16 px-6 rounded-full bg-surface-container-high flex items-center justify-center text-xl font-bold text-primary active:scale-95 transition-all shadow-ambient">
            {target && target > 1 ? '+5 Units' : '+'}
          </button>
        </div>

        {/* Minimalist Calendar */}
        <div className="w-full max-w-xs">
          <div className="flex justify-between items-center mb-4 px-2">
            <button 
              onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}
              className="text-outline-variant hover:text-primary font-bold px-3 py-1 ghost-border rounded-full text-xs transition-colors"
            >&larr;</button>
            <h3 className="text-xs font-bold uppercase tracking-widest text-outline-variant font-sans text-center">
              {viewDate.toLocaleString('default', { month: 'long' })} {viewDate.getFullYear()}
            </h3>
            <button 
              onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}
              className="text-outline-variant hover:text-primary font-bold px-3 py-1 ghost-border rounded-full text-xs transition-colors"
            >&rarr;</button>
          </div>
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
            {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
              <span key={d} className="text-[10px] text-center font-bold text-outline-variant">{d}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {Array.from({length: new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay()}).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            {Array.from({length: new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate()}).map((_, i) => {
              const day = i + 1;
              const dateStr = `${viewDate.getFullYear()}-${String(viewDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const isStruck = strikes.some(s => s.dateCompleted === dateStr);
              return (
                <div 
                  key={dateStr} 
                  className={cn(
                    "aspect-square rounded-sm transition-colors duration-500",
                    isStruck ? "bg-primary" : "bg-surface"
                  )}
                  title={dateStr}
                />
              );
            })}
          </div>
        </div>

        {/* The Log (Filtered) */}
        <div className="w-full max-w-md mt-8 border-t border-white/5 pt-12">
          <div className="flex justify-between items-center mb-8 px-2">
            <div className="w-12" /> {/* Spacer */}
            <h3 className="text-xl font-bold font-display text-primary text-center">
              Diary
            </h3>
            <Button 
              onClick={() => setIsAddingNote(true)} 
              size="sm" 
              className="bg-on-surface text-surface hover:bg-white border-0 rounded-full font-bold px-4 h-8 text-[10px] uppercase tracking-wider"
            >
              + Note
            </Button>
          </div>
          {entries.length === 0 ? (
            <p className="text-center text-outline-variant text-sm italic">No entries documented.</p>
          ) : (
            <div className="space-y-6">
              {entries.map(e => (
                <div key={e.id} className="bg-surface-container rounded-xl p-4 border border-white/5 shadow-ambient flex flex-col gap-3">
                  <div className="flex justify-between items-center opacity-80">
                    <span className="text-[10px] uppercase font-bold text-outline-variant">
                      {new Date(e.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {e.photo && (
                    <div className="aspect-[4/3] w-full bg-surface-container-high rounded bg-cover bg-center border border-white/5" style={{ backgroundImage: `url(${e.photo})`}} />
                  )}
                  {e.content && (
                    <p className="text-on-surface font-sans leading-relaxed whitespace-pre-wrap text-sm">{e.content}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isAddingNote && (
        <div className="fixed inset-0 z-[60] bg-surface-container-lowest animate-in slide-in-from-bottom duration-500">
          <CreateEntryView onDone={() => setIsAddingNote(false)} initialHabitId={habitId} />
          <button onClick={() => setIsAddingNote(false)} className="absolute top-12 left-6 text-on-surface-variant uppercase font-bold text-xs tracking-widest hover:text-primary p-2">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
