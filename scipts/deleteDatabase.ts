import * as FileSystem from 'expo-file-system';

export const deleteDatabase = async () => {
    const dbPath = FileSystem.documentDirectory + 'SQLite/alarmsDatabase.db';

  try {
    const info = await FileSystem.getInfoAsync(dbPath);
    if (info.exists) {
      await FileSystem.deleteAsync(dbPath);
      console.log('Database deleted');
    } else {
      console.log('Database file does not exist:', dbPath);
    }
  } catch (error) {
    console.error('Error deleting database:', error);
  }
};

