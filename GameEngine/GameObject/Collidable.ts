import {GameObject} from "./"
import { GameEngine } from "../";
import { Level } from "../Levels";
import { AssetLoader } from "../AssetLoader";
import { Box, Position } from "../Position";
export const CollidableTYPE = "CollidableGameObject"

export default class CollidableGameObject extends GameObject {
    box: Box
    passThrough:boolean = false;
    constructor(engine:GameEngine, level:Level, box:Box) {
        super(engine, level);
        this.type.push(CollidableTYPE);
        this.box = box;
    }
    isColliding(object:GameObject, pos?:Position) {
        if (!object.type.includes(CollidableTYPE)) return {colliding:false};
        //@ts-ignore
        let Collidable = object as CollidableGameObject;

        let wBounds = this.getWorldBounds(pos);
        let objWBounds = Collidable.getWorldBounds();
        //console.log("is colliding", wBounds.colliding(objWBounds))
        return wBounds.colliding(objWBounds);
    }
    getWorldBounds(pos?:Position) {
        if (pos == undefined) pos = this.position
        let top_left = pos.add(new Position({x:this.box.x, y:this.box.y}))
        let top_right = pos.add(new Position({x:this.box.x+this.box.width, y:this.box.y}))
        let bottom_left = pos.add(new Position({x:this.box.x, y:this.box.y+this.box.height}))
        let bottom_right = pos.add(new Position({x:this.box.x+this.box.width, y:this.box.y+this.box.height}))
        return new Box({
            x:top_left.x,
            y:top_left.y,
            width:top_right.x - top_left.x,
            height:bottom_left.y - top_left.y,
        })
    }
    render(ctx:CanvasRenderingContext2D) {
        ctx.fillStyle = "red"
        let wBounds = this.getWorldBounds();
        ctx.fillRect(wBounds.x, wBounds.y, wBounds.width, wBounds.height)
    }
    toJSON() {
        return {
            ...super.toJSON(),
        }
    }
}