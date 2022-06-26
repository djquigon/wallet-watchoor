import { useRef, useEffect } from "react";
import DosboxCSS from "../style/Dosbox.module.css";
import { DosFactory } from "js-dos";
import {FaEject} from "react-icons/fa";

require("js-dos");

const Dos = (window as any).Dos as DosFactory;

/**Hacky fix to edit canvas width and height */
const canvasCSS = `
    .dosbox-container, .dosbox-container canvas {
        width: 100%;
        height: 95%;
    }
`

const DosPlayer = ({game, exitGame}) => {    
    const ref = useRef<HTMLCanvasElement>(null);


    useEffect(() => {
        const gameName = game.slice(game.lastIndexOf('/') + 1, game.lastIndexOf('.')) + ".EXE"
        if (ref !== null && game !== null) {
            const ciPromise = Dos(ref.current as HTMLCanvasElement, {
                wdosboxUrl: "https://js-dos.com/6.22/current/wdosbox.js",
                cycles: "auto",
                autolock: false,
            }).then((runtime) => {
                return runtime.fs.extract(game).then(() => {
                    return runtime.main(["-c", gameName]);
                });
            });

            return () => {
                ciPromise.then((ci) => {
                    ci.exit()
                });
            };
        }
        console.log('here')
    }, [ref, game]);

    return (
        <div id={DosboxCSS.gameContainer}>
            <style>{canvasCSS}</style>
            <button id={DosboxCSS.ejectBtn} onClick={exitGame}><FaEject/> Eject</button>
            <canvas ref={ref} />
        </div>
    )
}

export default DosPlayer;