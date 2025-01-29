export const getFirstDayOfMonth = (date) => {
  // Set the date to the 1st of the current month
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const getLastDayOfMonth = (date) => {
  // Set the date to the last day of the current month
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    
  return lastDay;
};
