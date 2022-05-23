import { useEffect, useState, useReducer } from "react";
import Gun from "gun";
import TrollboxCSS from "../style/Trollbox.module.css";
import WindowHeader from "./WindowHeader";

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

  function saveMessage() {
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
        <div id={TrollboxCSS.chatContainer}>
          <div id={TrollboxCSS.messages}>
            {state.messages.map((message) => (
              <>
                <div
                  className={TrollboxCSS.message}
                  key={`${message.createdAt}${message.message}${message.name}`}
                >
                  <p>
                    [
                    {message.createdAt.substring(
                      message.createdAt.indexOf("T") + 1,
                      message.createdAt.indexOf(".")
                    )}
                    ]
                  </p>
                  <p>
                    {`${message.name.substring(
                      0,
                      6
                    )}...${message.name.substring(message.name.length - 4)}`}
                    :
                  </p>
                  <p>{message.message}</p>
                </div>
                <hr></hr>
              </>
            ))}
          </div>
          <div id={TrollboxCSS.chatForm}>
            <input
              onChange={onChange}
              placeholder="Message"
              name="message"
              value={form.message}
            />{" "}
            <button onClick={saveMessage}>Send Message</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trollbox;
