import moment from 'moment';

export const formatDate = (date:string) => moment(date).format('DD-MM-YYYY');

export const formatTime = (date:string) => moment(date).format('hh:mm a');
