import styled from 'styled-components/native';

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
export const Title = styled.Text`
  font-weight: bold;
  font-size: 16px;
  width: 150px;
`;
export const Value = styled.Text`
  font-size: 16px;
`;
