import { useState } from "react";
import { Window } from "./window";
export function MusicPlayer(props){
    const [value, setValue] = useState(0)
    const [hasPlayed, setHasPlayed] = useState(false)
    let audio = props.music
    if(audio === undefined) throw Error("No audio set!!")
    const onChange = (e) => {
        setValue(parseInt(e.target.value))
        if(!hasPlayed){
            setHasPlayed(true)
            audio.play() 
        }
        audio.volume = value === 0 ? 0 : (value-1)/10
    }
    return (
        <Window>
            <div className="field-row" style={{padding:2}}>
                <label htmlFor="range25">Volume:</label>
                <label htmlFor="range26">Low</label>
                <input id="range26" type="range" min="0" max="10" step="1" value={value} onChange={e => onChange(e)} />
                <label htmlFor="range27">High</label>
            </div>
        </Window>
    )
}