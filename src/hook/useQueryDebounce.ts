import { useEffect, useState } from 'react';

const useQueryDebounce = ({ value, delay = 1000 }: { value: string; delay: number }) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler: NodeJS.Timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceValue;
};

export default useQueryDebounce;
