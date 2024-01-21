import React from "react";

function Dialog({ title, onClose, body }) {
  return (
    <div className="dialog">
      <h1>{title}</h1>
      <p>{body}</p>
      <button onClick={onClose}>OK</button>
    </div>
  );
}

export default Dialog;
