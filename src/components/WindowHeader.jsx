import React from "react";
import WindowHeaderCSS from "../style/WindowHeader.module.css";
import { AiOutlineArrowsAlt, AiOutlineClose } from "react-icons/ai";
import { GoMute, GoUnmute } from "react-icons/go";

const WindowHeader = ({ window }) => {
  const closeWindow = () => {};

  return (
    <div id={WindowHeaderCSS.windowHeader}>
      <p>{window}</p>
      <div className={WindowHeaderCSS.windowOptions}>
        {window != "Feed" ? (
          <button onClick={closeWindow}>
            <AiOutlineClose color="white" />
          </button>
        ) : (
          <button>
            <GoUnmute color="white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default WindowHeader;
