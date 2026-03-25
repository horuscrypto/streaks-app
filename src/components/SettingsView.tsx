import { useState, useEffect } from 'react';
import { useSound, type AudioProfileName } from '../hooks/useSound';
import { cn } from './ui/Button';

const PROFILES: { id: AudioProfileName; label: string; desc: string }[] = [
  { id: 'mute', label: 'Silenced', desc: 'No sound, pure silent operation' },
  { id: 'soft-ding', label: 'Soft Ding', desc: 'A minimal, gentle tap' },
  { id: 'wood-tap', label: 'Wooden Tap', desc: 'A very dry, organic woody click' },
  { id: 'subtle-chime', label: 'Subtle Chime', desc: 'A clean, barely-there sine wave chime' },
];

export function SettingsView() {
  const [profile, setProfile] = useState<AudioProfileName>('mute');
  const [remindersEnabled, setRemindersEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState('20:00');
  const { playStrikeSound } = useSound();

  useEffect(() => {
    const saved = localStorage.getItem('strike_audio_profile') as AudioProfileName;
    if (saved) setProfile(saved);
    
    const savedReminders = localStorage.getItem('strike_reminders') === 'true';
    if (savedReminders) setRemindersEnabled(true);

    const savedTime = localStorage.getItem('strike_reminder_time');
    if (savedTime) setReminderTime(savedTime);
  }, []);

  const handleSelect = (id: AudioProfileName) => {
    setProfile(id);
    localStorage.setItem('strike_audio_profile', id);
    setTimeout(() => playStrikeSound(), 50); 
  };

  return (
    <div className="pt-20 px-6 pb-32 min-h-[80vh] flex flex-col max-w-lg mx-auto">
      <h2 className="text-display font-bold text-4xl mb-4 text-primary tracking-tight">
        Settings
      </h2>
      <p className="text-on-surface-variant mb-12 text-lg">
        Configure your monolithic experience.
      </p>

      <div className="space-y-12">
        <section>
          <h3 className="text-xs font-bold uppercase tracking-widest text-outline-variant mb-6">Acoustic Feedback</h3>
          <div className="space-y-3">
            {PROFILES.map(p => (
              <button
                key={p.id}
                onClick={() => handleSelect(p.id)}
                className={cn(
                  "w-full text-left p-5 rounded-2xl border transition-all active:scale-[0.98]",
                  profile === p.id 
                    ? "bg-surface border-primary shadow-ambient" 
                    : "bg-surface-container-low border-transparent hover:border-outline-variant"
                )}
              >
                <div className="flex justify-between items-center">
                  <span className={cn("font-display text-xl", profile === p.id ? "text-primary" : "text-on-surface")}>{p.label}</span>
                  {profile === p.id && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                </div>
                <p className="text-on-surface-variant text-sm mt-1">{p.desc}</p>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-widest text-outline-variant mb-6">Reminders</h3>
          <div className="bg-surface-container-low p-6 rounded-3xl border border-transparent hover:border-outline-variant transition-colors flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-display text-xl text-primary block">Daily Rituals</span>
                <p className="text-on-surface-variant text-sm mt-1">Get a nudge to strike the monolith.</p>
              </div>
              <button 
                onClick={async () => {
                  if (Notification.permission !== 'granted') {
                    const status = await Notification.requestPermission();
                    if (status !== 'granted') return;
                  }
                  const newValue = !remindersEnabled;
                  setRemindersEnabled(newValue);
                  localStorage.setItem('strike_reminders', String(newValue));
                }}
                className={cn(
                  "w-14 h-8 rounded-full p-1 transition-colors duration-300 flex items-center shadow-inner",
                  remindersEnabled ? "bg-primary" : "bg-outline-variant"
                )}
              >
                <div className={cn("w-6 h-6 rounded-full bg-white transition-transform duration-300 shadow-ambient", remindersEnabled ? "translate-x-6" : "translate-x-0")} />
              </button>
            </div>

            {remindersEnabled && (
              <div className="flex justify-between items-center pt-6 border-t border-white/5 animate-in slide-in-from-top-4 duration-300">
                <span className="text-xs font-bold uppercase tracking-widest text-outline-variant">Remind Me At</span>
                <input 
                  type="time" 
                  value={reminderTime} 
                  onChange={e => {
                    setReminderTime(e.target.value);
                    localStorage.setItem('strike_reminder_time', e.target.value);
                  }}
                  className="bg-surface-container-high text-primary font-bold text-xl px-4 py-2 rounded-xl focus:outline-none focus:ring-2 ring-primary/20 appearance-none"
                />
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
