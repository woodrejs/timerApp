import { format } from 'date-fns';
import React from 'react';

import { secondsToFormat } from '@app/src/utils/time';

const useTimer = () => {
  const [seconds, setSeconds] = React.useState<number>(0);
  const [isRunning, setIsRunning] = React.useState<boolean>(false);

  const interval = React.useRef<NodeJS.Timer | undefined>();

  const startTimer = (diff?: number) => {
    if (!isRunning) {
      interval.current = setInterval(() => {
        setSeconds(seconds => {
          const newSecounds = !seconds && diff ? diff : seconds;
          return newSecounds + 1;
        });
      }, 1000);
      setIsRunning(true);
    }
  };
  const stopTimer = () => {
    if (isRunning) {
      clearInterval(interval.current);
      setIsRunning(false);
      setSeconds(0);
    }
  };

  React.useEffect(() => {
    return () => clearInterval(interval.current);
  }, [setSeconds]);

  return {
    timer: secondsToFormat(seconds),
    startTimer,
    stopTimer,
    isRunning,
  };
};

export default useTimer;
