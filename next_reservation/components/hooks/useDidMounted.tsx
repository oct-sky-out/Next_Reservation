import { useRef, useEffect } from 'react';

const useDidMounted = () => {
  const didMounted = useRef(false);
  useEffect(() => {
    if (!didMounted.current) didMounted.current = true;
  }, []);

  return didMounted.current;
};

export default useDidMounted;
