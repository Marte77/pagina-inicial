import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
const mainURL = 'https://raw.githubusercontent.com/Marte77/pagina-inicial/main/blog-md/'
const mainURLFile = mainURL + '/list/'

type BlogListProps = {
    list: Array<string> | undefined
}
type BlogFileProps = {
    name: string
}

function BlogList(props: BlogListProps){
    return (
        <>
            {props.list?.map(function(val, index,){
                return (
                    <div>
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
        <>
        <ReactMarkdown>
            {content === undefined ? "" : content}
        </ReactMarkdown>
        </>
    )
}

export function Blog(){
    const navigate = useNavigate();
    const {name} = useParams()
    const [pagesList, setList] = useState<Array<string>>()
    useEffect(()=>{
        async function getLista()  {
            try {
                let res = await axios.get(mainURL+'list.md')
                let r = res.data.split('\n')
                setList(r)
            } catch (error) {
                console.error(error)
            }
        }
        if (name === undefined)
            getLista()
    }, [name])

    const handleClick = () => {
        navigate("/");
    }
    return (
    <>
        <div className="title-bar inactive">
            <div className="title-bar-text">{name}</div>
            <div className="title-bar-controls">
                <button aria-label="Close" onClick={handleClick}></button>
            </div>
            {
                name === undefined ?
                <BlogList list={pagesList}/> : <BlogFile name={name}/>
            }
        </div>
    </>)
}