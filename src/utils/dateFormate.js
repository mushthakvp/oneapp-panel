export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() returns 0 for January, so we add 1
    const day = String(date.getDate()).padStart(2, "0");
    
  return `${year}-${month}-${day}`;
};
export const convertUTCToLocal = (utcDate) => {
  // Create a Date object from the UTC date string
  const date = new Date(utcDate);

  // Format the date to the desired format: "01 Nov 2024"
  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  // Use toLocaleDateString to convert to local date with the given options
  return date.toLocaleDateString("en-GB", options);
};