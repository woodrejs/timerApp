import { v4 as uuidv4 } from 'uuid';

import { createSlice } from '@reduxjs/toolkit';

import type {PayloadAction} from '@reduxjs/toolkit';

export type Task = {
  id: string;
  name: String;
  startDate: Date;
  endDate?: Date;
};

export interface TasksState {
  tasks?: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: 'tasksSlice',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const newTask = {
        id: uuidv4(),
        name: action.payload,
        startDate: new Date(),
      };

      if (state.tasks) {
        state.tasks = [...state.tasks, newTask];
      } else {
        state.tasks = [newTask];
      }
    },
    removeTask: (state, action: PayloadAction<Task['id']>) => {},
    updateTaskEndDate: (state, action: PayloadAction<Task['id']>) => {
      if (state.tasks) {
        state.tasks = state.tasks.map(task => {
          if (task.id === action.payload) {
            return {
              ...task,
              endDate: new Date(),
            };
          }

          return task;
        });
      }
    },
  },
});

export const {addTask, removeTask, updateTaskEndDate} = tasksSlice.actions;

export default tasksSlice.reducer;
