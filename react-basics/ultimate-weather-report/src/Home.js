import React from 'react';
import Section from './Section';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Section headingText='Welcome to the Weather Report'>
      <p>
        Please select one of the options below to view the weather in your
        temperature scale of choice
      </p>
      <nav aria-label='Main'>
        <ul>
          <Link to='/reports/kelvin'>View weather report in Kelvin</Link>
        </ul>
        <ul>
          <Link to='/reports/celsius'>View weather report in Celsius</Link>
        </ul>
        <ul>
          <Link to='/reports/fahrenheit'>
            View weather report in Fahrenheit
          </Link>
        </ul>
      </nav>
    </Section>
  );
};

export default Home;
