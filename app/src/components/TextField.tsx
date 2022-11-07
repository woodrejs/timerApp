import React from 'react';
import {StyleProp, TextInput, ViewStyle} from 'react-native';
import styled from 'styled-components/native';

interface Props {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
  isError?: string;
  style?: StyleProp<ViewStyle>;
}

const TextField = (props: Props) => {
  return (
    <Container style={props.style}>
      <Field
        onChangeText={props.onChange}
        value={props.value}
        placeholder={props.placeholder}
        isError={props.isError}
        placeholderTextColor={props.isError ? 'red' : 'lightgray'}
      />
    </Container>
  );
};

export default TextField;

const Container = styled.View``;
const Field = styled(TextInput)<{isError: boolean}>`
  border-radius: 10px;
  border-width: 1px;
  border-color: ${({isError}) => (isError ? 'red' : 'lightgray')};
  padding: 5px;
  height: 35px;
`;
