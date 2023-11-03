import React from 'react'
import styles from '../../App.module.css';
const Ul98: React.FC<any> = ({ ...props}) => {
    let classname = props.className === undefined ? `${styles["ul98"]}` : `${styles["ul98"]} ${props.className}`
    let {className, ...proops} = props
    return (
        <ul className={classname} {...proops}>{props.children}</ul>
    )
}
const Li98: React.FC<any> = ({ ...props}) => {
    let classname = props.className === undefined ? `${styles["li98"]}` : `${styles["li98"]} ${props.className}`
    let {className, ...proops} = props
    return (
        <li className={classname} {...proops}>{props.children}</li>
    )
}
const Button98: React.FC<any> = React.forwardRef( (props, ref) => {
    console.log(props, `${styles["button98"]} ${props.className}`)
    let classname = props.className === undefined ? `${styles["button98"]}` : `${styles["button98"]} ${props.className}`
    let {className, ...proops} = props
    return (
        <button ref={ref}className={classname} {...proops}></button>
    )
});
const Label98: React.FC<any> = ({ ...props}) => {
    let classname = props.className === undefined ? `${styles["label98"]}` : `${styles["label98"]} ${props.className}`
    let {className, ...proops} = props
    return (
        <label className={classname} {...proops}>{props.children}</label>
    )
}
const Input98: React.FC<any> = ({ ...props}) => {
    let classname = props.className === undefined ? `${styles["input98"]}` : `${styles["input98"]} ${props.className}`
    let {className, ...proops} = props
    return (
        <input className={classname} {...proops}>{props.children}</input>
    )
}
const A98: React.FC<any> = ({ ...props}) => {
    let classname = props.className === undefined ? `${styles["a98"]}` : `${styles["a98"]} ${props.className}`
    let {className, ...proops} = props
    return (
        <a className={classname} {...proops}>{props.children}</a>
    )
}
const Details98: React.FC<any> = ({ ...props}) => {
    let classname = props.className === undefined ? `${styles["details98"]}` : `${styles["details98"]} ${props.className}`
    let {className, ...proops} = props
    return (
        <details className={classname} {...proops}>{props.children}</details>
    )
}
const Summary98: React.FC<any> = ({ ...props}) => {
    let classname = props.className === undefined ? `${styles["details98"]}` : `${styles["details98"]} ${props.className}`
    let {className, ...proops} = props
    return (
        <summary className={classname} {...proops}>{props.children}</summary>
    )
}
const Table98: React.FC<any> = ({ ...props}) => {
    let classname = props.className === undefined ? `${styles["table98"]}` : `${styles["table98"]} ${props.className}`
    let {className, ...proops} = props
    return (
        <table className={classname} {...proops}>{props.children}</table>
    )
}
const THead98: React.FC<any> = ({ ...props}) => {
    let classname = props.className === undefined ? `${styles["thead98"]}` : `${styles["thead98"]} ${props.className}`
    let {className, ...proops} = props
    return (
        <thead className={classname} {...proops}>{props.children}</thead>
    )
}
const TBody98: React.FC<any> = ({ ...props}) => {
    let classname = props.className === undefined ? `${styles["tbody98"]}` : `${styles["tbody98"]} ${props.className}`
    let {className, ...proops} = props
    return (
        <tbody className={classname} {...proops}>{props.children}</tbody>
    )
}
const TR98: React.FC<any> = ({ ...props}) => {
    let classname = props.className === undefined ? `${styles["tr98"]}` : `${styles["tr98"]} ${props.className}`
    let {className, ...proops} = props
    return (
        <tr className={classname} {...proops}>{props.children}</tr>
    )
}
const Option98: React.FC<any> = ({ ...props}) => {
    let classname = props.className === undefined ? `${styles[".option98"]}` : `${styles[".option98"]} ${props.className}`
    let {className, ...proops} = props
    return (
        <option className={classname} {...proops}>{props.children}</option>
    )
}
const Select98: React.FC<any> = ({ ...props}) => {
    let classname = props.className === undefined ? `${styles[".select98"]}` : `${styles[".select98"]} ${props.className}`
    let {className, ...proops} = props
    return (
        <select className={classname} {...proops}>{props.children}</select>
    )
}
const TextArea98: React.FC<any> = ({ ...props}) => {
    let classname = props.className === undefined ? `${styles[".textarea98"]}` : `${styles[".textarea98"]} ${props.className}`
    let {className, ...proops} = props
    return (
        <textarea className={classname} {...proops}>{props.children}</textarea>
    )
}
const H198: React.FC<any> = ({ ...props}) => {
    let classname = props.className === undefined ? `${styles[".h198"]}` : `${styles[".h198"]} ${props.className}`
    let {className, ...proops} = props
    return (
        <h1 className={classname} {...proops}>{props.children}</h1>
    )
}
const H298: React.FC<any> = ({ ...props}) => {
    let classname = props.className === undefined ? `${styles[".h298"]}` : `${styles[".h298"]} ${props.className}`
    let {className, ...proops} = props
    return (
        <h2 className={classname} {...proops}>{props.children}</h2>
    )
}
const H398: React.FC<any> = ({ ...props}) => {
    let classname = props.className === undefined ? `${styles[".h398"]}` : `${styles[".h398"]} ${props.className}`
    let {className, ...proops} = props
    return (
        <h3 className={classname} {...proops}>{props.children}</h3>
    )
}
const H498: React.FC<any> = ({ ...props}) => {
    let classname = props.className === undefined ? `${styles[".h498"]}` : `${styles[".h498"]} ${props.className}`
    let {className, ...proops} = props
    return (
        <h4 className={classname} {...proops}>{props.children}</h4>
    )
}
const U98: React.FC<any> = ({ ...props}) => {
    let classname = props.className === undefined ? `${styles[".u98"]}` : `${styles[".u98"]} ${props.className}`
    let {className, ...proops} = props
    return (
        <u className={classname} {...proops}>{props.children}</u>
    )
}
const Legend98: React.FC<any> = ({ ...props}) => {
    let classname = props.className === undefined ? `${styles[".legend98"]}` : `${styles[".legend98"]} ${props.className}`
    let {className, ...proops} = props
    return (
        <legend className={classname} {...proops}>{props.children}</legend>
    )
}
const Fieldset98: React.FC<any> = ({ ...props}) => {
    let classname = props.className === undefined ? `${styles[".fieldset98"]}` : `${styles[".fieldset98"]} ${props.className}`
    let {className, ...proops} = props
    return (
        <fieldset className={classname} {...proops}>{props.children}</fieldset>
    )
}
const Pre98: React.FC<any> = ({ ...props}) => {
    let classname = props.className === undefined ? `${styles[".pre98"]}` : `${styles[".pre98"]} ${props.className}`
    let {className, ...proops} = props
    return (
        <pre className={classname} {...proops}>{props.children}</pre>
    )
}
const Code98: React.FC<any> = ({ ...props}) => {
    let classname = props.className === undefined ? `${styles[".code98"]}` : `${styles[".code98"]} ${props.className}`
    let {className, ...proops} = props
    return (
        <code className={classname} {...proops}>{props.children}</code>
    )
}
const Menu98: React.FC<any> = ({ ...props}) => {
    let classname = props.className === undefined ? `${styles[".menu98"]}` : `${styles[".menu98"]} ${props.className}`
    let {className, ...proops} = props
    return (
        <menu className={classname} {...proops}>{props.children}</menu>
    )
}
export {
    Ul98,
    Li98,
    Button98,
    Label98,
    Input98,
    A98,
    Details98,
    Summary98,
    Table98,
    Option98,
    Select98,
    TextArea98,
    H198,
    H298,
    H398,
    H498,
    U98,
    THead98,
    TBody98,
    TR98,
    Legend98,
    Fieldset98,
    Pre98,
    Code98,
    Menu98,
}