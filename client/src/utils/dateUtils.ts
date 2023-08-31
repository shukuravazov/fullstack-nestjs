function formaDate(date: string): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDate = new Date(date).toLocaleString("en-US", options);
  return formattedDate;
}

export default formaDate;
