import React, { useState } from 'react';
import './CameraActions.css';

const CameraActions: React.FC = () => {
  const [flash, setFlash] = useState(false);

  return (
    <div className="camera-actions">
      <div className="camera-action-card">
        <span className="camera-action-icon">💡</span>
        <span className="camera-action-label">Flash</span>
        <label className="switch">
          <input type="checkbox" checked={flash} onChange={() => setFlash(f => !f)} />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="camera-action-card">
        <span className="camera-action-icon">📷</span>
        <button className="camera-photo-btn">Photo</button>
      </div>
      <div className="camera-action-card">
        <span className="camera-action-icon">▶️</span>
        <button className="camera-stream-btn">Stream</button>
      </div>
    </div>
  );
};

export default CameraActions;
