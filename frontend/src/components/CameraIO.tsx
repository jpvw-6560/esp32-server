import React, { useState } from 'react';
import './CameraActions.css';

export function FlashSwitch() {
  const [on, setOn] = useState(false);
  return (
    <label className="switch">
      <input type="checkbox" checked={on} onChange={() => setOn(v => !v)} />
      <span className="slider round"></span>
    </label>
  );
}

export function PhotoButton() {
  return (
    <button className="camera-photo-btn">Photo</button>
  );
}

export function StreamButton() {
  return (
    <button className="camera-stream-btn">Stream</button>
  );
}
