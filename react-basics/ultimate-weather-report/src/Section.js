import React, { useEffect, useRef } from 'react';
import Helmet from 'react-helmet';

const Section = ({ children, headingText, headingLevel = 1 }) => {
  const H = `h${headingLevel}`;
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current.focus();
  });
  return (
    <section>
      <Helmet>
        <title>{`${headingText} | Ultimate weather report`}</title>
      </Helmet>
      {/* Tab index will allow to make the H element interactive so we'll be able to set focus on this element when the component mounts */}
      <H ref={headingRef} tabIndex='-1'>
        {headingText}
      </H>
      {children}
    </section>
  );
};

export default Section;
