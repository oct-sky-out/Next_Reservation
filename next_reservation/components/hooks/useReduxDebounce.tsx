import { useEffect, useState } from 'react';

const useReduxDebounce = <T,>(value: T, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const debouncer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(debouncer);
    };
  }, [value, delay]);

  return debounceValue;
};

export default useReduxDebounce;
