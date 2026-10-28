import { useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key);
      return saved === null ? initialValue : JSON.parse(saved);
    } catch (error) {
      console.error(`Unable to read ${key} from local storage.`, error);
      return initialValue;
    }
  });

  const updateValue = (nextValue) => {
    const resolved = typeof nextValue === 'function' ? nextValue(value) : nextValue;
    try {
      window.localStorage.setItem(key, JSON.stringify(resolved));
      setValue(resolved);
    } catch (error) {
      console.error(`Unable to save ${key} to local storage.`, error);
      throw error;
    }
  };

  return [value, updateValue];
}
