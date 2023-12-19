import { GameEngine } from "./"
import { Level } from "./Levels"
import Level1 from "./Levels/Levels/Level_1"
import Level2 from "./Levels/Levels/Level_2"
import { LevelCreator } from "./Levels/levelCreator"

export class LevelManager {
    engine:GameEngine
    currentLevel:Level
    save_name:string
    
    constructor(engine:GameEngine, save_name:string) {
        this.engine = engine;
        this.save_name = save_name;
        
    }
    async setLevel(levelName:string) {
        let nextLevel = new LevelCreator(this.engine, this.save_name, levelName);
        if (levelName == "Level_1")
            nextLevel = new Level1(this.engine, this.save_name, levelName);
        if (levelName == "Level_2")
            nextLevel = new Level2(this.engine, this.save_name, levelName);
        await nextLevel.load();
        console.log("Level "+levelName+ " Loaded")
        this.engine.Camera.setPosition(
            this.engine.Camera.calculateTargetPosition(nextLevel)
        )
        this.currentLevel = nextLevel;
    }
    saveCurrentLevel() {
        this.currentLevel.save();
    }
    getCurrentLevel() {
        return this.currentLevel
    }
}