import WebGL from "./webGL";
import m4 from "@utils/m4";
import { degToRad } from '@utils/index';
import Vector3 from "./engine/vector3";
import Model from "./engine/model";
import Transform from "./engine/transform";
import Matrix4x4 from "./matrix4x4";
import Vector2 from "./engine/vector2";

class CameraConfig {
    public near: number = 10;
    public fear: number = 2000;
    public target: string = "None";
    public fieldOfViewRadians: number = 60;
    public zoom: number = 100;
}

type ICameras = {
    [key: string]: Camera;
}

/*
Considerando X = 0 Y = 0 Z = 100
Cube 0 
x > 10 && x < 10
y > 10 && y < 10
z > 10 && z < 10
*/

class Camera {

    readonly name: string;
    private aspect: number;
    public position: Vector3;//new Vector3(0,300,200);
    public scale: Vector3 = Vector3.one;//new Vector3(0,300,200);
    public rotation: Vector3 = Vector3.zero;
    public projection: Float32Array;
    public view: Float32Array;
    public config = new CameraConfig;
    public backgroundPosition = Vector2.zero;

    public static Cameras: ICameras = {};
    public static main: Camera = new Camera("Camera 1");

    public static set _camera(name: string) {
        Camera.main = Camera.Cameras[name];
    }

    public static get _camera(): string {
        return Camera.main.name;
    }

    constructor(name: string, position: Vector3 = Vector3.zero) {
        this.name = name;
        this.position = new Vector3(1, 0, 0);
        Camera.Cameras[name] = this;
    }

    static start() {
        WebGL.canvas.addEventListener("wheel", (e) => {
            const { deltaY } = e;
            Camera.main.config.zoom += deltaY;
            if (Camera.main.config.zoom < 100) Camera.main.config.zoom = 100;
        })
        let mouse: boolean | Vector2 = false;
        WebGL.canvas.addEventListener("mousedown", (e) => {
            mouse = false//new Vector2(e.clientX, e.clientY);
        })
        WebGL.canvas.addEventListener("mouseup", (e) => {
            mouse = false;
        })
        WebGL.canvas.addEventListener("mousemove", (e) => {
            if (typeof mouse != "boolean") {
                Camera.main.rotation.y = mouse.x + e.clientX;
                Camera.main.rotation.z = mouse.y + e.clientY;
            }
        })
        WebGL.canvas.addEventListener("click", ({ clientX, clientY }) => {
            const width = WebGL.canvas.width / 2;
            const height = WebGL.canvas.height / 2;
            const top = (clientX - width) *  (Camera.main.config.zoom /100);
            const left = -((clientY - height) *  (Camera.main.config.zoom /100));
            console.log(new Matrix4x4(Camera.viewProjection).getTranslation())
            return;
            /*const position = new Matrix4x4(Camera.viewProjection).getTranslation()//,0.4289550185203552);
            const z = (position.z) / 2;
            const x = top// - position.x; //- position.x - 15;
            const y = left// - position.y - 15;//(position.y - (position.y - (position.z-80.90452575683594)/2)) - 15
            console.log(position.x, window.innerWidth / window.outerWidth, new Matrix4x4(Camera.viewProjection).vector4())
            //console.log(Matrix4x4.log(Camera.main.view,"View Camera"));
            //document.querySelector(".bolinha").setAttribute("style",`top:${height + y - 25}px;left: ${width + x - 25}px;`);   
            */
            const matrix = new Matrix4x4();
            matrix.translation(new Vector3(top,left,Camera.main.config.zoom))
            console.log(matrix.getTranslation())
            const position = new Matrix4x4(m4.multiply(Camera.viewProjection, matrix)).getTranslation();
            const Cube = Model.FindWithName("Cube 0");
            Cube.transform.translation.x = top;
            Cube.transform.translation.y = left;
            Cube.transform.translation.z = Camera.main.config.zoom - 100
            const obj = Cube.range();
            if (
                (position.x > obj.start.x && position.x < obj.end.x) &&
                (position.y > obj.start.y && position.y < obj.end.y) //&&
                //(position.z > obj.start.z && position.z < obj.end.z)
            ){
                console.log("Clique")
            }else{
                console.log("Não clique :(")
            }
        })
        Camera.update();
    }

    static update() {
        const context = WebGL.getContext();
        Camera.main.aspect = context.canvas.clientWidth / context.canvas.clientHeight;
        Camera.main.projection = m4.perspective(degToRad(Camera.main.config.fieldOfViewRadians), Camera.main.aspect, Camera.main.config.near, Camera.main.config.fear);

        // Compute the camera's matrix using look at.
        //const target = this.config.target?.transform.translation ?? Vector3.zero;
        const cameraMatrix = m4.lookAt(new Vector3(0, 0, Camera.main.config.zoom), Camera.main.getTarget(), Vector3.up);
        Camera.main.view = m4.inverse(cameraMatrix);

        const matrix = Matrix4x4.identity;
        m4.translate(matrix, Camera.main.position.x, Camera.main.position.y, Camera.main.position.z, matrix);
        m4.xRotate(matrix, degToRad(Camera.main.rotation.x), matrix);
        m4.yRotate(matrix, degToRad(Camera.main.rotation.y), matrix);
        m4.zRotate(matrix, degToRad(Camera.main.rotation.z), matrix);
        m4.scale(matrix, Camera.main.scale.x, Camera.main.scale.y, Camera.main.scale.z, matrix);
        m4.multiply(matrix, Camera.main.view, Camera.main.view);

        WebGL.canvas.style.backgroundPosition = `${Camera.main.rotation.y}px ${Camera.main.rotation.x}px`;
        WebGL.canvas.style.backgroundSize = `calc(100% / ${Math.abs(Camera.main.config.zoom / 500)})`;

    }

    private getTarget() {
        const target = Camera.main.config.target;
        if (target == "None") return Vector3.zero;
        const gameobject = Model.FindWithName(target);
        if (gameobject) return gameobject.transform.worldMatrix.getTranslation();
        return Vector3.zero;
    }

    static get viewProjection(): Float32Array {
        return m4.multiply(Camera.main.projection, Camera.main.view);
    }
}
export default Camera;