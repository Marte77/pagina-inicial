import "./App.css";
import "98.css";

import { isMobile } from "react-device-detect";
import { SnackbarWrapper } from "./components/snackbarWrapper";
import { MobileWarning } from "./components/mobileWarning";
import { WhatIWorkWith } from "./components/whatIWorkWith";
import { Bio } from "./components/bio";
import { Socials } from "./components/socials";
import { Buttons88x31 } from "./components/88x31buttons";
import { MusicPlayer } from "./components/musicPlayer";

import spamton_cropped from "./audio/spamton_cropped.mp3"
import bliss from './images/bliss.png'

function closeTab(e) {
  window.opener = null;
  window.open("", "_self");
  window.close();
}

function App() {
  const audio = new Audio(spamton_cropped)
  return (
    <>
      <div className="title-bar inactive">
        <div className="title-bar-text">martinho tm - resumo</div>
        <div className="title-bar-controls">
          <button aria-label="Close" onClick={closeTab}></button>
        </div>
      </div>
      <div className="App" style={{backgroundImage:bliss}}>
        {/*<header className="App-header">martinho</header>*/}
        {
          isMobile && 
          <MobileWarning/>
        }
        {
          !isMobile && 
          <SnackbarWrapper message="Try dragging the windows!"/>
        }
        <WhatIWorkWith />
        <Bio/>
        <Socials/>
        <MusicPlayer music={audio}/>
        <Buttons88x31/>
      </div>
    </>
  );
}




export default App;
