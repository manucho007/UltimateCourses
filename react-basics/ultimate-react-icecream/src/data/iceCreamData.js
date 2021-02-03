import axios from 'axios';

export const getMenu = async () => {
  const { data } = await axios.get('/api/menu');
  const sortedData = await data.sort((a, b) => {
    if (a.iceCream.name < b.iceCream.name) {
      return -1;
    } else if (a.iceCream.name > b.iceCream.name) {
      return 1;
    }
    return 0;
  });
  return sortedData;
};
