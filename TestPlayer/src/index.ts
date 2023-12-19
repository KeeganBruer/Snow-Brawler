window.require = ()=>{}

import { GameEngine } from "./GameEngine"

console.log("hi oby")
let engine:GameEngine = new GameEngine();
//@ts-expect-error
window.engine = engine;

window.onload = async ()=>{
    engine.setConfigs({
        app_path:"http://localhost:3000",
        type:"new_campaign",
        save_name:"demo"
    })
    await engine.onDOMLoaded();

}