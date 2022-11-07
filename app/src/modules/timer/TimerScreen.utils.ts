import {Task} from 'app/src/store/tasksSlice';
import {isSameDay} from 'date-fns';
import {v4 as uuidv4} from 'uuid';

export const createNewTask = (name: string) => {
  return {
    id: uuidv4(),
    name,
    startDate: new Date().toString(),
  };
};
export const formatTasks = (tasks: Task[]) => {
  return [...tasks].reduce<Task[][]>((accumulator, currentValue) => {
    const lastAccItem = accumulator[accumulator.length - 1];

    if (!currentValue?.endDate) {
      return accumulator;
    }

    if (!lastAccItem?.[0]) {
      return [[currentValue]];
    }

    if (
      isSameDay(
        Date.parse(lastAccItem?.[0]?.startDate),
        Date.parse(currentValue.startDate),
      )
    ) {
      return [
        ...accumulator.slice(0, accumulator.length - 1),
        [...lastAccItem, currentValue],
      ];
    }

    return accumulator;
  }, []);
};
