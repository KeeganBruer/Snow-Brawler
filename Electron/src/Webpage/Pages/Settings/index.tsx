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
            <Link to={"/"} onClick={()=>{
                window.history.back();
            }}>Back</Link>
            <h2>Settings</h2>
        </Message>
    )
}