import { useState } from "react";
import { Window } from "./window";
import styles from "../../App.module.css";
import { Label98, Input98 } from "../html_tags/html";

type MusicPlayerProps = {
    music?: HTMLAudioElement,
	style?: React.CSSProperties,
}

export function MusicPlayer(props: MusicPlayerProps){
    const [value, setValue] = useState(0)
    const [hasPlayed, setHasPlayed] = useState(false)
    const audio = props.music
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
        <Window title="Volume" style={props.style}>
            <div className={styles["field-row"]} style={{padding:2}}>
                <Label98 htmlFor="range26">Low</Label98>
                <Input98 style={{padding:'4%'}} id="range26" type="range" min="0" max="10" step="1" value={value} onChange={(e:React.ChangeEvent<HTMLInputElement>) => onChange(e)} />
                <Label98 htmlFor="range27">High</Label98>
            </div>
        </Window>
    )
}