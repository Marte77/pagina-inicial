import "./App.css";
import "98.css";

import { isMobile } from "react-device-detect";
import { SnackbarWrapper } from "./components/main-page/snackbarWrapper";
import { MobileWarning } from "./components/main-page/mobileWarning";
import { WhatIWorkWith } from "./components/main-page/whatIWorkWith";
import { Bio } from "./components/main-page/bio";
import { Socials } from "./components/main-page/socials";
import { Buttons88x31 } from "./components/main-page/88x31buttons";
import { MusicPlayer } from "./components/main-page/musicPlayer";

import spamton_cropped from "./audio/spamton_cropped.mp3"
import bliss from './images/bliss.png'

import under_construction from './images/under_construction.png'

function closeTab(e) {
  window.opener = null;
  window.open("", "_self");
  window.close();
}

function App() {
  const audio = new Audio(spamton_cropped)
  return (
    <div>
      <div className="title-bar inactive">
        <div className="title-bar-text">martinho tm - resumo</div>
        {
          !isMobile &&
          <img alt="under_construction" src={under_construction}/>
        }
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
    </div>
  );
}




export default App;
