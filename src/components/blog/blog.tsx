import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import MarkdownPreview from '@uiw/react-markdown-preview';
import styles from "../../App.module.css";

const mainURL = 'https://raw.githubusercontent.com/Marte77/pagina-inicial/main/blog-md/'
const mainURLFile = mainURL + '/list/'

type BlogListProps = {
    list: Array<string> | undefined
}
type BlogFileProps = {
    name: string
}

function BlogList(props: BlogListProps){
    const navigate = useNavigate();
    return (
        <>
            {props.list?.map(function(val){
                return (
                    <div onClick={()=>navigate("/blog/"+val)} key={val.slice(0,6)[0]}>
                        {val}
                        <br/>
                    </div>
                )
            })}
        </>
    )
}

function BlogFile(props: BlogFileProps){
    const [content, setContent] = useState<string>()
    useEffect(()=>{
        async function getFile()  {
            try {
                let res = await axios.get(mainURLFile + props.name)
                setContent(res.data)
            } catch (error) {
                console.error(error)
            }
        }
        getFile()
    }, [props.name])
    return (
        <div>
            <MarkdownPreview source={content}/>
        </div>
    )
}

export function Blog(){
    const navigate = useNavigate();
    const {name} = useParams()
    const [pagesList, setList] = useState<Array<string>>()
    useEffect(()=>{
        async function getLista()  {
            try {
                let res = await axios.get(mainURL+'list.md', {
                    headers : {
                        "Accept": "text/plain",
                    }
                })
                let r = res.data.split('\n')
                setList(r)
            } catch (error) {
                console.error(error)
            }
        }
        if (name === undefined)
            getLista()
        //let x = document.styleSheets.item(2)
        //if (x !== null)
        //    for (let i = 0; i < x.cssRules.length; i++) {
        //        x.deleteRule(i)
        //    }
    }, [name])

    const handleClick = () => {
        navigate("/");
    }
    return (
    <>
        <div>
            {
            <div className={`${styles["title-bar"]} ${styles["inactive"]}`}>
                <div className={styles["title-bar-text"]}>{name === undefined ? "List" : name}</div>
                <div className={styles["title-bar-controls"]}>
                    <button className={styles["button98"]} aria-label="Close" onClick={handleClick}></button>
                </div>
            </div>
            }
        </div>
        {name === undefined ? <BlogList list={pagesList}/> : <BlogFile name={name}/>}
    </>)
}