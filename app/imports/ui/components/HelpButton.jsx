import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';

const HelpButton = () => {

  const [window, windowSet] = useState(false);

  const changeStatus = () => {
    windowSet(!window);
  };

  return (
    <div>
      { window ? (
        <>
          <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
            <Container id="help-window" />
          </div>
          <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
            <Button onClick={changeStatus} id="help-button">Close</Button>
          </div>
        </>
      ) : (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
          <Button onClick={changeStatus} id="help-button">Request Help</Button>
        </div>
      )}
    </div>
  );
};

export default HelpButton;
