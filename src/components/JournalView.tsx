import { useState } from 'react';
import { useJournal } from '../hooks/useJournal';
import { useHabits } from '../hooks/useHabits';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { CreateEntryView } from './CreateEntryView';
import { useTranslation } from '../hooks/useTranslation';

export function JournalView() {
  const { entries, deleteEntry } = useJournal();
  const { habits } = useHabits();
  const { t } = useTranslation();
  const [isCreating, setIsCreating] = useState(false);

  if (isCreating) {
    return <CreateEntryView onDone={() => setIsCreating(false)} />;
  }

  const getHabitTitle = (id: string) => {
    return habits.find(h => h.id === id)?.title || t('journal_unknown');
  };

  return (
    <div className="pt-20 px-6 pb-32 min-h-[80vh] flex flex-col max-w-lg mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-display font-bold text-4xl mb-4 text-primary tracking-tight">
            {t('journal_title')}
          </h2>
          <p className="text-on-surface-variant text-lg">
            {t('journal_subtitle')}
          </p>
        </div>
        <Button onClick={() => setIsCreating(true)} size="sm" className="mb-2 bg-on-surface text-surface hover:bg-white border-0 rounded-full font-bold px-6">
          {t('habit_add_note')}
        </Button>
      </div>

      {entries.length === 0 ? (
        <div className="text-center text-outline-variant py-12 border border-dashed border-outline-variant rounded-xl">
          {t('journal_empty')}
        </div>
      ) : (
        <div className="space-y-8">
          {entries.map(e => (
            <Card key={e.id} className="bg-surface group">
              <div className="flex justify-between items-start mb-6 gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary truncate max-w-[60%]">
                  {getHabitTitle(e.habitId)}
                </span>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[10px] uppercase font-bold text-outline-variant">
                    {new Date(e.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <button 
                    onClick={() => deleteEntry(e.id)} 
                    className="text-outline-variant hover:text-red-500 transition-colors bg-surface-container rounded-full w-6 h-6 flex items-center justify-center opacity-50 hover:opacity-100"
                    title="Delete"
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              {e.photo && (
                <div className="mb-4 aspect-[4/3] w-full bg-surface-container-high rounded bg-cover bg-center border border-white/5 shadow-ambient" style={{ backgroundImage: `url(${e.photo})`}} />
              )}
              
              {e.content && (
                <p className="text-on-surface font-sans leading-relaxed whitespace-pre-wrap">{e.content}</p>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
