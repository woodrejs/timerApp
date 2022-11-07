import {createSlice} from '@reduxjs/toolkit';

import type {PayloadAction} from '@reduxjs/toolkit';
export type Task = {
  id: string;
  name: string;
  startDate: string;
  endDate?: string;
  trackedTime?: number;
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
    addTask: (state, action: PayloadAction<Task>) => {
      if (state.tasks) {
        state.tasks = [...state.tasks, action.payload];
      } else {
        state.tasks = [action.payload];
      }
    },
    addTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    updateTaskEndDate: (
      state,
      action: PayloadAction<{id: Task['id']; endDate: string}>,
    ) => {
      state.tasks = state.tasks?.map(task => {
        if (task.id === action.payload.id) {
          return {
            ...task,
            endDate: action.payload.endDate,
          };
        }
        return task;
      });
    },
  },
});

export const {addTask, addTasks, updateTaskEndDate} = tasksSlice.actions;

export default tasksSlice.reducer;
