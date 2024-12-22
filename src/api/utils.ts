import dayjs from 'dayjs';

export const getFormatedTime = (day: string) => dayjs(day).format('MMM DD YYYY');
