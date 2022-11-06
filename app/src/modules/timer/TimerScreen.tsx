import { format, isSameDay } from 'date-fns';
import React from 'react';
import { Button, FlatList, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { useAsyncEffect } from '@app/src/hooks/useAsyncEffect';
import { RootState } from '@app/src/store';
import { addTask, addTasks, Task, TasksState, updateTaskEndDate } from '@app/src/store/tasksSlice';
import { dateStringToFormat, getDiffInSeconds, secondsToFormat } from '@app/src/utils/time';

import * as SQLiteActions from '../../services/sqlite';
import useTimer from './hooks/useTimer';

const TimerScreen = () => {
  const [taskName, setTaskName] = React.useState<string | undefined>();
  const [error, setError] = React.useState<string | undefined>();
  const [runningTask, setRunningTask] = React.useState<Task>();

  const {timer, startTimer, stopTimer} = useTimer();

  const dispatch = useDispatch();

  const tasks = useSelector(({tasksSlice}): Task[] => tasksSlice.tasks);
  const lastTask = React.useMemo(() => tasks[tasks.length - 1], [tasks]);

  const handleStart = async () => {
    if (!taskName) {
      setError('Error');
      return;
    }
    if (!runningTask) {
      const newTask = createNewTask(taskName);
      dispatch(addTask(newTask));
      await SQLiteActions.addTask(newTask);
    }
  };

  const handleStop = async () => {
    if (runningTask) {
      const dateString = new Date().toString();
      dispatch(updateTaskEndDate({id: runningTask.id, endDate: dateString}));
      await SQLiteActions.updateTaskEndDate(runningTask.id, dateString);
    }
  };

  React.useEffect(() => {
    if (!tasks.length) {
      return;
    }

    if (!lastTask.endDate) {
      const diff = getDiffInSeconds(lastTask.startDate, new Date().toString());
      startTimer(diff);
      setRunningTask(lastTask);
      return;
    }

    if (lastTask.endDate) {
      stopTimer();
      setRunningTask(undefined);
      setTaskName(undefined);
    }
  }, [tasks, lastTask]);

  useAsyncEffect(async () => {
    if (!tasks.length) {
      const tasksFromSqlDB = await SQLiteActions.getAllTasks();
      dispatch(addTasks(tasksFromSqlDB));
    }
  }, [tasks, tasks]);

  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={{flex: 1}}
          onChangeText={value => setTaskName(value)}
          value={taskName}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
        <Text>{error}</Text>
        <Button title="start" onPress={handleStart} />
        <Button title="stop" onPress={handleStop} />
      </View>
      <Text>{timer}</Text>

      <FlatList<Task[]>
        data={formatTasks(tasks)}
        renderItem={({item}) => (
          <View style={{marginBottom: 50}}>
            <Text>Day: {dateStringToFormat(item[0].startDate)}</Text>
            {item.map(t => {
              return (
                <View style={{flexDirection: 'row'}}>
                  <Text style={{marginRight: 20}}>{t?.name}</Text>
                  <Text>{secondsToFormat(t?.trackedTime)}</Text>
                </View>
              );
            })}
          </View>
        )}
      />
    </View>
  );
};

export default TimerScreen;

const createNewTask = (name: string) => {
  return {
    id: uuidv4(),
    name,
    startDate: new Date(1995, 11, 17).toString(),
  };
};
const formatTasks = (tasks: Task[]) => {
  return [...tasks].reduce(
    (accumulator, currentValue, currentIndex, array) => {
      const taskWithTrackedTime = addTrackedTimeToTask(currentValue);
      const accumulatorLastItem = accumulator[accumulator.length - 1];

      if (!taskWithTrackedTime) {
        return accumulator;
      }

      if (
        isSameDay(
          Date.parse(accumulatorLastItem[0].startDate),
          Date.parse(taskWithTrackedTime.startDate),
        )
      ) {
        return [
          ...accumulator.slice(0, accumulator.length - 1),
          [...accumulatorLastItem, taskWithTrackedTime],
        ];
      }

      return [...accumulator, [taskWithTrackedTime]];
    },
    [[tasks[0]]],
  );
};
const addTrackedTimeToTask = (task: Task) => {
  if (!task?.startDate || !task?.endDate) {
    return;
  }
  return {
    ...task,
    trackedTime: getDiffInSeconds(task.startDate, task.endDate),
  };
};
