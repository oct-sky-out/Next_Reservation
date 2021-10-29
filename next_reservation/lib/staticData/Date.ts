export const Years = [...Array(new Date(Date.now()).getFullYear() - 1899)].map(
  (_, idx) => `${1900 + idx}`
);
export const Months = [...Array(12)].map((val, idx) => `${idx + 1}`);
export const Days = [...Array(31)].map((val, idx) => `${idx + 1}`);
