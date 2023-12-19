import { useEngine } from "@Webpage/index"
import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
const MenuButtonList = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px
`
export default ()=> {
    return (
        <MenuButtonList>
            <h1>New Campaign</h1>
            <StartNewCampaign title="PLAY"/>
            
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
    justify-content: center;
    &:hover {
        transform:scale(1.2);
    }
`
function StartNewCampaign(props:{title:string, onClick?:React.MouseEventHandler<HTMLAnchorElement>}) {
    let engine = useEngine()
    let nav = useNavigate()
    return (
        <Link to={"/game"} onClick={(e)=>{
            if (props.onClick) props.onClick(e)
            console.log("navigation")
            e.preventDefault();
            engine.MainMenu.close();
            engine.setConfigs({
                type:"new_campaign"
            })
            nav("/game")
        }} style={{"textDecoration":"none"}}>
            <MenuButtonEl>{props.title}</MenuButtonEl>
        </Link>
    )
}