import classes from './SignupForm.module.css';

import { useState } from 'react';

const Accordion = ({ title, children }) => {
  const [isActive, setIsActive] = useState(true);

  return (
    <>
      <div className={classes.accordionTitle} onClick={() => setIsActive(isActive)}>
        <div>{title}</div>
        {/* <div>{isActive ? '-' : '+'}</div> */}
      </div>
      {isActive && <div className={classes.accordionContent}>{children}</div>}
    </>
  );
};

export default Accordion;