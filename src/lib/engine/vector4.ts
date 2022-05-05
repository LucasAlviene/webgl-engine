import Vector3 from "./vector3";

class Vector4 extends Vector3 {

    public z: number;
    public w: number;

    constructor(x: number, y: number, z: number, w: number = 1) {
        super(x, y, z);
        this.w = w;
    }

    toArray(): number[] {
        return [this.x, this.y, this.z, this.w];
    }
    isZero() {
        return Math.abs(this.x) < 1 && Math.abs(this.y) < 1 && Math.abs(this.z) < 1;
    }
    clone() {
        return new Vector4(this.x, this.y, this.z);
    }

    /**
     * new Vector4(0,0,0)
     * @return {Vector4} The transformed direction.
    */
    static get zero(): Vector4 {
        return new Vector4(0, 0, 0, 0);
    }

    /**
     * new Vector4(1,1,1)
     * @return {Vector4} The transformed direction.
    */
    static get one(): Vector4 {
        return new Vector4(1, 1, 1);
    }
    /**
     * new Vector4(0,1,0)
     * @return {Vector4} The transformed direction.
    */
    static get up(): Vector4 {
        return new Vector4(0, 1, 0);
    }
    /**
     * new Vector4(0,-1,0)
     * @return {Vector4} The transformed direction.
    */
    static get down(): Vector4 {
        return new Vector4(0, -1, 0);
    }
    /**
     * new Vector4(-1,0,0)
     * @return {Vector4} The transformed direction.
    */
    static get left(): Vector4 {
        return new Vector4(-1, 0, 0);
    }
    /**
     * new Vector4(1,0,0)
     * @return {Vector4} The transformed direction.
    */
    static get right(): Vector4 {
        return new Vector4(1, 0, 0);
    }

    get 3(): number {
        return this.w;
    }

    set 3(w : number){
        this.w = w;
    }
}
export default Vector4;