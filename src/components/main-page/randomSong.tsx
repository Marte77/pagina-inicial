import { useEffect, useState } from "react";
import { Window } from "./window";
import styles from "../../App.module.css";
import { Innertube, UniversalCache, YTNodes } from 'youtubei.js';
import { WindowButtonsEnum } from "./windowButtonsEnum";
import { Ul98 } from "../html_tags/html";
type RandomSongProps = {
	style?: React.CSSProperties,
    onClose?:(()=>void)
}
const playlistId = "PLyLyJwftT08Wj9-H5bKqkZMdUQ8cBvuzA"
function isOfNonArtistChannel(author: string): boolean {
    return author.indexOf("Trap Nation") >= 0 
    || author.indexOf("Future House") >= 0
    || author.indexOf("Bass Nation") >= 0 
    || author.indexOf("House Nation") >= 0 
    || author.indexOf("UKF") >= 0 
    || author.indexOf("Monstercat") >= 0 
    || author.indexOf("Reinelex Music") >= 0 
    || author.indexOf("DubstepGutter") >= 0 
    || author.indexOf("Liquicity") >= 0 
    || author.indexOf("AirwaveMusicTV") >= 0 
    || author.indexOf("felix 3000") >= 0 
    || author.indexOf("MrSuicideSheep") >= 0 
    || author.indexOf("SuicideSheep") >= 0 
    || author.indexOf("Nik Cooper Music") >= 0 
    || author.indexOf("Trap Arena") >= 0 
    || author.indexOf("Trap City") >= 0 
    || author.indexOf("Ultra Records") >= 0 
    || author.indexOf("NUFORM") >= 0 
    || author.indexOf("No Copyright Sounds") >= 0 
    || author.indexOf("The Drum & Bass Lounge") >= 0 
}

function cleanVideoTitle(title: string): string {
    return title
        .split("[Monstercat Release]").join("")
        .split("[DnB] -").join("")
        .split("[Progressive House] -").join("")
        .split("[Trance] -").join("")
        .split("| TRAP").join("")
        .split("| TRAP").join("")
        .split(/|.*|NCS - Copyright Free Music/).join("")
    .trim()
}
function cleanAuthorName(author: string): string {
    let finalName = author
    if (finalName.indexOf(" - Topic")>=0) {
        if (finalName === "Plus - Topic")
            finalName = "L Plus"
        else finalName = finalName.split(" - Topic").join("")
    }
    if (finalName.indexOf("official"))
        finalName = finalName.split("official").join("")
    if (finalName.indexOf("Music"))
        finalName = finalName.split("Music").join("")
    if (finalName.indexOf("DjEphixa"))
        finalName = "Ephixa"
    if (finalName.indexOf("KovenUKMusic"))
        finalName = "Koven"
    return finalName.trim()
}

export function RandomSong(props:RandomSongProps) {
    const [video, setVideo] = useState<YTNodes.PlaylistVideo | string>("loading...")
    
    useEffect(()=>{
        if (typeof video === 'string') {
            const fn = async () => {
                try {
                    const innerTube = await Innertube.create({
                        cache: new UniversalCache(false), generate_session_locally: true,
                        retrieve_player: false,
                        fetch: (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
                            const dev = false
                            const host = !dev ? `youtubejs-worker.martinho-tavares.workers.dev` : `localhost:8787`
                            const url = typeof input === 'string'
                                ? new URL(input)
                                : input instanceof URL
                                ? input
                                : new URL(input.url);
                            url.pathname = `/youtubejs/proxy${url.pathname}`
                            // Transform the url for use with our proxy.
                            url.searchParams.set('__host', url.host);
                            url.host = host;
                            url.protocol = dev ? 'http' : 'https';
                            const headers = init?.headers
                                ? new Headers(init.headers)
                                : input instanceof Request
                                ? input.headers
                                : new Headers();
                            
                            // Now serialize the headers.
                            url.searchParams.set('__headers', JSON.stringify([ ...headers ]));
                            
                            // Copy over the request.
                            const request = new Request(
                                url,
                                input instanceof Request ? input : undefined
                            );
                            console.log(request.url)
                            headers.delete('user-agent');
                            
                            return fetch(request, init ? {
                                ...init,
                                headers
                            } : {
                                headers
                            });
                        }
                    })
                    
                    const playlist = await innerTube.getPlaylist(playlistId);
                    const items = playlist.items.filter((x) => x instanceof YTNodes.PlaylistVideo);
                    const item = items[Math.floor(Math.random() * items.length)];
                    setVideo(item)
                } catch (e) {
                    console.log("ERRO a fazer fetch", e)
                    setVideo("error")
                }
            }
            fn()
        }
    },[video])
    return (
        <Window title="Random Song" 
            style={props.style} 
            buttons={[WindowButtonsEnum.close]}
            onClose={props.onClose}
            pos={{ x: 0, y: 500 }}
        >
            <Ul98 className={`${styles["tree-view"]} `}>
                {typeof video === 'string' ? video : 
                    <a href={`https://music.youtube.com/watch?v=${video.id}&list=PLyLyJwftT08Wj9-H5bKqkZMdUQ8cBvuzA`}>
                        <h3>{(isOfNonArtistChannel(video.author.name) ? "" : (cleanAuthorName(video.author.name) + " - ")) + cleanVideoTitle(video.title.toString())}</h3>
                        <p>{video.video_info.toString()}</p>
                    </a>
                }
            </Ul98>
        </Window>
    )
}