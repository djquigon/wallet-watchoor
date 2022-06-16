import { useEffect, useState, useRef } from "react";
import TrollboxCSS from "../style/Trollbox.module.css";
import WindowHeader from "./WindowHeader";
import makeBlockie from "ethereum-blockies-base64";
import { MdSend } from "react-icons/md";
import InputEmoji from "react-input-emoji";
import { AiOutlineLoading } from "react-icons/ai";
import { onValue, ref, push } from "firebase/database";

const Trollbox = ({
  database,
  account,
  removeItem,
  addItem,
  isItemStatic,
  setItemStatic,
}) => {
  const [messages, setMessages] = useState([]);

  const [formMessage, setFormMessage] = useState("");

  const submitButton = useRef(null);

  const [gunLength, setGunLength] = useState(null);

  //read
  useEffect(() => {
    onValue(ref(database, `messages/`), (snapshot) => {
      let data = snapshot.val();
      data = Object.keys(data)
        .map((key) => data[key])
        .reverse();
      setGunLength(data.length);
      setMessages(data);
    });
  }, []);

  //write
  const saveMessage = (e) => {
    e.preventDefault();
    //if empty string or only spaces, or too long
    if (/^ *$/.test(formMessage) || formMessage.length > 132) {
      alert(formMessage.length);
      return;
    }
    const date = new Date().toISOString();
    push(ref(database, `messages/`), {
      user: account,
      message: formMessage,
      dateAdded: date,
    });
    setFormMessage("");
  };

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
            {messages.length < gunLength ? (
              <AiOutlineLoading
                style={{ marginTop: "40%" }}
                className="loadingSvg"
              />
            ) : (
              <ol id={TrollboxCSS.messages}>
                {messages.map((message) => (
                  <li
                    key={`${message.dateAdded}${message.message}${message.user}`}
                  >
                    <div className={TrollboxCSS.message}>
                      <p>
                        {`[${message.dateAdded.substring(
                          message.dateAdded.indexOf("T") + 1,
                          message.dateAdded.indexOf(".")
                        )}]\u00A0`}

                        <img
                          width="14px"
                          src={makeBlockie(message.user)}
                          alt="avatar"
                        ></img>
                        {` ${message.user.substring(
                          0,
                          6
                        )}...${message.user.substring(
                          message.user.length - 4
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
