import {FileManager} from "../FileManager";
import { GameEngine } from "../";
import { AssetLoader } from "../AssetLoader";
import PlayerGameObject from "../GameObject/player"
import SpriteGameObject from "../GameObject/Sprite"
import {GameObject} from "../GameObject"
export class Level {
    Assets:AssetLoader
    engine:GameEngine
    save_name:string
    levelName:string
    players:PlayerGameObject[] = []
    GameObjects:GameObject[] = []
    constructor(engine:GameEngine, save_name:string, levelName:string) {
        this.engine = engine
        this.save_name = save_name
        this.levelName = levelName
        this.Assets = new AssetLoader(engine, {
            "background":{
                src:"public/background.png"
            }
        })
        
    }
    async load() {
        let fileManger = new FileManager();
        
        fileManger.getFile(`/saves/${this.save_name}/levels/${this.levelName}/assets.json`);

        await this.Assets.loadAssets();
        console.log(this.Assets.assets)

    }
    save() {
        let fileManger = new FileManager();
        let LevelJSON = {
            GameObjects:this.GameObjects.map(obj=>obj.toJSON())
        }
        
        fileManger.saveToFile(
            `/saves/${this.save_name}/levels/${this.levelName}/assets.json`,
            LevelJSON
        );

    }
    update() {
        for (let i = 0; i < this.GameObjects.length; i++) {
            this.GameObjects[i].update();
        }
    }
    render(ctx:CanvasRenderingContext2D) {
        
        for (let i = 0; i < this.GameObjects.length; i++) {
            this.GameObjects[i].render(ctx);
        }
    }
}