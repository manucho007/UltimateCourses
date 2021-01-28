import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import Section from './Section';
import List from './List';
import Form from './Form';
import axios from 'axios';
import './records.scss';

// To avoid side effects, it's correct to place this function outside the component to reduce the complexity of the component
// This way doesn't need to be included in the useEffect
const sortRecords = (records) =>
  records.sort((a, b) => {
    if (a.recordName < b.recordName) {
      return -1;
    }
    if (a.recordName > b.recordName) {
      return 1;
    }
    return 0;
  });

// const recordsData = [
//   {
//     recordName: 'The Bends',
//     artistName: 'Radiohead',
//     description:
//       'This album is a masterpiece.  I had the privilege of seeing Radiohead open up for Soul Asylum at The Warfield in San Francisco.  It was historic, intense, visceral, raw.  We were in the front row of the sardine-packed dancefloor.',
//   },
//   {
//     recordName: 'Brave New World',
//     artistName: 'Iron Maiden',
//     description:
//       'Triumphant return of Bruce and Adrian.  Start of a new renaissance for iron maiden. All tracks are great and epic',
//   },
// ];
const Container = ({ setShowApp }) => {
  const [records, setRecords] = useState([]);
  //   We'll do this for accessability purposes to inform screenreaders about any changes
  const [liveText, setLiveText] = useState('');

  const isMounted = useRef(true);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/records', {
        headers: {
          'Cache-Control': 'private',
          'X-custom-Header': 'some-value',
        },
      });
      if (isMounted.current) {
        await setRecords(sortRecords(data));
      }
    };
    getData();

    // Cleanup function when the component unmounts
    return () => {
      isMounted.current = false;
    };
  }, []);

  //   We get the entry from the child component
  const onSubmitHandler = async (entry) => {
    const { data } = await axios.post('/api/records', entry);
    if (isMounted.current) {
      setRecords(sortRecords([...records, data]));
      setLiveText(`${entry.recordName} successfully added.`);
    }
    // setShowApp(false);
  };
  return (
    <>
      <Header />
      <main>
        <Section headingText='Add a new favorite'>
          <Form onSubmit={onSubmitHandler} />
        </Section>
        <Section headingText='Records'>
          <List records={records} />
        </Section>
      </main>
      <div aria-live='polite' aria-atomic='true' className='visually-hidden'>
        {liveText}
      </div>
    </>
  );
};

// To avoid a memory leak we'll only display the component based on the state variable
const Wrapper = () => {
  const [showApp, setShowApp] = useState(true);
  return showApp && <Container setShowApp={setShowApp} />;
};

export default Wrapper;
