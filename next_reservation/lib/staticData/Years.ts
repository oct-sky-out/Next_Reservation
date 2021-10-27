export const Years = [...Array(new Date(Date.now()).getFullYear() - 1899)].map(
  (_, idx) => `${1900 + idx}`
);
