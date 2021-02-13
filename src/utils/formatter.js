const formatTime = (date) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleTimeString('en', {
    timeStyle: 'short',
    hour12: true,
  });
};

export { formatTime };
