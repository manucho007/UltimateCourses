import { useMemo, useState } from 'react';
import { useNetwork } from './useNetwork';

export const usePicture = (date) => {
  const [test] = useState('test');
  let options = useMemo(
    () => ({
      method: 'GET',
      headers: { test },
      url: `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${date}`,
    }),
    [test, date]
  );

  let { data, loading } = useNetwork(options);

  return { picture: data, loading };
};
