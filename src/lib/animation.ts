import Model from "./engine/model";
import Vector3 from "./engine/vector3";
import WebGL from "./webGL";

type IAnimationType = "translation" | "scale" | "rotation";
class AnimationProperty {

    public to: Vector3 = Vector3.zero;
    public end?: Vector3;
    public type: IAnimationType = "translation";
    public velocity: number = 5;
    constructor(to : Vector3,type : IAnimationType = "translation", velocity : number = 5){
        this.to = to;
        this.type = type;
        this.velocity = velocity;
    }

}

class Animations {

    readonly name: string;
    public animations: AnimationProperty[] = [];
    private current = -1;
    private model: Model;

    static listAnimations : any = {};

    constructor(name: string) {
        this.name = name;
        Animations.listAnimations[name] = this;
    }
    add(to : Vector3,type? : IAnimationType, velocity? : number) {
        const animation = new AnimationProperty(to,type,velocity);
        this.animations.push(animation);
        return animation;
    }

    update() {
        if(this.current == -1) return;
        if (this.current < this.animations.length) {
            const current = this.animations[this.current];
            if(current.end == null) current.end = Vector3.sum(this.model.transform[current.type],current.to);
            if (Vector3.Distance(this.model.transform[current.type], current.end) > 0.001) {
                const step = current.velocity * WebGL.timeDelta;
                this.model.transform[current.type] = Vector3.MoveTowards(this.model.transform[current.type], current.end, step);
            } else {
                current.end = null;
                console.log("Passo",this.current,current);
                this.current++;
            }
        }else{
            WebGL.removeLoop(this.name);
            this.current = -1;
        }
    }

    animate(model : Model){
        this.model = model;
        this.current = 0;
        WebGL.addLoop(this.name,this);
    }

    static create(name : string){
        return new Animations(name);
    }

    /* Animações Padrões */

    static start(){
        const a1 = new Animations("Animation 1");
        a1.add(new Vector3(10,0,0)); // Translation X = 10
        a1.add(new Vector3(5,5,5),"scale",4); // Scale 5 | velocity = 4
        a1.add(new Vector3(0,100,0),"rotation",8); // Rotation Y = 10 | velocity = 8
        a1.add(new Vector3(-20,-10,0)); // Translation X = -20 Y = -10

        const a2 = new Animations("Animation 2");
        a2.add(new Vector3(20,0,0)); // Translation X = 20
        a2.add(new Vector3(0,15,0)); // Translation Y = 15
        a2.add(new Vector3(2,2,2),"scale",10); // Scale 2 | velocity = 10
        a2.add(new Vector3(-20,-10,0),"translation",10); // Translation X = -20 Y = -10
    }
}
export default Animations;
export { AnimationProperty };