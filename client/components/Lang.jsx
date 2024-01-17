import React from "react";
import { useAppContext } from "../AppContext";

function Lang() {
  const { changeLang } = useAppContext();
  
  return (
    <div className="btn-container">
      <label className="switch btn-color-mode-switch">
        <input
          value="1"
          id="color_mode"
          name="color_mode"
          type="checkbox"
          onClick={changeLang}
        />
        <label
          className="btn-color-mode-switch-inner"
          data-off="Heb"
          data-on="Eng"
          htmlFor="color_mode"
        ></label>
      </label>
    </div>
  );
}

export default Lang;
