import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import styled from 'styled-components/native';

import {SvgIconType} from '@app/src/types/svg';

interface Props {
  icon: (props: SvgIconType) => JSX.Element;
  onPress: () => void;
  color?: string;
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
}

const RoundIconButton = ({
  onPress,
  icon,
  color = '#828282',
  iconStyle,
  style,
}: Props) => {
  const Icon = icon;
  const handlePress = () => onPress();
  return (
    <Container onPress={handlePress} style={style}>
      <Circle {...{color}}>
        <Icon style={iconStyle} />
      </Circle>
    </Container>
  );
};
export default RoundIconButton;

const Container = styled.TouchableOpacity``;
const Circle = styled.View<{isActive: string}>`
  background-color: ${({color}) => color};
  height: 40px;
  width: 40px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
`;
