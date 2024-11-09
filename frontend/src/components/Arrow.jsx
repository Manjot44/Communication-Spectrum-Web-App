import React from 'react';

function Arrow() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '0 15px',
    }}>
      <div style={{
        width: '50px',
        height: '12px',
        backgroundColor: '#FF7C33', 
        position: 'relative',
      }}>
        <div style={{
          width: '0', 
          height: '0', 
          borderTop: '20px solid transparent',
          borderBottom: '20px solid transparent',
          borderLeft: '20px solid #FF7C33',
          position: 'absolute',
          right: '-20px',
          top: '-14px',
        }}></div>
      </div>
    </div>
  );
}

export default Arrow;
