import { useState } from "react";
import WindowHeaderCSS from "../style/WindowHeader.module.css";
import { FaLockOpen, FaLock } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { GrDos } from "react-icons/gr";
import { IoMdChatboxes } from "react-icons/io";
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
        {window !== "Feed" ? (
          <>
            <ReactTooltip id={`makeStatic${window}`} class="tooltip" />
            <button
              data-place="left"
              data-for={`makeStatic${window}`}
              data-tip={
                isStatic
                  ? `${window} is static.<br/>Make movable/resizeable?`
                  : `${window} is non-static.<br/>Make unmoveable/unresizable?`
              }
              data-multiline="true"
              onClick={() => {
                setItemStatic(window);
                setIsStatic(!isStatic);
              }}
            >
              {isStatic === true ? (
                <FaLock color="green" />
              ) : (
                <FaLockOpen color="red" />
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
              onClick={() => {
                alert("Coming soon...");
              }}
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
            <ReactTooltip id={`makeStatic${window}`} class="tooltip" />
            <button
              data-place="left"
              data-for={`makeStatic${window}`}
              data-tip={
                isStatic
                  ? `${window} is static.<br/>Make movable/resizeable?`
                  : `${window} is non-static.<br/>Make unmoveable/unresizable?`
              }
              data-multiline="true"
              onClick={() => {
                setItemStatic(window);
                setIsStatic(!isStatic);
              }}
            >
              {isStatic === true ? (
                <FaLock color="green" />
              ) : (
                <FaLockOpen color="red" />
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default WindowHeader;
