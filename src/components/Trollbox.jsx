import { useEffect, useState, useReducer, useRef } from "react";
import Gun from "gun";
import TrollboxCSS from "../style/Trollbox.module.css";
import WindowHeader from "./WindowHeader";
import makeBlockie from "ethereum-blockies-base64";
import { MdSend } from "react-icons/md";
import InputEmoji from "react-input-emoji";
import { AiOutlineLoading } from "react-icons/ai";

const gun = Gun({
  peers: ["http://localhost:3030/gun"],
});

const initialState = {
  messages: [],
};

function reducer(state, message) {
  return {
    messages: [message, ...state.messages],
  };
}

const Trollbox = ({
  account,
  removeItem,
  addItem,
  isItemStatic,
  setItemStatic,
}) => {
  const [formMessage, setFormMessage] = useState("");

  const submitButton = useRef(null);

  const [state, dispatch] = useReducer(reducer, initialState);

  const [gunLength, setGunLength] = useState(null);

  useEffect(() => {
    const messages = gun.get("messages");
    messages.map().once((message) => {
      dispatch({
        name: message.name,
        message: message.message,
        createdAt: message.createdAt,
      });
      //this works for now, allows me to set loading so that messages dont display when loading, use gun.on if this stops working
      setGunLength(Object.keys(messages._.back.graph).length - 1);
      return () => {
        alert("htrrt");
        this.setState({});
        setGunLength(null);
      };
    });
  }, []);

  function saveMessage(e) {
    e.preventDefault();
    //if empty string or only spaces, or too long
    if (/^ *$/.test(formMessage) || formMessage.length > 132) {
      alert(formMessage.length);
      return;
    }
    const messages = gun.get("messages");
    messages.set({
      name: account,
      message: formMessage,
      createdAt: new Date().toISOString(),
    });
    setFormMessage("");
  }

  return (
    <div id={TrollboxCSS.trollbox}>
      <WindowHeader
        window="Trollbox"
        removeItem={removeItem}
        addItem={addItem}
        isItemStatic={isItemStatic}
        setItemStatic={setItemStatic}
      />
      {!account ? (
        <p style={{ marginTop: "40%", height: "100%" }}>
          Your wallet is not connected.
        </p>
      ) : (
        <>
          <div id={TrollboxCSS.chatInfo}>
            <p>
              <strong>Bots:</strong> ∞
            </p>
            <p>
              <strong>Users:</strong> 0
            </p>
          </div>
          <div id={TrollboxCSS.chatContainer}>
            {state.messages.length < gunLength ? (
              <AiOutlineLoading
                style={{ marginTop: "40%" }}
                className="loadingSvg"
              />
            ) : (
              <ol id={TrollboxCSS.messages}>
                {state.messages.map((message) => (
                  <li
                    key={`${message.createdAt}${message.message}${message.name}`}
                  >
                    <div className={TrollboxCSS.message}>
                      <p>
                        {`[${message.createdAt.substring(
                          message.createdAt.indexOf("T") + 1,
                          message.createdAt.indexOf(".")
                        )}]\u00A0`}

                        <img width="14px" src={makeBlockie(message.name)}></img>
                        {` ${message.name.substring(
                          0,
                          6
                        )}...${message.name.substring(
                          message.name.length - 4
                        )}:\u00A0`}
                        <br />

                        {message.message}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
            <form id={TrollboxCSS.chatForm} onSubmit={(e) => saveMessage(e)}>
              <InputEmoji
                onChange={setFormMessage}
                placeholder=""
                name="message"
                maxLength={132}
                fontSize="14px"
                fontFamily="monospace"
                borderRadius="24px"
                borderColor="transparent"
                onEnter={() => submitButton.current.click()}
                required
                value={formMessage}
              />{" "}
              <button ref={submitButton} type="submit">
                <MdSend />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Trollbox;
