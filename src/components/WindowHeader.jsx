import React, { useState } from "react";
import WindowHeaderCSS from "../style/WindowHeader.module.css";
import { AiOutlineArrowsAlt, AiOutlineClose } from "react-icons/ai";
import { GrDos } from "react-icons/gr";
import { IoMdChatboxes, IoMdLock, IoMdUnlock } from "react-icons/io";
import { RiUserSearchFill, RiContactsBookFill } from "react-icons/ri";
import ReactTooltip from "react-tooltip";

const WindowHeader = ({
  window,
  removeItem,
  addItem,
  isItemStatic,
  setItemStatic,
}) => {
  const [isStatic, setIsStatic] = useState(isItemStatic(window));
  return (
    <div id={WindowHeaderCSS.windowHeader}>
      <p>{window}</p>
      <div className={WindowHeaderCSS.windowOptions}>
        {window != "Feed" ? (
          <>
            <button
              onClick={() => {
                setItemStatic(window);
                setIsStatic(!isStatic);
              }}
            >
              {isStatic === true ? (
                <IoMdLock color="green" />
              ) : (
                <IoMdUnlock color="red" />
              )}
            </button>
            <button
              onClick={() => {
                removeItem(window);
              }}
            >
              <AiOutlineClose color="white" />
            </button>
          </>
        ) : (
          <>
            <ReactTooltip id="watchlist" class="tooltip" />
            <button
              data-place="left"
              data-for="watchlist"
              data-tip="Open Watchlist?"
              onClick={() => {
                addItem("Watchlist");
              }}
            >
              <RiContactsBookFill color="white" />
            </button>
            <ReactTooltip id="trollbox" class="tooltip" />
            <button
              data-place="left"
              data-for="trollbox"
              data-tip="Open Trollbox?"
              onClick={() => {
                addItem("Trollbox");
              }}
            >
              <IoMdChatboxes color="white" />
            </button>
            <ReactTooltip id="accountViewer" class="tooltip" />
            <button
              data-place="left"
              data-for="accountViewer"
              data-tip="Open Account Viewer?"
            >
              <RiUserSearchFill color="white" />
            </button>
            <ReactTooltip id="dosbox" class="tooltip" />
            <button
              data-place="left"
              data-for="dosbox"
              data-tip="Open Dosbox?"
              onClick={() => {
                addItem("Dosbox");
              }}
            >
              <GrDos color="white" />
            </button>
            <button
              onClick={() => {
                setItemStatic(window);
                setIsStatic(!isStatic);
              }}
            >
              {isStatic === true ? (
                <IoMdLock color="green" />
              ) : (
                <IoMdUnlock color="red" />
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default WindowHeader;
