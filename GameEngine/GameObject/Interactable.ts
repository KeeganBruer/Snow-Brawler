import {GameObject} from "./"
import { GameEngine } from "../";
import { Level } from "../Levels";
import CollidableGameObject from "./Collidable";
import { Box, Position } from "../Position";
export const InteractableTYPE = "Interactable"
export default class Interactable extends CollidableGameObject {
    constructor(engine:GameEngine, level:Level, box:Box) {
        super(engine, level, box);
        this.passThrough = true;
        this.type.push(InteractableTYPE)
    }
    onInteract() {
        console.log("Interacting")
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
        }
    }
}