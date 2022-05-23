import { useEffect, useState, useReducer } from "react";
import Gun from "gun";
import TrollboxCSS from "../style/Trollbox.module.css";
import WindowHeader from "./WindowHeader";
import makeBlockie from "ethereum-blockies-base64";
import { MdSend } from "react-icons/md";

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
  const [form, setForm] = useState({ message: "" });

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const messages = gun.get("messages");
    messages.map().once((message) => {
      dispatch({
        name: message.name,
        message: message.message,
        createdAt: message.createdAt,
      });
    });
  }, []);

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function saveMessage(e) {
    e.preventDefault();
    const messages = gun.get("messages");
    messages.set({
      name: account,
      message: form.message,
      createdAt: new Date().toISOString(),
    });
    setForm({
      message: "",
    });
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
              <strong>Bots:</strong> 0
            </p>
            <p>
              <strong>Users:</strong> 0
            </p>
          </div>
          <div id={TrollboxCSS.chatContainer}>
            <div id={TrollboxCSS.messages}>
              {state.messages.map((message) => (
                <>
                  <div
                    className={TrollboxCSS.message}
                    key={`${message.createdAt}${message.message}${message.name}`}
                  >
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

                      {message.message}
                    </p>
                  </div>
                  <hr></hr>
                </>
              ))}
            </div>
            <form id={TrollboxCSS.chatForm} onSubmit={(e) => saveMessage(e)}>
              <input
                onChange={onChange}
                placeholder="Type to chat. Enter to submit."
                name="message"
                required
                value={form.message}
              />{" "}
              <button type="submit">
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
