import {GameObject} from "./"
import { GameEngine } from "../";
import { Level } from "../Levels";
import CollidableGameObject from "./Collidable";
import { Box, Position } from "../Position";
import Interactable from "./Interactable";
export const LevelDoorTYPE = "LevelDoor"
export default class LevelDoor extends Interactable {
    level_to:string
    constructor(engine:GameEngine, level:Level, box:Box, level_to:string) {
        super(engine, level, box);
        this.passThrough = true;
        this.level_to = level_to;
        this.type.push(LevelDoorTYPE)
    }
    onInteract() {
        console.log("Interacting")
        this.engine.SavesManager.useLevelManager((level)=>level.setLevel(this.level_to))
    }
    update() {
        
    }
    render(ctx:CanvasRenderingContext2D) {
        ctx.fillStyle = "blue"
        let wBounds = this.getWorldBounds();
        ctx.fillRect(wBounds.x, wBounds.y, wBounds.width, wBounds.height)
    }
    toJSON() {
        return {
            ...super.toJSON(),
            level_to:this.level_to
        }
    }
}