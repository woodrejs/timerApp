import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

import {SvgIconType} from '@app/src/types/svg';

const EyeSvg = ({
  width = 24,
  height = 24,
  color = '#fff',
  ...rest
}: SvgIconType) => (
  <Svg
    clipRule="evenodd"
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={2}
    width={width}
    height={height}
    {...rest}>
    <Path
      d="M11.998 5C7.92 5 4.256 8.093 2.145 11.483a1 1 0 0 0-.001 1.034C4.256 15.907 7.92 19 11.998 19c4.143 0 7.796-3.09 9.864-6.493a1 1 0 0 0 0-1.014C19.794 8.09 16.141 5 11.998 5zM12 8c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1 0-5z"
      fill={color}
    />
  </Svg>
);

export default EyeSvg;
