import { differenceInSeconds } from 'date-fns';
import React from 'react';
import { Button, FlatList, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@app/src/store';
import { addTask, Task, updateTaskEndDate } from '@app/src/store/tasksSlice';

import useTimer from './hooks/useTimer';

const TimerScreen = () => {
  const [taskName, setTaskName] = React.useState<string | undefined>();
  const [runningTask, setRunningTask] = React.useState<Task>();

  const dispatch = useDispatch();
  const {timer, startTimer, stopTimer} = useTimer();

  const tasks = useSelector(({tasksSlice}): RootState => tasksSlice.tasks);
  const lastTask = React.useMemo(() => tasks[tasks.length - 1], [tasks]);

  const handleStart = () => {
    if (taskName && !runningTask) {
      dispatch(addTask(taskName));
    }
  };

  const handleStop = () => {
    if (runningTask) {
      dispatch(updateTaskEndDate(runningTask.id));
    }
  };

  React.useEffect(() => {
    if (!tasks.length) {
      return;
    }

    if (!lastTask.endDate) {
      const diff = getDiffInSeconds(lastTask.endDate);
      startTimer(diff);
      setRunningTask(lastTask);
      return;
    }

    if (lastTask.endDate) {
      stopTimer();
      setRunningTask(undefined);
      setTaskName(undefined);
    }
  }, [tasks, lastTask, setRunningTask]);

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
        <Button title="start" onPress={handleStart} />
        <Button title="stop" onPress={handleStop} />
      </View>
      <Text>{timer}</Text>

      <FlatList<Task>
        data={tasks}
        renderItem={({item}) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default TimerScreen;

const getDiffInSeconds = (startDate: Date) =>
  differenceInSeconds(startDate, new Date()) * -1;
