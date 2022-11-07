import React from 'react';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import SquareSvg from '@app/assets/svg/SquareSvg';
import RoundIconButton from '@app/src/components/RoundIconButton';
import {useAsyncEffect} from '@app/src/hooks/useAsyncEffect';
import {
  addTask,
  addTasks,
  Task,
  updateTaskEndDate,
} from '@app/src/store/tasksSlice';
import {getDiffInSeconds} from '@app/src/utils/time';

import * as SQLiteActions from '../../services/sqlite';
import TimerDayCard from './components/TimerDayCard';
import useTimer from './hooks/useTimer';
import * as Style from './TimerScreen.style';
import {createNewTask, formatTasks} from './TimerScreen.utils';

const TimerScreen = () => {
  const [taskName, setTaskName] = React.useState<string | undefined>();
  const [error, setError] = React.useState<string | undefined>();
  const [runningTask, setRunningTask] = React.useState<Task>();

  const {timer, isRunning, startTimer, stopTimer} = useTimer();

  const dispatch = useDispatch();

  const tasks = useSelector(({tasksSlice}): Task[] => tasksSlice.tasks);
  const lastTask = React.useMemo(() => tasks[tasks.length - 1], [tasks]);
  const data = React.useMemo(() => formatTasks(tasks), [tasks]);

  const handleInput = (value: string) => setTaskName(value);
  const handleStart = React.useCallback(
    async (name?: string) => {
      const nameToSet = taskName || name;

      if (!nameToSet) {
        setError('Error');
        return;
      }

      if (!runningTask) {
        const newTask = createNewTask(nameToSet);
        dispatch(addTask(newTask));
        await SQLiteActions.addTask(newTask);
        setError(undefined);
      }
    },
    [dispatch, runningTask, taskName],
  );
  const handleStop = async () => {
    if (runningTask) {
      const dateString = new Date().toString();
      dispatch(updateTaskEndDate({id: runningTask.id, endDate: dateString}));
      await SQLiteActions.updateTaskEndDate(runningTask.id, dateString);
      setTaskName(undefined);
    }
  };
  const startButtonOnPress = React.useCallback(
    (name: string) => {
      if (!runningTask) {
        handleStart(name);
        setTaskName(name);
      }
    },
    [handleStart, runningTask],
  );

  const renderItem = React.useCallback(
    ({item}: {item: Task[]}) =>
      item[0] ? (
        <TimerDayCard
          label={item[0].startDate}
          tasks={item}
          startButtonOnPress={startButtonOnPress}
        />
      ) : null,
    [startButtonOnPress],
  );

  const ListEmptyComponent = React.useMemo(
    () => (
      <Style.EmptyBox>
        <Style.EmptyBoxTitle>No tasks</Style.EmptyBoxTitle>
      </Style.EmptyBox>
    ),
    [],
  );

  React.useEffect(() => {
    if (lastTask && !lastTask?.endDate) {
      const diff = getDiffInSeconds(lastTask.startDate, new Date().toString());
      startTimer(diff);
      setRunningTask(lastTask);
      return;
    }

    if (lastTask?.endDate) {
      stopTimer();
      setRunningTask(undefined);
    }
  }, [lastTask, startTimer, stopTimer]);

  useAsyncEffect(async () => {
    const tasksFromSqlDB = await SQLiteActions.getAllTasks();
    dispatch(addTasks(tasksFromSqlDB));
  }, []);

  return (
    <Style.ListBox>
      <FlatList<Task[]>
        data={data}
        contentContainerStyle={{flexGrow: 1}}
        keyExtractor={item => `${item[0]?.id}`}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        bounces={false}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        ListHeaderComponent={
          <Style.Panel>
            {isRunning ? (
              <>
                <Style.TaskTitle>{runningTask?.name}</Style.TaskTitle>
                <Style.Counter>{timer}</Style.Counter>
                <RoundIconButton
                  icon={SquareSvg}
                  onPress={handleStop}
                  color="red"
                />
              </>
            ) : (
              <>
                <Style.NameField
                  value={taskName}
                  onChange={handleInput}
                  placeholder="What are you doing?"
                  isError={error}
                />
                <RoundIconButton
                  icon={Style.PlayIcon}
                  onPress={handleStart}
                  color="green"
                />
              </>
            )}
          </Style.Panel>
        }
      />
    </Style.ListBox>
  );
};

export default TimerScreen;
