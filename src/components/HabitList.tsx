import { useState } from 'react';
import { useHabits, useStrikes } from '../hooks/useHabits';
import type { Habit } from '../db/db';
import { Card } from './ui/Card';
import { cn } from './ui/Button';
import { useSound } from '../hooks/useSound';
import { HabitDetailView } from './HabitDetailView';
import { SocraticFooter } from './ui/SocraticFooter';
import { getGoalFromTitle } from '../utils/goalParser';
import { DynamicGoalShape } from './ui/DynamicGoalShape';
import { useTranslation } from '../hooks/useTranslation';

function HabitItem({ habit, index, listLayout, onClick }: { habit: Habit, index: number, listLayout: 'extended' | 'compact', onClick: () => void }) {
  const { strikes, toggleStrike } = useStrikes(habit.id);
  const { playStrikeSound } = useSound();
  const { t } = useTranslation();
  const today = new Date().toISOString().split('T')[0];
  
  const target = getGoalFromTitle(habit.title);
  const todayStrike = strikes.find(s => s.dateCompleted === today);
  const currentProgress = todayStrike?.progress || 0;
  const isCompletedToday = target ? currentProgress >= target : !!todayStrike;
  const streakCount = strikes.filter(s => target ? (s.progress || 0) >= target : true).length;

  const handleFastStrike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const hitNewLevel = await toggleStrike(today, 5, target);
    if (hitNewLevel) playStrikeSound();
  };

  if (listLayout === 'compact') {
    return (
      <Card onClick={onClick} className={cn("cursor-pointer flex flex-col justify-between p-4 group min-h-[120px] border border-transparent hover:border-outline-variant transition-all duration-300 active:scale-[0.98]", index % 2 !== 0 ? "bg-surface-container-low" : "bg-surface-container")}>
        <div className="flex items-start justify-between">
          <div className="flex gap-2 items-center">
            <button onClick={handleFastStrike} className="w-9 h-9 shrink-0 hover:scale-105 active:scale-90 transition-transform" title={target ? "+5" : "Strike"}>
              <DynamicGoalShape target={target} progress={currentProgress} />
            </button>
            {target && target > 1 && !isCompletedToday && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleStrike(today, target, target).then(played => played && playStrikeSound());
                }}
                className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-lg active:scale-90 transition-transform shadow-ambient"
                title="Full Strike"
              >
                +
              </button>
            )}
          </div>
          <span className="text-xl font-bold font-display text-on-surface-variant group-hover:text-primary transition-colors">{streakCount}</span>
        </div>
        <span className={cn("font-display text-lg truncate transition-all duration-500 mt-2", isCompletedToday ? "text-primary opacity-30 line-through" : "text-primary")}>{habit.title}</span>
      </Card>
    );
  }

  return (
    <Card onClick={onClick} className={cn("cursor-pointer group relative overflow-hidden flex items-center justify-between min-h-[140px] px-6 py-4 transition-all duration-300 active:scale-[0.99]", index % 2 !== 0 ? "bg-surface-container-low" : "bg-surface-container")}>
      <div className="flex flex-col z-10 flex-1 pr-4">
        <h3 className={cn("font-display text-2xl sm:text-3xl transition-all duration-300", isCompletedToday ? "text-primary opacity-30 line-through" : "text-primary group-hover:pl-2")}>
          {habit.title}
        </h3>
      </div>
      <div className="z-10 flex items-center gap-6 shrink-0">
        <div className="flex flex-col items-end hidden sm:flex">
          <span className="text-display font-bold text-5xl tracking-tighter text-on-surface-variant group-hover:text-primary transition-colors">{streakCount}</span>
          <span className="text-xs font-bold font-sans uppercase text-outline-variant tracking-widest">{t('habit_strikes_label')}</span>
        </div>
        <div className="flex items-center gap-3">
          {target && target > 1 && !isCompletedToday && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleStrike(today, target, target).then(played => played && playStrikeSound());
              }}
              className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-2xl active:scale-90 transition-transform shadow-ambient"
            >
              +
            </button>
          )}
          <button onClick={handleFastStrike} className="w-16 h-16 active:scale-95 transition-transform shrink-0">
            <DynamicGoalShape target={target} progress={currentProgress} />
          </button>
        </div>
      </div>
    </Card>
  );
}

export function HabitList() {
  const { habits } = useHabits();
  const { t } = useTranslation();
  const [listLayout, setListLayout] = useState<'extended' | 'compact'>('compact');
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);

  if (selectedHabitId) {
    return <HabitDetailView habitId={selectedHabitId} onClose={() => setSelectedHabitId(null)} />;
  }

  if (!habits || habits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-6">
        <h2 className="font-display font-bold text-3xl mb-4 text-on-surface-variant">{t('void_title')}</h2>
        <p className="font-sans text-outline-variant max-w-sm">{t('void_subtitle')}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-32 pt-12 px-4 sm:px-6 max-w-2xl mx-auto w-full">
      <header className="mb-6">
        <h1 className="font-display font-bold text-5xl tracking-tight text-primary">{t('momentum_title')}</h1>
        <p className="font-sans text-on-surface-variant mt-2 text-lg">{t('momentum_subtitle')}</p>
        
        <div className="flex gap-2 mt-8 p-1 bg-surface-container-high rounded-full w-fit">
          <button onClick={() => setListLayout('extended')} className={cn("px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors", listLayout === 'extended' ? "bg-primary text-on-primary" : "text-outline-variant hover:text-primary")}>{t('habit_layout_extended')}</button>
          <button onClick={() => setListLayout('compact')} className={cn("px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors", listLayout === 'compact' ? "bg-primary text-on-primary" : "text-outline-variant hover:text-primary")}>{t('habit_layout_compact')}</button>
        </div>
      </header>
      <div className={cn(
        listLayout === 'compact' ? "grid grid-cols-2 gap-4" : "flex flex-col space-y-4 sm:space-y-6"
      )}>
        {habits.map((habit, idx) => (
          <HabitItem key={habit.id} habit={habit} index={idx} listLayout={listLayout} onClick={() => setSelectedHabitId(habit.id)} />
        ))}
      </div>
      <SocraticFooter />
    </div>
  );
}

