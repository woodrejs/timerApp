import { differenceInSeconds, format } from 'date-fns';

export const getDiffInSeconds = (startDate: string, endDate: string) =>
  differenceInSeconds(Date.parse(startDate), Date.parse(endDate)) * -1;
export const secondsToFormat = (seconds = 0, formatString = 'HH:mm:ss') =>
  format(new Date(0, 0, 0, 0, 0, seconds), formatString);
export const dateStringToFormat = (
  dateString: string,
  formatString = 'dd/MM/yyy',
) => {
  return format(Date.parse(dateString), formatString);
};
