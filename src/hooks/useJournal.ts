import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db';

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const scale = Math.min(MAX_WIDTH / img.width, 1);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('No canvas context');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        resolve(dataUrl);
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
}

export function useJournal(habitId?: string) {
  const entries = useLiveQuery(async () => {
    let collection = db.journal.orderBy('timestamp').reverse();
    if (habitId) {
      const all = await collection.toArray();
      return all.filter(e => e.habitId === habitId);
    }
    return collection.toArray();
  }, [habitId]) || [];

  const addEntry = async (hId: string, content: string, file?: File) => {
    let photoBase64: string | undefined = undefined;
    if (file) {
      photoBase64 = await compressImage(file);
    }

    await db.journal.add({
      id: crypto.randomUUID(),
      habitId: hId,
      timestamp: Date.now(),
      content,
      photo: photoBase64
    });
  };

  const deleteEntry = async (id: string) => {
    await db.journal.delete(id);
  };

  return { entries, addEntry, deleteEntry };
}
