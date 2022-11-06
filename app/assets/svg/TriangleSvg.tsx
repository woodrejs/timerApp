import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const TriangleSvg = ({
  width = 24,
  height = 24,
  color = '#fff',
  ...rest
}: Props) => (
  <Svg width={width} height={height} {...rest}>
    <Path
      fill={color}
      d="M23.677 18.52c.914 1.523-.183 3.472-1.967 3.472H2.296c-1.784 0-2.881-1.949-1.967-3.472l9.709-16.18c.891-1.483 3.041-1.48 3.93 0l9.709 16.18z"
    />
  </Svg>
);

export default TriangleSvg;
