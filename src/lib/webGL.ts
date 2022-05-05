import Gui from '@utils/gui';
import Chair from '../mesh/chair';
import Cube from '../mesh/cube';
import Camera from './camera';
import Model from './engine/model';
import Program from './program';

class WebGL {

    public static canvas: HTMLCanvasElement;
    private static instance: WebGL;
    private static context: WebGL2RenderingContext;
    private static program: WebGLProgram;
    public static timeDelta: number;
    public static timeThen: number;

    static loop = {};
    static addLoop(name:string,obj: object){
        this.loop[name] = obj;
    }
    static removeLoop(name: string){
        delete this.loop[name];
    }

//    public gameObject = [];
    static mesh = {
        cube: null,
        sphere: null,
        cone: null,
        chair: null
    };
    constructor(canvas: HTMLCanvasElement) {
        WebGL.canvas = canvas;
        WebGL.context = canvas.getContext("webgl2");
        WebGL.instance = this;
    }
    /* Não usando */
    static createProgram(vertex?: string, fragment?: string): Program {
        return new Program(vertex, fragment);
    }

    render() {
        Camera.update();
        const context = WebGL.getContext();
        const width = context.canvas.clientWidth | 0;
        const height = context.canvas.clientHeight | 0;
        if (context.canvas.width !== width || context.canvas.height !== height) {
            context.canvas.width = width;
            context.canvas.height = height;
        }
        context.enable(context.CULL_FACE);
        context.enable(context.DEPTH_TEST);
        context.viewport(0, 0, context.canvas.width, context.canvas.height);
        // Limpar Canvas
        context.clearColor(0, 0, 0, 0);
        context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);
        //this.initBkgnd();
        for (const gameObject of Model.gameObjects) {
            if(gameObject.transform.parent == null && gameObject.enabled) gameObject.render();
        }
        for(const key in WebGL.loop){
            WebGL.loop[key]?.update();
        }
    }

    static start() {
        
        Camera.start();
        const webgl = WebGL.instance;
        WebGL.mesh.cube = new Cube("createCubeVertices");
        WebGL.mesh.sphere = new Cube("createSphereVertices");
        WebGL.mesh.cone = new Cube("createTruncatedConeVertices");
        WebGL.mesh.chair = new Chair();
        for (const gameObject of Model.gameObjects) {
            gameObject.start();
        }
        requestAnimationFrame(WebGL.gameLoop);
        
        for (const gameObject of Model.gameObjects) {
            Gui.GameObject(gameObject.name,gameObject);
            //gameObject.gui();
        }
    }
    
    static gameLoop(time) {
        time *= 0.001;
        WebGL.timeDelta = time - WebGL.timeThen;
        WebGL.timeThen = time;
        WebGL.instance.render();
        requestAnimationFrame(WebGL.gameLoop);
    }
    /*
        static setAttribute(name: string) : Buffer{
            return new Buffer(name);//webGL.getContext().getAttribLocation(webGL.program,name);
        }*/

    static getUniform(name: string): WebGLUniformLocation {
        return WebGL.getContext().getUniformLocation(WebGL.program, name);
    }

    static getContext(): WebGL2RenderingContext {
        return WebGL.context;
    }

    static getProgram(): WebGLProgram {
        return WebGL.program;
    }

    static getInstance() : WebGL{
        return WebGL.instance;
    }
}
export default WebGL;