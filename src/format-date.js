const formatDate = (dateString) => {
  const date = new Date(dateString).toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
    year: 'numeric',
  });

  const time = new Date(dateString).toLocaleTimeString('en-US', {
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
  });

  return {
    date,
    time,
  };
};

export default formatDate;
