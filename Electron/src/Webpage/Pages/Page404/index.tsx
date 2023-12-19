import React from "react"
import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
const Message = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 41px;
    text-align: center;
    line-height: 2;
`
export default ()=> {
    return (
        <Message>
            Uh oh, how'd you fuck up my shit this time?
            <br />
            Anytime I send you something, you break it...
            <br />
            Alright.... Click the link below to go to the main menu....
            <Link to={"/"}>Back To Main Menu</Link>
            <Link to={"/"} onClick={()=>{
                window.history.back();
            }}>Back</Link>
        </Message>
    )
}