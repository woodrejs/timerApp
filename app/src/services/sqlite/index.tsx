import { Task } from 'app/src/store/tasksSlice';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => null,
  error => console.log(error),
);

SQLite.enablePromise(true);

export const createTable = async () => {
  try {
    await db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS tasks (id TEXT PRIMARY KEY, name TEXT, startDate TEXT, endDate TEXT)',
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const addTask = async ({id, name, startDate}: Task) => {
  try {
    await db.transaction(tx => {
      tx.executeSql('INSERT INTO tasks (id, name, startDate) VALUES (?,?,?)', [
        id,
        name,
        startDate,
      ]);
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllTasks = async () => {
  const result: Task[] = [];
  try {
    await db.transaction(tx =>
      tx.executeSql('SELECT * FROM tasks', [], (_tx, results) => {
        for (let i = 0; i < results.rows.length; ++i) {
          result.push(results.rows.item(i));
        }
      }),
    );
  } catch (error) {
    console.log(error);
  }
  return result;
};

export const updateTaskEndDate = async (id: string, endDate: string) => {
  try {
    await db.transaction(tx => {
      tx.executeSql('UPDATE tasks SET endDate=? WHERE id=?', [endDate, id]);
    });
  } catch (error) {
    console.log(error);
  }
};
