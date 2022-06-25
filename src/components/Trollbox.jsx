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
  trollboxFormMessage,
  setTrollboxFormMessage,
}) => {
  const [messages, setMessages] = useState([]);

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
  }, [database]);

  //write
  const saveMessage = (e) => {
    e.preventDefault();
    //if empty string or only spaces, or too long
    if (/^ *$/.test(trollboxFormMessage) || trollboxFormMessage.length > 400) {
      alert("Your message is too long...");
      return;
    }
    const date = new Date().toISOString();
    push(ref(database, `messages/`), {
      user: account,
      message: trollboxFormMessage,
      dateAdded: date,
    });
    setTrollboxFormMessage("");
  };

  const formatTransaction = (message, flag, fromIndexOffset, toIndexOffset) => {
    return message.substring(
      message.indexOf(flag) + fromIndexOffset,
      message.indexOf(flag) + toIndexOffset
    );
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

                      {message.message.includes("TRANSACTION = ") ? (
                        <>
                          Hash:
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href={`https://etherscan.io/tx/${formatTransaction(
                              message.message,
                              "*",
                              2,
                              68
                            )}`}
                          >
                            {`${formatTransaction(
                              message.message,
                              "*",
                              2,
                              8
                            )}...
                              ${formatTransaction(message.message, "*", 64, 68)}
                              `}
                          </a>
                          <br />
                          From:{" "}
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href={`https://etherscan.io/address/${formatTransaction(
                              message.message,
                              "@",
                              2,
                              44
                            )}`}
                          >
                            {`
                              
                              ${formatTransaction(
                                message.message,
                                "@",
                                2,
                                8
                              )}...
                              ${formatTransaction(message.message, "@", 40, 44)}
                              `}
                          </a>
                          <br />
                          To:{" "}
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href={`https://etherscan.io/address/${formatTransaction(
                              message.message,
                              "%",
                              2,
                              44
                            )}`}
                          >
                            {`
                              
                              ${formatTransaction(
                                message.message,
                                "%",
                                2,
                                8
                              )}...
                              ${formatTransaction(message.message, "%", 40, 44)}
                              `}
                          </a>
                          <br />
                          Logs:{" "}
                          <>
                            {message.message.substring(
                              message.message.indexOf("#") + 1,
                              message.message.indexOf("^")
                            )}
                          </>
                          <br />
                          Value:{" "}
                          <>
                            {message.message.substring(
                              message.message.indexOf("$") + 1,
                              message.message.indexOf("Ξ") + 1
                            )}
                          </>
                          <br />
                          Timestamp:{" "}
                          <>
                            {message.message.substring(
                              message.message.indexOf("!") + 1
                            )}
                          </>
                        </>
                      ) : (
                        <>{message.message}</>
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </>
      )}
      <form id={TrollboxCSS.chatForm} onSubmit={(e) => saveMessage(e)}>
        <InputEmoji
          onChange={setTrollboxFormMessage}
          placeholder=""
          name="message"
          maxLength={132}
          fontSize="14px"
          fontFamily="monospace"
          borderRadius="24px"
          borderColor="transparent"
          onEnter={() => submitButton.current.click()}
          required
          value={trollboxFormMessage}
        />{" "}
        <button ref={submitButton} type="submit">
          <MdSend />
        </button>
      </form>
    </div>
  );
};

export default Trollbox;
