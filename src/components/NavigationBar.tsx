import { Home, PlusSquare, BookOpen, Settings } from 'lucide-react';
import { cn } from './ui/Button';
import { useTranslation } from '../hooks/useTranslation';

interface NavProps {
  currentTab: 'home' | 'create' | 'journal' | 'settings';
  onChange: (tab: 'home' | 'create' | 'journal' | 'settings') => void;
}

export function NavigationBar({ currentTab, onChange }: NavProps) {
  const { t } = useTranslation();
  const tabs = [
    { id: 'home', icon: Home, label: t('nav_momentum') },
    { id: 'journal', icon: BookOpen, label: t('nav_diary') },
    { id: 'create', icon: PlusSquare, label: t('nav_new') },
    { id: 'settings', icon: Settings, label: t('nav_settings') }
  ] as const;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 sm:p-6 z-50 pointer-events-none">
      <nav className="glass-panel mx-auto max-w-md rounded-[2rem] px-6 py-4 flex items-center justify-between pointer-events-auto border border-white/5">
        {tabs.map(tab => {
          const isActive = currentTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id as 'home' | 'create' | 'journal' | 'settings')}
              className={cn(
                "flex flex-col items-center gap-1 transition-colors duration-300 w-16",
                isActive ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
