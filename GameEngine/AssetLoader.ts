import { GameEngine } from "./"

export class AssetLoader {
    engine:GameEngine
    assets:{
        [key:string]:{
            isLoaded:boolean,
            image:HTMLImageElement
        }
    }
    assetDetails:{
        [key:string]:{
            src:string
        }
    }
    constructor(engine:GameEngine, assetDetails:{
        [key:string]:{
            src:string
        }
    }) {
        this.engine = engine;
        this.assets = {};
        this.assetDetails = assetDetails;
    }
    async loadAssets() {
        const path = window.require("path")
        const app_path = this.engine.config.app_path
        console.log(app_path)
        let keys = Object.keys(this.assetDetails);
        let loadPromises:Promise<void>[] = []
        for (let i = 0; i < keys.length; i++) {
            let details = this.assetDetails[keys[i]];
            
            let img = new Image();
            loadPromises.push(new Promise((resolve)=>{
                img.onload = ()=>{
                    resolve()
                }
            }))
            img.src = app_path.includes("http://") ? `${app_path}/${details.src}` : path.join(app_path, "../", details.src);
            console.log("Loading image",  img.src)
            this.assets[keys[i]] = {
                isLoaded:false,
                image:img
            }
        }
        await Promise.all(loadPromises);
    }
    isLoaded() {
        let keys = Object.keys(this.assets);
        for (let i = 0; i < keys.length; i++) {
            if (this.assets[keys[i]].isLoaded == false) return false;
        }
        return true;
    }
    
    getImageAsset(assetName:string) {
        return this.assets[assetName].image
    }
}