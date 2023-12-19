import { GameEngine } from "./";
import { Level } from "./Levels";
import { Position } from "./Position";

export class Camera {
    engine:GameEngine
    position:Position = new Position({x:0, y:0});
    target_position:Position = new Position({x:0, y:0});
    screen: { width: number; height: number; };
    constructor(engine:GameEngine) {
        this.engine = engine;
    }
    setPosition(position?:Position) {
        if (position == undefined) return;
        this.position = position
    }
    calculateTargetPosition(_level?:Level) {
        const getAveragePlayerPosition = (level:Level)=>{
            let players = level.players;
            let xSum = players.reduce((last, curr)=>{return {sum:last.sum + curr.position.x, count:last.count+1}}, {sum:0, count:0})
            let ySum = players.reduce((last, curr)=>{return {sum:last.sum + curr.position.y, count:last.count+1}}, {sum:0, count:0})
            let x = xSum.sum / xSum.count
            let y = ySum.sum / ySum.count
            x -= this.screen.width / 2
            y -= this.screen.height / 2
            return new Position({x, y})
        }
        let level = _level ? _level : this.engine.SavesManager.useLevelManager((levels)=>{
            let level = levels.getCurrentLevel()
            return level
        })
        if (level == undefined)  return 
        if (level.players.length > 1) {
            //multiplayer camera
            let avg_player = getAveragePlayerPosition(level)
            return avg_player
        }
        //single player camera
        let player = level.players[0];
        if (player == undefined) return 
        
        return new Position({x:-1 * (this.screen.width / 2), y:-1 * (this.screen.height / 2)}).add(
            player.position.add(player.velocity.normalize().scale({x:300, y:0}))
        )
    }
    update() {
        this.target_position = this.calculateTargetPosition() || this.target_position;
        //this.target_position.y = Math.floor(this.target_position.y % 10) * 10

        let Xdistance = Math.abs(this.target_position.x - this.position.x)

        // X Axis Camera Movement
        let x_camera_speed = map(Xdistance, 200, 1000, 0.1, 60)
        //console.log(Xdistance, x_camera_speed)
        let xDeadZone = 100;
        if (Xdistance > xDeadZone && this.position.x < this.target_position.x)
            this.position.x += x_camera_speed
        if (Xdistance > xDeadZone &&this.position.x > this.target_position.x)
            this.position.x -= x_camera_speed

        // Y Axis Camera Movement
        let Ydistance = Math.abs(this.target_position.y - this.position.y)
        let y_camera_speed = map(Ydistance, 100, 1000, 0.1, 60)
        let yDeadZone = 300;
        if (Ydistance > yDeadZone && this.position.y < this.target_position.y)
            this.position.y += y_camera_speed
        if (Ydistance > yDeadZone && this.position.y > this.target_position.y)
            this.position.y -= y_camera_speed
    }
    useCameraPosition(ctx:CanvasRenderingContext2D, cb:(ctx:CanvasRenderingContext2D)=>void) {
        ctx.translate(-this.position.x, -this.position.y)
        cb(ctx);
        ctx.translate(this.position.x, this.position.y)

    }
    
}

export function clamp(input: number, min: number, max: number): number {
    return input < min ? min : input > max ? max : input;
  }
  
  export function map(current: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
    const mapped: number = ((current - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
    return clamp(mapped, out_min, out_max);
  }