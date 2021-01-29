const data = [
  { city: 'Amsterdam', temp: 299.15 },
  { city: 'Berlin', temp: 295.6 },
  { city: 'London', temp: 300 },
  { city: 'Moscow', temp: 302.3 },
  { city: 'Madrid', temp: 286.15 },
  { city: 'Liverpool', temp: 297.1 },
  { city: 'Prague', temp: 292.9 },
];

export const weatherData = (scale) => {
  switch (scale) {
    case 'celsius':
      return data.map(({ city, temp }) => ({
        city,
        temp: (temp - 273.15).toFixed(2),
      }));
    case 'fahrenheit':
      return data.map(({ city, temp }) => ({
        city,
        temp: ((temp - 273.15) * 1.8 + 32).toFixed(2),
      }));
    case 'kelvin':
    default:
      return data;
  }
};
