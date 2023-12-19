import React, { useContext, useEffect } from "react"
import { HashRouter , Route, Routes } from "react-router-dom";
import MainMenu from "./Pages/MainMenu"
import GamePage from "./Pages/GamePage"
import NewCampaign from "./Pages/NewCampaign"
import Page404 from "./Pages/Page404"
import SettingsPage from "./Pages/Settings"
import { GameEngine } from "@GameEngine/index";

let engine:GameEngine = new GameEngine()
window.setEngineAppPath = (app_path:string)=>{
    engine.setConfigs({
        app_path
    })
}
const EngineContext = React.createContext(undefined)
export function useEngine():GameEngine {
    return useContext(EngineContext)
}
export default ()=> {
    return (
        <EngineContext.Provider value={engine}>
            <HashRouter >
                <Routes>
                    <Route path="/" element={<MainMenu />}/>
                    <Route path="/game" element={<GamePage />}/>
                    <Route path="/new_campaign" element={<NewCampaign />}/>
                    <Route path="/settings" element={<SettingsPage />}/>
                    <Route path="*" element={<Page404 />}/>
                </Routes>
            </HashRouter >
        </EngineContext.Provider>
    )
}