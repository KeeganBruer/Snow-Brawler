import React, { useEffect, useState } from "react"
import styled from "styled-components"
import {GameEngine} from "../../../GameEngine"
import { Link } from "react-router-dom"
import { useEngine } from "@Webpage/index"
const NavLink = styled(Link)`
    color: white;
    z-index: 1;
    position: relative;
`
export default ()=> {
    let engine = useEngine()
    useEffect(()=>{
        engine.onDOMLoaded();
        return ()=>{
            engine.onDOMUnloaded();
        }
    }, [])
    return (
        <>
            <div id="game-container" tabIndex={1}>
                <canvas id="game-canvas"/>
            </div>
            <PauseMenu />
        </>
    )
}


const PauseMenuWrapper = styled.div`
    position: absolute;
    top: 0px;
    height: 100vh;
    left: 0px;
    width: 100%;
    background-color: red;
    transition: top 1s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px; 

    &[data-value="closed"] {
        top: -110%;
    }
`
const MenuButton = styled(Link)`
    color: white;
    text-decoration: none;
    background-color: blue;
    padding: 10px 30px;
    width: 200px;
    text-align: center;
`
function PauseMenu() {
    let engine = useEngine();
    let [isOpen, setIsOpen] = useState(engine.MainMenu.isOpen)
    useEffect(()=>{
        (async ()=>{
            await engine.waitForLoad();
            engine.MainMenu.addListener("open", ()=>{
                setIsOpen(true)
                
            })
            engine.MainMenu.addListener("close", ()=>{
                let launch_configs = {
                    "type":"resume"
                }
                //@ts-expect-error
                window.launch_configs = launch_configs;
                setIsOpen(false)
            })
        })()
    }, [])
    return (
        <PauseMenuWrapper data-value={isOpen ? "open": "closed"}>
            <MenuButton to={"/"} onClick={(e:any)=>{
                e.preventDefault();
                engine.MainMenu.toggle();
            }}>Resume</MenuButton>
            <MenuButton to={"/settings"}>Settings</MenuButton>
            <MenuButton to={"/"}>Exit To Main Menu</MenuButton>
        </PauseMenuWrapper>
    )
}