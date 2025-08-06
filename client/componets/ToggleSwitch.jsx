import React from 'react';
import { useState } from 'react';

export default function ToggleSwitch() {
  const [switchState, setSwitchState] = useState("end");

  function handleClick() {
    if (switchState === 'baseline') {
      setSwitchState('end');
    }
    if (switchState === 'end') {
      setSwitchState('baseline');
    }
  }

  return (
    <div
      className='toggleSwitch'
      style={{ justifyContent: switchState }}
      onClick={() => {
        handleClick();
      }}>
      <div className='switchKnob'></div>
    </div>
  );
}
