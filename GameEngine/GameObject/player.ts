import {GameObject} from "./"
import { GameEngine } from "../";
import { Level } from "../Levels";
import CollidableGameObject, { CollidableTYPE } from "./Collidable";
import { Box, Position } from "../Position";
import InteractableGameObject, { InteractableTYPE } from "./Interactable";
export const PlayerTYPE = "Player"

export default class Player extends CollidableGameObject {
    speed:number
    controled_velocity:Position = new Position()
    jump_count: number = 0
    jump_available:boolean = true;
    Interactables:InteractableGameObject[] //updated every loop
    interaction_cooldown:number = 0;
    constructor(engine:GameEngine, level:Level) {
        super(engine, level, new Box({
            x: 0,
            y: 0,
            width: 100,
            height: 100
        }));
        this.type.push(PlayerTYPE)
        this.has_gavity = true;
        this.speed = 5;
    }
    update() {
        this.acceleration = new Position({x:0, y:0});
        if (this.has_gavity == true) {
            this.acceleration.y = 1
        }

        this.velocity = this.velocity.add(this.acceleration)
        if ((
            this.engine.KeyboardMouse.keysDown.includes(" ")
            || this.engine.KeyboardMouse.keysDown.includes("w")
         ) && this.jump_available && this.jump_count < 2) {
            this.jump_available = false;
            this.velocity.y = -20
            this.jump_count += 1;
            console.log(this.jump_count)
        } else if (!this.engine.KeyboardMouse.keysDown.includes("w"))
            this.jump_available = true;
        
        if (this.engine.KeyboardMouse.keysDown.includes("a") && this.velocity.x > -5) {
            this.velocity.x -= 1
        }
        if (this.engine.KeyboardMouse.keysDown.includes("d")&& this.velocity.x < 5) {
            this.velocity.x += 1
        }
        let future_y_position = this.position.add(new Position({y:this.velocity.y, x:0}))
        let future_x_position = this.position.add(new Position({x:this.velocity.x, y:0}))
        let does_collide_y = false;
        let does_collide_x = false;
        let objects = this.level.GameObjects;
        for (let i = 0; i < objects.length; i++) {
            if (objects[i].type.includes(CollidableTYPE) == false) continue;
            let obj = objects[i] as CollidableGameObject;
            if (this.id == obj.id || obj.passThrough) continue; //don't check itself or pass through items
            let check_y = this.isColliding(obj, future_y_position);
            let check_x = this.isColliding(obj, future_x_position);
            if (check_y.colliding) does_collide_y = true;
            if (check_x.colliding) does_collide_x = true;
            //console.log("Collision for", objects[i].id, check_y?.colliding, check_y?.side)
            
        }
        if (!does_collide_y)  {
            this.position = this.position.add(new Position({y:this.velocity.y, x:0}))
        } else {
            if (!does_collide_x && this.velocity.x != 0) {
                let dir = this.velocity.x / Math.abs(this.velocity.x)
                this.velocity.x -= dir * 0.5
            }
            if (this.velocity.y > 0) {
                this.jump_count = 0;
            }
            this.velocity.y = 0
            this.acceleration.y = 0
        }
        if (!does_collide_x)  {
            this.position = this.position.add(new Position({x:this.velocity.x, y:0}))
        } else {
            this.velocity.x = 0
            this.acceleration.x = 0
        }

        this.Interactables = []
        for (let i = 0; i < objects.length; i++) {
            if (this.id == objects[i].id) continue; //don't check itself
            let check = this.isColliding(objects[i], this.position);
            if (check.colliding) {
                if (objects[i].type.includes(InteractableTYPE)) {
                    this.Interactables.push(objects[i] as InteractableGameObject)
                }
            }
        }
        if (this.interaction_cooldown > 0) {
            this.interaction_cooldown -= 1;
        }
        if (this.engine.KeyboardMouse.keysDown.includes("f") && this.interaction_cooldown == 0) {
            for (let i =0; i < this.Interactables.length; i++) {
                this.Interactables[i].onInteract();
            }
            this.interaction_cooldown = 60;  
        }

    }
    toJSON() {
        return {
            ...super.toJSON(),
        }
    }
}