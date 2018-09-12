import moment from 'moment';

const dateFormatter = (date) => {
  const createdAt = moment(date).format('MM/DD/YYYY @ h:mm a');
  return moment(createdAt).fromNow();
};

export default dateFormatter;
