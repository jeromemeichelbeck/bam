export const getFormatedDateTime = (date: string) => {
  const formatter = new Intl.DateTimeFormat(navigator.language, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return formatter.format(new Date(date));
};
