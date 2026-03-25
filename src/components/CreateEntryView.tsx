import { useState, useRef } from 'react';
import { useHabits } from '../hooks/useHabits';
import { useJournal } from '../hooks/useJournal';
import { Button } from './ui/Button';

export function CreateEntryView({ onDone, initialHabitId }: { onDone: () => void, initialHabitId?: string }) {
  const { habits } = useHabits();
  const { addEntry } = useJournal();
  
  const activeHabits = habits.filter(h => h.active);
  
  const [habitId, setHabitId] = useState(initialHabitId || (activeHabits.length > 0 ? activeHabits[0].id : ''));
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState<File | undefined>();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!habitId) return;
    if (!content.trim() && !photo) return;
    
    setSubmitting(true);
    await addEntry(habitId, content, photo);
    setSubmitting(false);
    onDone();
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="pt-20 px-6 pb-32 min-h-[80vh] flex flex-col max-w-lg mx-auto animate-in fade-in">
      <h2 className="text-display font-bold text-4xl mb-8 text-primary tracking-tight">
        New Diary Entry
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-8 flex flex-col flex-1">
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-outline-variant mb-2 block">Habit Target</label>
          <select 
            value={habitId} 
            onChange={e => setHabitId(e.target.value)}
            className="w-full bg-surface-container-low border-b-2 border-outline-variant p-4 text-on-surface focus:outline-none focus:border-primary transition-colors appearance-none rounded-t-lg"
          >
            {activeHabits.map(h => (
              <option key={h.id} value={h.id}>{h.title}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 flex flex-col">
          <label className="text-xs font-bold uppercase tracking-widest text-outline-variant mb-2 block">Note (Optional)</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            className="flex-1 min-h-[150px] w-full bg-surface-container-low border border-transparent focus:border-outline-variant p-4 text-on-surface resize-none rounded-xl"
            placeholder="Document your failure or success..."
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-outline-variant mb-2 block">Polaroid (Optional)</label>
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleFile}
          />
          {photoPreview ? (
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-white/5">
               <img src={photoPreview} className="w-full h-full object-cover" alt="preview" />
               <button type="button" onClick={() => { setPhoto(undefined); setPhotoPreview(null); }} className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center backdrop-blur">✕</button>
            </div>
          ) : (
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-24 border-2 border-dashed border-outline-variant rounded-xl flex items-center justify-center text-outline-variant hover:text-primary hover:border-primary transition-colors"
            >
              + Attach Photo
            </button>
          )}
        </div>

        <div className="pt-4 flex gap-4">
          <Button type="button" onClick={onDone} className="flex-1 bg-surface-container text-on-surface">Cancel</Button>
          <Button type="submit" className="flex-1" disabled={submitting || !habitId || (!content.trim() && !photo)}>
            {submitting ? 'Saving...' : 'Log It'}
          </Button>
        </div>
      </form>
    </div>
  );
}
