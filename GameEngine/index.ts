import {MainMenu} from "./MainMenu"
import {KeyboardMouse} from "./KeyboardMouse"
import {Camera} from "./Camera"
import {SavesManager} from "./SavesManager"
declare global {
    interface Window { 
        require: any; 
        setEngineAppPath: Function;
    }
}
type LaunchConfigs = {
    app_path:string
    type:"new_campaign" | "existing_save" | "resume"
    save_name?:string
}
export class GameEngine {
    container: HTMLFormElement | null;
    canvas: HTMLCanvasElement| null;
    ctx: CanvasRenderingContext2D | null;
    MainMenu:MainMenu;
    KeyboardMouse:KeyboardMouse;
    running:boolean = false;
    isDOMLoaded:boolean = false;
    SavesManager:SavesManager
    Camera:Camera
    config:LaunchConfigs = {
        app_path:"",
        type:"resume",
    }
    next_gameobject_id: number = 0;
    frame_time:number = 0;
    constructor() {
        this.Camera = new Camera(this);
        this.SavesManager = new SavesManager(this);
        this.MainMenu = new MainMenu(this);
        this.resizeCanvas = this.resizeCanvas.bind(this)
    }
    getUUID() {
        this.next_gameobject_id += 1
        return this.next_gameobject_id
    }
    setConfigs(config:Partial<LaunchConfigs>) {
        this.config = {
            ...this.config,
            ...config
        }
    }
    async onDOMLoaded() {
        console.log("Loading Engine DOM")
        this.isDOMLoaded = true;
        this.container = document.getElementById("game-container") as HTMLFormElement
        this.canvas = document.getElementById("game-canvas") as HTMLCanvasElement
        
        this.ctx = this.canvas.getContext("2d")
        this.resizeCanvas();
        this.KeyboardMouse = new KeyboardMouse(this);
        this.KeyboardMouse.addKeyboardListener("down", (e)=>{
            if (e.key == "Escape") this.MainMenu.toggle();
        })
        window.addEventListener("resize", this.resizeCanvas)

        let launch_configs:LaunchConfigs = this.config;
        if (launch_configs.type == "new_campaign") {
            console.log("launching a new campaign");
            await this.SavesManager.createNewSave();
        } else if (launch_configs.type == "existing_save") {
            console.log("launching from existing save", launch_configs.save_name);
            await this.SavesManager.loadExistingSave(launch_configs.save_name);
        }
        console.log("Session Loaded")
        this.config = {
            ...this.config,
            type:"resume"
        }
        this.running = true;
        this.loop(0);
    }
    resizeCanvas() {
        if (this.canvas == null) return;
        let pixel_scale = window.devicePixelRatio;
        this.Camera.screen = {
            width:this.canvas.width,
            height:this.canvas.height,
        }
        this.Camera.screen.width = this.canvas.width = Math.floor(this.canvas.clientWidth * pixel_scale);
        this.Camera.screen.height = this.canvas.height = Math.floor(this.canvas.clientHeight * pixel_scale);
        
    }
    onDOMUnloaded() {
        window.removeEventListener("resize", this.resizeCanvas)

        console.log("Unloading Engine DOM")
        this.running = false;
        this.isDOMLoaded = false;
    }

    isLoaded():this is {
        container:HTMLFormElement
        canvas: HTMLFormElement;
        ctx: CanvasRenderingContext2D;
        screen: { width: number; height: number; };
        MainMenu:MainMenu;
        KeyboardMouse:KeyboardMouse;
        running:boolean;
        isDOMLoaded:true
    } {
        return this.isDOMLoaded;
    }
    waitForLoad() {
        return new Promise<void>((resolve)=>{
            setTimeout(()=>{
                if (this.isDOMLoaded) resolve()
            }, 100)
        })
    }
    loop(deltaTime:number) {
        this.frame_time += deltaTime;
        
        (()=>{ //draw rendering
            if (this.frame_time < 1000/60) return;
            this.frame_time = 0;

            if (this.container == undefined) return;

            this.container.focus();
            if (this.ctx == null) return;
            this.ctx.fillStyle = "black"
            this.ctx.fillRect(0, 0, this.Camera.screen.width, this.Camera.screen.height)
            this.SavesManager.useLevelManager((levels)=>{
                
                let level = levels.getCurrentLevel();
                
                //update
                level.update();
                this.Camera.update();
                if (this.ctx == null) return;
                //render
                this.Camera.useCameraPosition(this.ctx, level.render.bind(level))
            })
        })()
        if (this.running) window.requestAnimationFrame(this.loop.bind(this))
    }

    onUIEvent(event:string) {
        console.log("engine event", event)
        if (event == "PLAY") {
            this.MainMenu.close();
        }
    }
}