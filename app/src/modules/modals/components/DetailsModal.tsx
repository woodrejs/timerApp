import React from 'react';
import styled from 'styled-components/native';

import { Task } from '@app/src/store/tasksSlice';
import { dateStringToFormat, secondsToFormat } from '@app/src/utils/time';

interface Props {
  task: Task;
}
const DetailsModal = ({task}: Props) => {
  console.log({task: typeof task.startDate});

  return (
    <Container>
      <Card>
        <ContentBox>
          <Title numberOfLines={1}>Name:</Title>
          <Value numberOfLines={1}>{task.name}</Value>
        </ContentBox>
        <ContentBox>
          <Title numberOfLines={1}>Time:</Title>
          <Value numberOfLines={1}>{secondsToFormat(task.trackedTime)}</Value>
        </ContentBox>
        <ContentBox>
          <Title numberOfLines={1}>Start:</Title>
          <Value numberOfLines={1}>
            {dateStringToFormat(task.startDate, 'dd/MM/yyy HH:mm:ss')}
          </Value>
        </ContentBox>
        <ContentBox>
          <Title numberOfLines={1}>End:</Title>
          <Value numberOfLines={1}>
            {dateStringToFormat(task.endDate, 'dd/MM/yyy HH:mm:ss')}
          </Value>
        </ContentBox>
      </Card>
    </Container>
  );
};
export default DetailsModal;

export const Container = styled.View`
  justify-content: flex-end;
`;
export const ContentBox = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;
export const Card = styled.View`
  padding: 20px;
  min-height: 200px;
  border-top-left-radius: 21px;
  border-top-right-radius: 21px;
  background-color: white;
  shadow-color: black;
  shadow-offset: 0px 10px;
  shadow-opacity: 0.2;
  shadow-radius: 10px;
  elevation: 6;
`;
const Title = styled.Text`
  font-weight: bold;
  font-size: 16px;
  width: 150px;
  text-overflow: ellipsis;
`;
const Value = styled.Text`
  font-size: 16px;
`;
