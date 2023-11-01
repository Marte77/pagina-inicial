import { useState } from "react";
import { Window } from "./window";
import styles from "../../App.module.css";

type MusicPlayerProps = {
    music?: HTMLAudioElement
}

export function MusicPlayer(props: MusicPlayerProps){
    const [value, setValue] = useState(0)
    const [hasPlayed, setHasPlayed] = useState(false)
    let audio = props.music
    if(audio === undefined) throw Error("No audio set!!")
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(parseInt(e.target.value))
        if(!hasPlayed){
            setHasPlayed(true)
            audio!.play() 
            audio!.loop = true
        }
        audio!.volume = value === 0 ? 0 : (value-1)/10
    }
    return (
        <Window title="Volume">
            <div className={styles["field-row"]} style={{padding:2}}>
                <label htmlFor="range26">Low</label>
                <input style={{padding:'4%'}} id="range26" type="range" min="0" max="10" step="1" value={value} onChange={e => onChange(e)} />
                <label htmlFor="range27">High</label>
            </div>
        </Window>
    )
}