import { GameEngine } from "./";

export class MainMenu {
    menu: HTMLElement | null;
    engine:GameEngine
    listeners:{
        "open":(()=>void)[],
        "close":(()=>void)[]
    } = {
        "open":[],
        "close":[]
    }
    isOpen:boolean = false;
    page:string = "MAIN"
    constructor(engine:GameEngine) {
        this.engine = engine
        
    }
    close() {
        this.isOpen = false;
        this.listeners["close"].forEach(cb=>cb())
    }
    open() {
        this.isOpen = true;
        this.listeners["open"].forEach(cb=>cb())
    }
    toggle() {
        if (this.isOpen) return this.close();
        this.open();
    }
    addListener(type:"open"|"close", cb:()=>void) {
        this.listeners[type].push(cb);
    }
}