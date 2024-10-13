function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric", // 12-hour format
    minute: "numeric", // minutes
    hour12: true, // 12-hour format with AM/PM
    day: "numeric", // day of the month
    month: "short", // abbreviated month name, e.g., "Oct"
    year: "numeric", // full year
  };

  // Format the date as "5:30 PM, 1 Oct 2024"
  return new Date(date).toLocaleString("en-US", options);
}

export default formatDate;
