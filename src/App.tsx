import styles from "./App.module.css";

import { isMobile } from "react-device-detect";
import { SnackbarWrapper } from "./components/main-page/snackbarWrapper";
import { MobileWarning } from "./components/main-page/mobileWarning";
import { WhatIWorkWith } from "./components/main-page/whatIWorkWith";
import { Bio } from "./components/main-page/bio";
import { Socials } from "./components/main-page/socials";
import { Buttons88x31 } from "./components/main-page/88x31buttons";
import { MusicPlayer } from "./components/main-page/musicPlayer";
import { useNavigate } from "react-router-dom";
import { A98, Button98 } from "./components/html_tags/html";

import spamton_cropped from '/audio/spamton_cropped.mp3'
import bliss from '/images/bliss.png'

import under_construction from '/images/under_construction.png'
import { Conexoes } from "./components/main-page/conexoes";
import { useState } from "react";
import { RandomSong } from "./components/main-page/randomSong";

function closeTab() {
  window.opener = null;
  window.open("", "_self");
  window.close();
}

export function App() {
  const audio = new Audio(spamton_cropped)
  const navigate = useNavigate();
  const handleClick = () => {
      navigate("/blog");
  }
  const [removeConexoes, setRemoveConexoes] = useState(false);
  const [removeRandomSong, setRemoveRandomSong] = useState(false);
  return (
    <div style={{
      margin: 0,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',sans-serif",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale"
    }} className={`${styles["body98"]}`}>
      <div className={`${styles["title-bar"]} ${styles["inactive"]}`}>
        <div className={styles["title-bar-text"]}>martinho tm - resumo</div>
        {
          !isMobile &&
          <img alt="under_construction" src={under_construction}/>
        }
        <div className={styles["title-bar-controls"]}>
          <Button98 aria-label="Help" onClick={handleClick}></Button98>
          <Button98 aria-label="Close" onClick={closeTab}></Button98>
        </div>
      </div>
      <div className={styles.App} style={{backgroundImage:bliss}}>
        {/*<header className="App-header">martinho</header>*/}
        
        {
          isMobile &&
            <A98  className="rainbowa" href="https://mvg.lol/joguinhos" style={{cursor:'pointer',fontSize:'16px', fontWeight:'bold'}}>
              <button className="rainbowa" style={{paddingTop:'4px', fontSize:'24px', fontWeight:'bold', background:'#c0c0c0', fontFamily: "Pixelated MS Sans Serif"}}>
                <div className="rainbowa" style={{ }}>JOGAR CONEXOES</div>
              </button>
            </A98>
        }
        {
          isMobile && 
          <MobileWarning/>
        }
        {
          !isMobile && 
          <SnackbarWrapper message="Try dragging the windows!"/>
        }
        <WhatIWorkWith style={{zIndex:9}} />
        <Bio style={{zIndex:9}}/>
        <Socials style={{zIndex:8}}/>
        <MusicPlayer music={audio} style={{zIndex:8}}/>
        <Buttons88x31/>
        {
          !removeRandomSong &&
          <RandomSong style={{zIndex:8}} onClose={()=>setRemoveRandomSong(!removeRandomSong)}/>
        }
        {
          !removeConexoes && !isMobile &&
            <Conexoes onClose={()=>setRemoveConexoes(!removeConexoes)}/>
        }
      </div>
    </div>
  );
}




export default App;
