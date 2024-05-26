export const generateRandomKey = () =>
  Number(String(Math.random()).substring(2)).toString(16);
