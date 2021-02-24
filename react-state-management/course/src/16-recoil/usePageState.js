import { atom, useRecoilState } from 'recoil';

// An atom is basically a piece of state
const pageState = atom({
  key: 'pageState',
  default: 'Home',
});

export const usePageState = () => useRecoilState(pageState);
