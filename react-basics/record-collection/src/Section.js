import React from 'react';

const Section = ({ children, headingText, headingLevel = 2 }) => {
  const H = `h${headingLevel}`;
  //   Just by using the children props we solve the issue of passing the props to this component and then passing it to the next level
  // And we just simply send it from the container component
  return (
    <section>
      <H> {headingText}</H>
      {children}
    </section>
  );
};

export default Section;
