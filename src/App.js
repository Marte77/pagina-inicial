import "./App.css";
import "98.css";
import { useState, useRef } from "react";
import Draggable from "react-draggable";
import { ClickAwayListener, Grid, Tooltip } from "@mui/material";
import github from './images/github.svg'
import twitter from './images/twitter.svg'
import { isMobile } from "react-device-detect";
import get_java_now from './images/gifs/get_java_now.gif'
import hate_squarespace from './images/gifs/hate_squarespace.png'
import vscode_button from './images/gifs/vscode_button.gif'
import powered_by_debian from './images/gifs/powered_by_debian.gif'
import mozilla_gecko from './images/gifs/mozilla_gecko.gif'
import made_with_macos1 from './images/gifs/made_with_macos1.gif'
import lol from './images/gifs/lol.gif'
import hello_kitty from './images/gifs/hello_kitty.gif'


function closeTab(e) {
  window.opener = null;
  window.open("", "_self");
  window.close();
}

function ExpandableSection(props) {
  let title = props.title, arrayOfContents=props.arrayOfContents
  let open = props.open === undefined ? true : props.open
  let conteudo = []
  arrayOfContents.forEach(function(content, index) {
    conteudo.push(
      <li key={index}>
        {content}
      </li>
    )
  });
  return (
    <details open={open}>
      <summary>{title}</summary>
      <ul>
        {conteudo}
      </ul>
    </details>
  )
}

const windowButtons = {
  close:'Close',
  hide:'Minimize',
  max:'Maximize',
  help:'Help'
}

function WhatIWorkWith(props) {
  return (
    <Window pos={{x:25,y:65}}
    tooltip="this tooltip fits well with the theme"
    title='What I work with' buttons={[windowButtons.help, windowButtons.hide]}>
        <ul className="tree-view">
          <li>
            <ExpandableSection
              title="Work experience"
              arrayOfContents={[
                <ExpandableSection
              title="My current job at Altice Labs"
              arrayOfContents={["Java using JSLEE", "SIP"]}
            />,
            <ExpandableSection
              title="In IPV Health+ (project I participated in during school)"
              arrayOfContents={["Flutter/Dart", "MySQL", "PHP"]}
            />
              ]}
            />
            <ExpandableSection
              title="Outside of work / as Hobby"
              open={false}
              arrayOfContents={[
                "Rust, getting better at it",
                "Learning WebGPU (using Rust)",
                "Flutter/Dart",
                "Python (for automation)",
                "Node.js",
                "Java",
                "C++, mostly for Arduino",
                "decent at using linux"
              ]}
            />
          </li>
        </ul>
    </Window>
  );
}

function Window(props) {
  const nodeRef = useRef(null)
  let [isWindowOpen, setWindowOpen] = useState(true)
  let [openTooltip, setOpenTooltip] = useState(false)
  const handleTooltipClose = (e) =>{
    setOpenTooltip(false)
    if(window.safari !== undefined){
      console.log('yes the tooltip button moves, i do not know why nor do i want to')
    }
  }
  const handleTooltipOpen = (e) =>{
    setOpenTooltip(true)
  }
  let buttons = []
  let tooltip = props.tooltip
  if(props.buttons)
  for (let btn of props.buttons) {
    if (btn === windowButtons.hide) {
      buttons.push(
        <button
          key={btn}
          onClick={() => setWindowOpen(!isWindowOpen)}
          aria-label="Minimize"
        ></button>
      );
    } else if (btn === windowButtons.help) {
      if (tooltip !== undefined) {
        buttons.push(
          <ClickAwayListener key={btn} onClickAway={handleTooltipClose}>
            <div>
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                title={tooltip}
                disableHoverListener
                disableFocusListener
                disableTouchListener
                open={openTooltip}
                onClose={handleTooltipClose}
                arrow
              >
                <button aria-label={btn} onClick={handleTooltipOpen}></button>
              </Tooltip>
            </div>
          </ClickAwayListener>
        );
      } else {
        buttons.push(
          <button
            aria-label={btn}
            key={btn}
          ></button>
        );
      }
    } else {
      buttons.push(<button key={btn} aria-label={btn}></button>);
    }
  }
  if(isMobile){
    props.pos.x=0
    props.pos.y=0
  }
  return (
    <Draggable
    nodeRef={nodeRef}
    defaultPosition={{
      x:props.pos.x,y:props.pos.y
    }}
    bounds='parent'
    >
      <div ref={nodeRef}>
        <div className="window" style={{ width: "300px" }}>
          <div className="title-bar">
            <div className="title-bar-text">{props.title}</div>
            <div className="title-bar-controls">
              {buttons}
            </div>
          </div>
          {isWindowOpen ?
          <div className="window-body">
              {props.children}
          </div>
            : null}
        </div>
      </div>
    </Draggable>
  );
}

function Bio(props) {
  const minhaIdade = Math.abs((new Date(new Date()- new Date("2001/7/7"))).getUTCFullYear() - 1970)
  
  return (
    <Window buttons={[windowButtons.hide]} title='About me' pos={{x:-200,y:-250}}>
        <ul className="tree-view">
          I'm Martinho, I'm {minhaIdade}&nbsp;years old software engineer. <br/>
          I'm currently working at Altice Labs in the ABC team.<br/>
        </ul>
    </Window>
  )
}

function Socials(props) {
  return (
    <Window title="Socials"  pos={{x:-500,y:100}}>
      <ul className="tree-view">
        <li className="tree-view">
          <a href="https://github.com/Marte77/" target="_blank" rel="noopener noreferrer">
            <img src={github} width={30} height={30} alt="github logo"/>
          </a>
          &nbsp;&nbsp;&nbsp;
          <a href="https://twitter.com/MARTLNHO/" target="_blank" rel="noopener noreferrer">
            <img src={twitter} width={30} height={30} alt="twitter logo"/>
          </a>
        </li>
      </ul>
    </Window>
  )
}

function App() {
  return (
    <>
      <div className="title-bar inactive">
        <div className="title-bar-text">martinho tm - resumo</div>
        <div className="title-bar-controls">
          <button aria-label="Close" onClick={closeTab}></button>
        </div>
      </div>
      <div className="App">
        {/*<header className="App-header">martinho</header>*/}
        <WhatIWorkWith />
        <Bio/>
        <Socials/>
        <Buttons88x31/>
      </div>
    </>
  );
}
function Buttons88x31(props) {
  return (
    <Grid container spacing={2} position="fixed" bottom={1}>
      <Grid xs={4} ></Grid>
      <Grid xs={4} style={{textAlign:"center", fontSize:22}}>
        made with <a href="https://jdan.github.io/98.css/#window" target="_blank" rel="noopener noreferrer" style={{color:"white"}}>98.css</a> and react
      </Grid>
      <Grid xs={4}></Grid>
      <Grid xs={3.32}></Grid>
      <Grid xs={0.69}><img alt="get_java_now" src={get_java_now}></img></Grid>
      <Grid xs={0.69}><img alt="hate_squarespace" src={hate_squarespace}></img></Grid>
      <Grid xs={0.69}><img alt="vscode_button" src={vscode_button}></img></Grid>
      <Grid xs={0.69}><img alt="powered_by_debian" src={powered_by_debian}></img></Grid>
      <Grid xs={0.69}><img alt="mozilla_gecko" src={mozilla_gecko}></img></Grid>
      <Grid xs={0.69}><img alt="made_with_macos1" src={made_with_macos1}></img></Grid>
      <Grid xs={0.69}><img alt="lol" src={lol}></img></Grid>
      <Grid xs={0.69}><img alt="hello_kitty" src={hello_kitty}></img></Grid>
    </Grid>
  )
}

export default App;
