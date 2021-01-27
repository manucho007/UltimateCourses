import React, { useState } from 'react';

const list = [
  { id: 1, name: 'Cool Place 1', topDestination: true },
  { id: 2, name: 'Cool Place 2', topDestination: false },
  { id: 3, name: 'Cool Place 3', topDestination: true },
  { id: 4, name: 'Cool Place 4', topDestination: false },
  { id: 5, name: 'Cool Place 5', topDestination: true },
];

// We can map through an object as well
const listObject = {
  place1: 'Cool place 1',
  place2: 'Cool place 2',
  place3: 'Cool place 3',
  place4: 'Cool place 4',
  place5: 'Cool place 5',
};
const UltimateHolidayList = () => {
  const [showAll, setShowAll] = useState(true);
  return (
    <section>
      <h1>Ultimate Holiday Top Destinations List</h1>
      {/* List from object */}
      <ol>
        {Object.keys(listObject).map((key) => (
          <li key={key}>{listObject[key]}</li>
        ))}
      </ol>
      <ul>
        {list
          .filter((item) => (showAll ? true : item.topDestination))
          .map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
      </ul>
      <button
        className='btn-action'
        type='button'
        onClick={() => {
          setShowAll(true);
        }}>
        Show All
      </button>
      <button
        className='btn-action'
        type='button'
        onClick={() => {
          setShowAll(false);
        }}>
        Show Only Top Destinations
      </button>
    </section>
  );
};

export default UltimateHolidayList;
