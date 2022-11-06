import { format } from 'date-fns';
import React from 'react';

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
    timer: format(new Date(0, 0, 0, 0, 0, seconds), 'HH:mm:ss'),
    startTimer,
    stopTimer,
    isRunning,
  };
};

export default useTimer;
