import React from "react";
import { useHomeContext } from "../context/HomeContext";

function Balance() {
  const { balance } = useHomeContext();

  return (
    <div className="balance">
      <h1
        style={{
          color: balance < 0 ? "red" : "green",
          letterSpacing: 2,
        }}
      >
        {balance}₪
      </h1>
    </div>
  );
}

export default Balance;
