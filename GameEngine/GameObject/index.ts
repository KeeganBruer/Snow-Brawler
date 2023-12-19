import { GameEngine } from "../";
import { Level } from "../Levels";
import { Position } from "../Position";
export const BaseTYPE = "BaseGameObject"

export class GameObject {
    id:number
    type:string[] = []
    engine:GameEngine
    level:Level
    position:Position = new Position({x:0, y:0});
    velocity:Position = new Position({x:0, y:0});
    acceleration:Position = new Position({x:0, y:0});
    has_gavity:boolean = false;
    constructor(engine:GameEngine, level:Level) {
        this.id = engine.getUUID();
        this.type.push(BaseTYPE)
        this.engine = engine
        this.level = level
    }
    update() {
        this.acceleration = new Position({x:0, y:0});
        if (this.has_gavity == true) {
            this.acceleration.y = 1
        }
        //physic calculations

        //acceleration 
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;

        //velocity
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
    render(ctx:CanvasRenderingContext2D) {
        ctx.fillStyle = "red"
        ctx.fillRect(this.position.x, this.position.y, 100, 100)
    }
    toJSON() {
        return {
            type:this.type,
            position:this.position.json(),
            has_gavity:this.has_gavity
        }
    }
}