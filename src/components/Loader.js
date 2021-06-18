import React from 'react'

export default function Loader() {
  return (
    <div style={{textAlign: "center"}}>
    <div className="lds-ripple">
      <div></div>
      <div></div>
    </div>
    </div>
  );
}
