import { useEffect, useState, useReducer, useRef } from "react";
import Gun from "gun";
import TrollboxCSS from "../style/Trollbox.module.css";
import WindowHeader from "./WindowHeader";
import makeBlockie from "ethereum-blockies-base64";
import { MdSend } from "react-icons/md";
import InputEmoji from "react-input-emoji";

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

const Trollbox = ({ account }) => {
  const [formMessage, setFormMessage] = useState("");

  const submitButton = useRef(null);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const messages = gun.get("messages");
    messages.map().once((message) => {
      dispatch({
        name: message.name,
        message: message.message,
        createdAt: message.createdAt,
      });
      return () => {
        alert("htrrt");
        this.setState({});
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
    console.log(messages);
    messages.set({
      name: account,
      message: formMessage,
      createdAt: new Date().toISOString(),
    });
    setFormMessage("");
  }

  return (
    <div id={TrollboxCSS.trollbox}>
      <WindowHeader window="Trollbox" />
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
