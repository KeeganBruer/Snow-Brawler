import { GameEngine } from "../../";
import { AssetLoader } from "../../AssetLoader";
import { Level } from "../";
import PlayerGameObject from "../../GameObject/player"
import SpriteGameObject from "../../GameObject/Sprite"
import {GameObject} from "../../GameObject"
import { Box, Position } from "../../Position";
import CollidableGameObject from "../../GameObject/Collidable";
import Interactable from "../../GameObject/Interactable";
import LevelDoor from "../../GameObject/LevelDoor";

export default class Level_Constructor extends Level {
    constructor(engine:GameEngine, save_name:string, levelName:string) {
        super(engine, save_name, levelName);
        this.Assets = new AssetLoader(engine, {
            "background":{
                src:"public/rampstairs.png"
            }
        })
        let player = new PlayerGameObject(this.engine, this)
        player.position = new Position({x: 40, y:950})
        player.interaction_cooldown = 30;
        this.players.push(player)
        let background = new SpriteGameObject(this.engine, this, "background")
        background.position = new Position({x: 0, y:0})
        
        let ground = new CollidableGameObject(this.engine, this, new Box({
            x:0,
            y:0,
            width:3000,
            height:20,
        }))
        ground.position = new Position({x: 0, y:1100},)
        let wall_left = new CollidableGameObject(this.engine, this, new Box({
            x:0,
            y:0,
            width:10,
            height:2000,
        }))
        wall_left.position = new Position({x: 0, y:0},)
        let wall_right = new CollidableGameObject(this.engine, this, new Box({
            x:0,
            y:0,
            width:10,
            height:2000,
        }))
        wall_right.position = new Position({x: 3000, y:0},)
        let platform = new CollidableGameObject(this.engine, this, new Box({
            x:0,
            y:0,
            width:200,
            height:20,
        }))
        platform.position = new Position({x: 300, y:950},)
        let door1 = new LevelDoor(this.engine, this, new Box({
            x:-50,
            y:-100,
            width:100,
            height:100,
        }), "Level_1")
        door1.position = new Position({x: 50, y:1100},)
        
        //render order
        this.GameObjects.push(background)
        this.GameObjects.push(wall_left)
        this.GameObjects.push(wall_right)
        this.GameObjects.push(ground)
        this.GameObjects.push(platform)
        this.GameObjects.push(door1)
        this.GameObjects.push(player)
    }
}