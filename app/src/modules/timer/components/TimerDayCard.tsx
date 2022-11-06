import React from 'react';

import EyeSvg from '@app/assets/svg/EyeSvg';
import RoundIconButton from '@app/src/components/RoundIconButton';
import { useBottomModalProvider } from '@app/src/modules/modals/hooks/useBottomModal';
import { Task } from '@app/src/store/tasksSlice';
import { getDiffInSeconds, secondsToFormat } from '@app/src/utils/time';

import { ModalName } from '../../modals/hooks/useBottomModal.utils';
import * as Style from './TimerDayCard.style';
import {
    addTrackedTimeToTask, getLabel, getrackedTimeToTask, getTrackedTimeLabel
} from './TimerDayCard.utils';

interface Props {
  label: string;
  tasks: Task[];
  startButtonOnPress: (name: string) => void;
}
const TimerDayCard = (props: Props) => {
  const {openBottomModal} = useBottomModalProvider();
  const tasksWitTrackedTime = addTrackedTimeToTask(props.tasks);

  const handleDetailsPress = (task: Task) => {
    openBottomModal(ModalName.Details, {task});
  };

  return (
    <Style.Container>
      <Style.Box>
        <Style.Label>{getLabel(props.label)}</Style.Label>
        <Style.TrackedTime>
          {getTrackedTimeLabel(tasksWitTrackedTime)}
        </Style.TrackedTime>
      </Style.Box>

      {tasksWitTrackedTime.map(task => (
        <Style.Card>
          <Style.CardTitle>{task.name}</Style.CardTitle>
          <Style.CardCounter>
            {secondsToFormat(task.trackedTime)}
          </Style.CardCounter>
          <Style.DetailsButton
            icon={Style.PlayIcon}
            onPress={() => props.startButtonOnPress(task.name)}
          />
          <RoundIconButton
            icon={EyeSvg}
            onPress={() => handleDetailsPress(task)}
          />
        </Style.Card>
      ))}
    </Style.Container>
  );
};

export default TimerDayCard;
