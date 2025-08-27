import { Window } from "./window";
import { WindowButtonsEnum } from "./windowButtonsEnum";


export function Conexoes(props:Readonly<{onClose:(()=>void)}>): JSX.Element {
    return (
        <Window 
            title="CONEXOES - Via mvg.lol - fui eu que fiz" 
            style={{width:'525px', height:'503px'}}
            buttons={[WindowButtonsEnum.close]}
            onClose={props.onClose}
            >
            <iframe width="500" height="500" title="Conexões" src="https://mvg.lol/joguinhos/#/connections/"></iframe>
        </Window>
    )
}