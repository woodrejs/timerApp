import {isToday, isYesterday} from 'date-fns';

import {Task} from '@app/src/store/tasksSlice';
import {
  dateStringToFormat,
  getDiffInSeconds,
  secondsToFormat,
} from '@app/src/utils/time';

export const getLabel = (label: string) => {
  if (isToday(Date.parse(label))) {
    return 'Today';
  }
  if (isYesterday(Date.parse(label))) {
    return 'Yesterday';
  }

  return dateStringToFormat(label);
};
export const getTrackedTimeLabel = (tasks: Task[]) => {
  const trackedTime = tasks.reduce((accumulator, currentValue) => {
    if (currentValue?.trackedTime) {
      return accumulator + currentValue.trackedTime;
    }
    return accumulator;
  }, 0);

  return secondsToFormat(trackedTime);
};
export const addTrackedTimeToTask = (tasks: Task[]) => {
  return tasks.map(task => {
    return {
      ...task,
      trackedTime: task.endDate
        ? getDiffInSeconds(task.startDate, task.endDate)
        : undefined,
    };
  });
};
