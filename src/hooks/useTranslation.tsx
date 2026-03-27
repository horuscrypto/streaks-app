import { useState, useEffect, createContext, useContext, type ReactNode } from 'react';

export type Language = 'en' | 'it' | 'pt';

interface Translations {
  [key: string]: {
    [K in Language]: string;
  };
}

const translations: Translations = {
  // Navigation
  nav_momentum: { en: 'Momentum', it: 'Momento', pt: 'Momentum' },
  nav_diary: { en: 'Diary', it: 'Diario', pt: 'Diário' },
  nav_new: { en: 'New', it: 'Nuovo', pt: 'Novo' },
  nav_settings: { en: 'Settings', it: 'Impostazioni', pt: 'Ajustes' },

  // Settings
  settings_title: { en: 'Settings', it: 'Impostazioni', pt: 'Ajustes' },
  settings_subtitle: { en: 'Configure your monolithic experience.', it: 'Configura la tua esperienza monolitica.', pt: 'Configure sua experiência monolítica.' },
  settings_acoustic: { en: 'Acoustic Feedback', it: 'Feedback Acustico', pt: 'Feedback Acústico' },
  settings_reminders: { en: 'Reminders', it: 'Promemoria', pt: 'Lembretes' },
  settings_daily_rituals: { en: 'Daily Rituals', it: 'Rituali Quotidiani', pt: 'Rituais Diários' },
  settings_nudge: { en: 'Get a nudge to strike the monolith.', it: 'Ricevi un avviso per colpire il monolite.', pt: 'Receba um lembrete para registrar sua atividade.' },
  settings_remind_at: { en: 'Remind Me At', it: 'Avvisami alle', pt: 'Lembrar-me às' },
  settings_language: { en: 'Language', it: 'Lingua', pt: 'Idioma' },

  // Audio Profiles
  audio_mute: { en: 'Silenced', it: 'Silenzioso', pt: 'Silencioso' },
  audio_mute_desc: { en: 'No sound, pure silent operation', it: 'Nessun suono, operazione silenziosa', pt: 'Sem som, operação silenciosa' },
  audio_ding: { en: 'Soft Ding', it: 'Rintocco Leggero', pt: 'Toque Suave' },
  audio_ding_desc: { en: 'A minimal, gentle tap', it: 'Un tocco minimo e delicato', pt: 'Um toque mínimo e gentil' },
  audio_wood: { en: 'Wooden Tap', it: 'Tocco di Legno', pt: 'Toque de Madeira' },
  audio_wood_desc: { en: 'A very dry, organic woody click', it: 'Un clic legnoso molto secco e organico', pt: 'Um clique de madeira seco e orgânico' },
  audio_chime: { en: 'Subtle Chime', it: 'Rintocco Sottile', pt: 'Carrilhão Sutil' },
  audio_chime_desc: { en: 'A clean, barely-there sine wave chime', it: 'Un rintocco a onda sinusoidale pulito', pt: 'Um carrilhão de onda senoidal limpo' },

  // Habit List
  habit_list_title: { en: 'Momentum', it: 'Momento', pt: 'Momentum' },
  habit_list_subtitle: { en: 'Your active streaks.', it: 'Le tue serie attive.', pt: 'Suas sequências ativas.' },
  habit_list_empty: { en: 'No active streaks. Create one to begin.', it: 'Nessuna serie attiva. Creane una per iniziare.', pt: 'Nenhuma sequência ativa. Crie uma para começar.' },
  habit_list_add: { en: 'Add Habit', it: 'Aggiungi Abitudine', pt: 'Adicionar Hábito' },

  // Habit Detail
  habit_back: { en: 'Back', it: 'Indietro', pt: 'Voltar' },
  habit_total_strikes: { en: 'Total Strikes', it: 'Colpi Totali', pt: 'Registros Totais' },
  habit_diary_section: { en: 'Diary', it: 'Diario', pt: 'Diário' },
  habit_no_entries: { en: 'No entries documented.', it: 'Nessuna voce documentata.', pt: 'Nenhuma entrada documentada.' },
  habit_add_note: { en: '+ Note', it: '+ Nota', pt: '+ Nota' },

  // Create Habit
  create_habit_forge: { en: 'Forge a New Monolith', it: 'Forgia un Nuovo Monolite', pt: 'Forjar um Novo Monolito' },
  create_habit_extract: { en: 'Extract numbers to create fractional goals.', it: 'Estrai numeri per creare obiettivi frazionari.', pt: 'Extraia números para criar metas fracionárias.' },
  create_habit_placeholder: { en: 'e.g. Meditate for 15 minutes', it: 'es. Meditare per 15 minuti', pt: 'ex: Meditar por 15 minutos' },
  create_habit_button: { en: 'Initialize Strike', it: 'Inizializza Serie', pt: 'Inicializar Sequência' },
  create_habit_cancel: { en: 'Cancel', it: 'Annulla', pt: 'Cancelar' },

  // Create Entry
  create_entry_title: { en: 'New Diary Entry', it: 'Nuova Voce di Diario', pt: 'Nova Entrada no Diário' },
  create_entry_target: { en: 'Habit Target', it: 'Obiettivo Abitudine', pt: 'Alvo do Hábito' },
  create_entry_note: { en: 'Note (Optional)', it: 'Nota (Opzionale)', pt: 'Nota (Opcional)' },
  create_entry_placeholder: { en: 'Document your failure or success...', it: 'Documenta il tuo fallimento o successo...', pt: 'Documente seu fracasso ou sucesso...' },
  create_entry_photo: { en: 'Polaroid (Optional)', it: 'Polaroid (Opzionale)', pt: 'Polaroid (Opcional)' },
  create_entry_attach: { en: '+ Attach Photo', it: '+ Allega Foto', pt: '+ Anexar Foto' },
  create_entry_submit: { en: 'Log It', it: 'Registra', pt: 'Registrar' },
  create_entry_saving: { en: 'Saving...', it: 'Salvataggio...', pt: 'Salvando...' },

  // Habit List / Momentum
  momentum_title: { en: 'Momentum', it: 'Momento', pt: 'Momentum' },
  momentum_subtitle: { en: 'Strike the monolith daily.', it: 'Colpisci il monolite ogni giorno.', pt: 'Registre sua atividade diariamente.' },
  void_title: { en: 'The Void Awaits.', it: 'Il Vuoto Attende.', pt: 'O Vazio Aguarda.' },
  void_subtitle: { en: 'Tap the plus below to forge your first monolithic habit.', it: 'Tocca il più sotto per forgiare la tua prima abitudine.', pt: 'Toque no mais abaixo para forjar seu primeiro hábito.' },
  habit_strikes_label: { en: 'Strikes', it: 'Colpi', pt: 'Registros' },
  habit_layout_extended: { en: 'Extended', it: 'Esteso', pt: 'Estendido' },
  habit_layout_compact: { en: 'Compact', it: 'Compatto', pt: 'Compacto' },
  journal_title: { en: 'Diary', it: 'Diario', pt: 'Diário' },
  journal_subtitle: { en: 'Document your descent.', it: 'Documenta la tua discesa.', pt: 'Documente sua jornada.' },
  journal_empty: { en: 'Nothing logged yet.', it: 'Niente di registrato ancora.', pt: 'Nada registrado ainda.' },
  journal_unknown: { en: 'Unknown Strike', it: 'Serie Sconosciuta', pt: 'Sequência Desconhecida' },
};

type TranslationContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('strike_language') as Language;
    if (saved && ['en', 'it', 'pt'].includes(saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('strike_language', lang);
  };

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
