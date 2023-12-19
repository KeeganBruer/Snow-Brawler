import {GameObject} from "./"
import { GameEngine } from "../";
import { Level } from "../Levels";
import { AssetLoader } from "../AssetLoader";
export const SpriteTYPE = "Sprite"

export default class Sprite extends GameObject {
    Assets:AssetLoader
    asset_name:string
    constructor(engine:GameEngine, level:Level, asset_name:string) {
        super(engine, level);
        this.type.push(SpriteTYPE)
        this.Assets = level.Assets;
        this.asset_name = asset_name;
    }
    update() {
        
    }
    render(ctx: CanvasRenderingContext2D): void {
        let background = this.Assets.getImageAsset(this.asset_name);
        let width = background.width
        let height = background.height
        ctx.drawImage(background, 0, 0, width, height)
    }
    toJSON() {
        return {
            ...super.toJSON(),
        }
    }
}