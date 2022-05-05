import Color from "@lib/color";
import Matrix4x4 from "@lib/matrix4x4";
import Object from "@lib/object";
import WebGL from "@lib/webGL";
import m4 from "@utils/m4";
import Transform from "./transform";
import Vector3 from "./vector3";

type EventKeyType = "keyup" | "keydown" | "keypress";
interface EventKey {
    key: string
    ctrlKey: boolean
    altKey: boolean
    shiftKey: boolean
}
const processEvent = (fn: (EventKey) => void) => (e) => {
    const { key, ctrlKey, altKey, shiftKey } = e;
    const result = fn({ key, ctrlKey, altKey, shiftKey })
    //WebGL.gameLoop();
    return result;
}
abstract class ModelAbstract {
    start() {
    }
    update() {
    }
}
interface IRange{
    start: Vector3
    end: Vector3
}
class Model<T = Object> extends ModelAbstract {

    public enabled: boolean = true;
    public name: string;
    public transform: Transform;
    public object: Object;
    public color: number[] = [255, 100, 100, 255]

    /* Temp */
    //public color : number[]
    public width: number = 20;
    public height: number = 20;

    static gameObjects = [];
    public animation: Animation = new Animation;


    constructor(name: string, object?: Object) {
        super();
        this.name = name;
        this.object = object;
        this.transform = new Transform(this);
    }

    /* Métodos Estáticos */

    static Create<D>(name: string, object?: Object) {
        const obj = new this(name, object);
        Model.gameObjects.push(obj);
        /* Gambiarra */
        import("@utils/gui").then((Gui) => {
            Gui.default.GameObject(name, obj);
        })
        obj.start();
        return obj;
    }

    static Destroy(name: string) {
        Model.gameObjects = Model.gameObjects.filter((item) => item.name != name);
    }

    static FindWithName(name: string): Model | null {
        const gameobjects = Model.gameObjects;
        for (const gameobject of gameobjects) {
            if (gameobject.name == name) return gameobject;
        }
        return null;
    }

    /* Metodos Publicos */

    GetComponent<T>(type) : T{
        return this[type] as T;
    }

    addEvent(name: EventKeyType, callback: (EventKey) => void) {
        document.addEventListener(name, processEvent(callback));
    }

    render(matrix?: Matrix4x4) {
        this.transform.update();
        let localMatrix = this.transform.matrix;
        if (matrix) {
            m4.multiply(matrix, localMatrix, this.transform.worldMatrix);
        } else {
            m4.copy(localMatrix, this.transform.worldMatrix);
        }

        this.update();
        this.animateUpdate();
        this.object?.render(this);
        this.transform.children.map((item) => {
            if (item.enabled) item.render(this.transform.worldMatrix);
        })
    }

    animateUpdate() {
        if (this.animation.translationTo != null) {
            if (Vector3.Distance(this.transform.translation, this.animation.translationTo) > 0.001) {
                const step = this.animation.velocity * WebGL.timeDelta;
                switch (this.animation.type) {
                    case "Linear":
                        this.transform.translation = Vector3.MoveTowards(this.transform.translation, this.animation.translation, step);
                        break;
                    case "Bezier":
                        this.transform.translation = Bezier2(this.transform.translation, new Vector3(2, 2, 2), this.animation.translation, step);
                        break;
                    case "Spline":

                        break;
                }
            } else {
                this.animation.translationTo = null;
            }
        }

    }

    range() : IRange{
        const widthHalf = this.width / 2;
        const heightHalf = this.height / 2;
        const x1 = this.transform.translation.x - widthHalf;
        const y1 = this.transform.translation.y - heightHalf;
        const z1 = this.transform.translation.z - heightHalf;

        const x2 = this.transform.translation.x + widthHalf;
        const y2 = this.transform.translation.y + heightHalf;
        const z2 = this.transform.translation.z + heightHalf;
        return { start: new Vector3(x1, y1, z1), end: new Vector3(x2, y2, z2) };
    }
}
function Bezier2(Start: Vector3, Control: Vector3, End: Vector3, t: number): Vector3 {
    const tStart = (1 - t) * (1 - t);
    const tControl = 2 * t * (1 - t);
    const tEnd = t * t;
    const r1 = Vector3.sum(Vector3.multiply(Start, tStart), Vector3.multiply(Control, tControl));
    return Vector3.sum(Vector3.multiply(End, tEnd), r1);
    //   return (((1-t)*(1-t)) * Start) + (2 * t * (1 - t) * Control) + ((t * t) * End);
}
class Animation {
    public translation: Vector3 = new Vector3(10, 10, 0);
    public type: string = "Linear";
    public translationTo?: Vector3 | null
    public velocity: number = 5;
    animate() {
        this.translationTo = this.translation.clone();
        console.log("Animar", this);
    }
}
export default Model;
