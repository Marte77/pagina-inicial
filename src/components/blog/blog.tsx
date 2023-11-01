import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const mainURL = 'https://raw.githubusercontent.com/Marte77/pagina-inicial/main/blog-md/'

export function Blog(){
    const navigate = useNavigate();
    const [pagesList, setList] = useState([])
    useEffect(()=>{
        async function getLista()  {
            try {
                let res = await axios.get(mainURL + 'blogs.md')
                let r = res.data.split('\n')
                setList(r)
            } catch (error) {
                console.error(error)
            }
        }
        getLista()
    }, [])

    const handleClick = () => {
        navigate("/");
    }
    return (
    <>
        <div className="title-bar inactive">
        <div className="title-bar-text">martinho tm - resumo</div>
        <div className="title-bar-controls">
            <button aria-label="Close" onClick={handleClick}></button>
        </div>

        </div>
    </>)
}