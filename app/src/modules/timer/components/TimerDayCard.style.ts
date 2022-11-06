import styled from 'styled-components/native';

import TriangleSvg from '@app/assets/svg/TriangleSvg';
import RoundIconButton from '@app/src/components/RoundIconButton';

export const Container = styled.View`
  padding: 10px;
  padding-bottom: 0;
  border-radius: 10px;
  background-color: white;
`;
export const Box = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0 20px 0;
`;
export const Label = styled.Text`
  font-weight: bold;
  font-size: 18px;
  text-transform: uppercase;
`;
export const TrackedTime = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;
export const Card = styled.TouchableOpacity`
  flex-direction: row;
  border-bottom-color: #e7e7e7;
  border-bottom-width: 1px;
  align-items: center;
  justify-content: space-between;
  padding: 20px 5px;
`;
export const CardTitle = styled.Text`
  font-size: 16px;
  flex: 1;
  text-transform: capitalize;
`;
export const CardCounter = styled.Text`
  font-size: 14px;
  margin-right: 20px;
`;
export const PlayIcon = styled(TriangleSvg)`
  transform: rotate(-90deg);
  margin-right: 5px;
`;
export const DetailsButton = styled(RoundIconButton)`
  margin-right: 10px;
`;
