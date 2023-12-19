import React from "react"
import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
const MenuButtonList = styled.div`
    position: absolute;
    bottom: 30px;
    left: 30px;
    display: flex;
    flex-direction: column;
    gap: 30px;
`
export default ()=> {
    return (
        <MenuButtonList>
            <MenuButton to={"/new_campaign"} title="New Campaign"/>
            <MenuButton to={"/load_saves"} title="Load Saved Games"/>
            <MenuButton to={"/multiplayer"} title="Join Friends"/>
            <MenuButton to={"/settings"} title="Settings"/>
            <MenuButton title="Exit Game" onClick={(e)=>{
                //@ts-expect-error
                window.backend?.invoke("windowControl", "close")
            }}/>
        </MenuButtonList>
    )
}
const MenuButtonEl = styled.div`
    height: 40px;
    width: 200px;
    background-color: red;
    color: white;
    display: flex;
    align-items: center;
    padding: 10px 30px;
    border-radius: 10px;
    &:hover {
        transform:translateX(20px)
    }
`
function MenuButton(props:{title:string, to?:string, onClick?:React.MouseEventHandler<HTMLAnchorElement>}) {
    return (
        <Link to={props.to} onClick={props.onClick} style={{"textDecoration":"none"}}>
            <MenuButtonEl>{props.title}</MenuButtonEl>
        </Link>
    )
}