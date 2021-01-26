import Counter from './Counter';
import RandomNumber from './RandomNumber';
import UltimateMachine from './UltimateMachine';
import UltimateHolidayList from './UltimateHolidayList';
import StopWatch from './StopWatch';
import './App.css';
const App = () => {
  return (
    <main className='App'>
      <StopWatch />
      <Counter />
      <UltimateHolidayList />
      <UltimateMachine />
      <RandomNumber />
    </main>
  );
};

export default App;