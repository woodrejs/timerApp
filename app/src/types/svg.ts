import {ViewProps} from 'react-native';

export type SvgType = {
  width?: number;
  height?: number;
};

export type SvgIconType = SvgType &
  ViewProps & {
    color?: string;
    fill?: string;
  };
