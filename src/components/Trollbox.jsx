import React from "react";
import TrollboxCSS from "../style/Trollbox.module.css";
import WindowHeader from "./WindowHeader";

const Trollbox = () => {
  return (
    <div id={TrollboxCSS.trollbox}>
      <WindowHeader window="Trollbox" />
    </div>
  );
};

export default Trollbox;
