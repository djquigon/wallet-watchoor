import { useState } from "react";
import DosPlayer from "./DosPlayer.tsx";
import DosboxCSS from "../style/Dosbox.module.css";
import WindowHeader from "./WindowHeader";

const DOOM_URL = "https://loganscheid.dev/assets/games/DOOM.zip";
const SABA_URL = "https://loganscheid.dev/assets/games/SABA.zip";
const MSPAC_URL = "https://loganscheid.dev/assets/games/MSPAC.zip";
const CHESS_URL = "https://loganscheid.dev/assets/games/CHESS.zip";

const Dosbox = ({ removeItem, addItem, isItemStatic, setItemStatic }) => {
  const [game, setGame] = useState(null);

  const exitGame = () => {
    setGame(null);
  };

  const startGame = (gameName) => {
    setGame(gameName);
  };

  /**Add and remove dosplayer based on clicked game buttons, doom adds doom dosplayer.tsx, exit deletes dosplayer element */
  return (
    <div id={DosboxCSS.dosbox}>
      <WindowHeader
        window="Dosbox"
        removeItem={removeItem}
        addItem={addItem}
        isItemStatic={isItemStatic}
        setItemStatic={setItemStatic}
      />
      {game ? (
        <DosPlayer game={game} exitGame={exitGame} startGame={startGame} />
      ) : (
        <>
          <div id={DosboxCSS.controls}>
            <button onClick={() => setGame(DOOM_URL)}>Doom</button>
            <button onClick={() => setGame(SABA_URL)}>Acid Tetris</button>
            <button onClick={() => setGame(MSPAC_URL)}>Ms.Pac-Man</button>
            <button onClick={() => setGame(CHESS_URL)}>Chess88</button>
          </div>
          <div id={DosboxCSS.gameScreen}></div>
        </>
      )}
    </div>
  );
};

export default Dosbox;
