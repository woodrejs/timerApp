import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

import {SvgIconType} from '@app/src/types/svg';

const SquareSvg = ({
  width = 24,
  height = 24,
  color = '#fff',
  ...rest
}: SvgIconType) => (
  <Svg width={width} height={height} {...rest}>
    <Path
      fill={color}
      d="M24 24.001c-.045 0-7.457.003-12 0h12zm-12 0c-4.551.003-11.979 0-12 0h12zm-12-12C-.032 3.353 3.365.008 12 .001c8.635.007 12.032 3.352 12 12 .032 8.648-3.365 11.994-12 12-8.635-.006-12.032-3.352-12-12zm24-12H12c4.543-.003 11.955 0 12 0zm-12 0c-4.551-.003-11.979 0-12 0h12z"
    />
  </Svg>
);

export default SquareSvg;
