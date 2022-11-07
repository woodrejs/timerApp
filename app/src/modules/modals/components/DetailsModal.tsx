import React from 'react';

import {Task} from '@app/src/store/tasksSlice';
import {dateStringToFormat, secondsToFormat} from '@app/src/utils/time';

import * as Style from './DetailsModal.style';

interface Props {
  task: Task;
}
const DetailsModal = ({task}: Props) => {
  return (
    <Style.Container>
      <Style.Card>
        <Style.ContentBox>
          <Style.Title numberOfLines={1}>Name:</Style.Title>
          <Style.Value numberOfLines={1}>{task.name}</Style.Value>
        </Style.ContentBox>
        <Style.ContentBox>
          <Style.Title numberOfLines={1}>Time:</Style.Title>
          <Style.Value numberOfLines={1}>
            {secondsToFormat(task.trackedTime)}
          </Style.Value>
        </Style.ContentBox>
        <Style.ContentBox>
          <Style.Title numberOfLines={1}>Start:</Style.Title>
          <Style.Value numberOfLines={1}>
            {dateStringToFormat(task.startDate, 'dd/MM/yyy HH:mm:ss')}
          </Style.Value>
        </Style.ContentBox>
        {task?.endDate ? (
          <Style.ContentBox>
            <Style.Title numberOfLines={1}>End:</Style.Title>
            <Style.Value numberOfLines={1}>
              {dateStringToFormat(task.endDate, 'dd/MM/yyy HH:mm:ss')}
            </Style.Value>
          </Style.ContentBox>
        ) : null}
      </Style.Card>
    </Style.Container>
  );
};
export default DetailsModal;
