import styled from 'styled-components/native';

import TriangleSvg from '@app/assets/svg/TriangleSvg';
import TextField from '@app/src/components/TextField';

export const Panel = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom-color: lightgray;
  border-bottom-width: 1px;
  background-color: white;

  height: 100px;
`;
export const Counter = styled.Text`
  margin-right: 20px;
`;
export const TaskTitle = styled.Text`
  font-weight: bold;
  font-size: 16px;
  flex: 1;
`;
export const NameField = styled(TextField)`
  width: 200px;
`;
export const PlayIcon = styled(TriangleSvg)`
  transform: rotate(-90deg);
  margin-right: 5px;
`;
export const ListBox = styled.View`
  background-color: lightgray;
  height: 100%;
`;
export const EmptyBox = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const EmptyBoxTitle = styled.Text`
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  color: gray;
`;
