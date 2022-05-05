import Vector3 from './vector3';
import { degToRad } from '@utils/index';
import Camera from '@lib/camera';
import Matrix4x4 from '@lib/matrix4x4';
import Model from './model';
class Transform {

    public model: Model;
    public translation: Vector3 = Vector3.zero;
    public _matrix: Matrix4x4;
    public worldMatrix: Matrix4x4;
    public scale: Vector3 = Vector3.one;
    public rotation: Vector3 = Vector3.zero;
    public children: Model[] = [];
    private _parent?: Model;

    constructor(model?: Model) {
        this.model = model;
        this.worldMatrix = new Matrix4x4;
        this._matrix = new Matrix4x4();
    }

    update() {
        this._matrix.transform(this.translation, this.rotation, this.scale); //= new Matrix4x4(this.translation, this.rotation, this.scale);
    }

    removeChild(model : Model){
        this.children = this.children.filter((m) => m != model);
    }

    addChild(model : Model){
        this.children.push(model);
    }

    get matrix4x4(): Matrix4x4 {
        return this._matrix;
    }
    get matrix(): Float32Array {
        return this.matrix4x4.toArray();
    }

    get parent(): Model | null {
        return this._parent;
    }

    set parent(value: Model) {
        if(value == null) this._parent.transform.removeChild(this.model);
        else{
            this._parent?.transform.removeChild(this.model);
            value.transform.addChild(this.model);
        }
        this._parent = value;
    }

    set parentGui(value: string){
        const model = Model.FindWithName(value);
        this.parent = model;
    }

    get parentGui() : string{
        return this._parent?.name ?? "None";
    }
    
}
export default Transform;