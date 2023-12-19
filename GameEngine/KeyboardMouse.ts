import { GameEngine } from "./";

export class KeyboardMouse {
    menu: HTMLElement | null;
    engine:GameEngine
    listeners:{
        "down":((e:KeyboardEvent)=>void)[],
        "up":((e:KeyboardEvent)=>void)[]
    } = {
        "down":[],
        "up":[]
    }
    keysDown:string[] = []
    constructor(engine:GameEngine) {
        this.engine = engine;
        engine.container?.addEventListener("keydown", this.onKeyDown.bind(this))
        engine.container?.addEventListener("keyup", this.onKeyUp.bind(this))
    }
    onKeyDown(e:KeyboardEvent) {
        if (!this.keysDown.includes(e.key)) {
            this.keysDown.push(e.key)
        }
        this.listeners["down"].forEach(cb=>cb(e))
        this.engine.container?.focus();
    }
    onKeyUp(e:KeyboardEvent) {
        this.keysDown = this.keysDown.filter(key=>key != e.key)
        this.listeners["up"].forEach(cb=>cb(e))
        this.engine.container?.focus();
    }
    addKeyboardListener(type:"down"|"up", cb:(e:KeyboardEvent)=>void) {
        this.listeners[type].push(cb);
    }
}