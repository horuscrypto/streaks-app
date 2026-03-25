import { useState } from 'react';
import { NavigationBar } from './components/NavigationBar';
import { HabitList } from './components/HabitList';
import { CreateHabitView } from './components/CreateHabitView';
import { SettingsView } from './components/SettingsView';
import { JournalView } from './components/JournalView';

type Tab = 'home' | 'create' | 'journal' | 'settings';

function App() {
  const [currentTab, setCurrentTab] = useState<Tab>('home');

  return (
    <div className="min-h-[100dvh] bg-surface-container-lowest text-on-surface selection:bg-primary/20">
      <main>
        {currentTab === 'home' && <HabitList />}
        {currentTab === 'journal' && <JournalView />}
        {currentTab === 'create' && (
          <CreateHabitView onDone={() => setCurrentTab('home')} />
        )}
        {currentTab === 'settings' && <SettingsView />}
      </main>

      <NavigationBar currentTab={currentTab} onChange={setCurrentTab} />
    </div>
  );
}

export default App;
