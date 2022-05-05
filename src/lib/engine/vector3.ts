import Vector2 from "./vector2";

class Vector3 extends Vector2 {

    public z: number;

    constructor(x: number, y: number, z: number) {
        super(x, y);
        this.z = z;
    }

    toArray(): number[] {
        return [this.x, this.y, this.z];
    }
    isZero() {
        return Math.abs(this.x) < 1 && Math.abs(this.y) < 1 && Math.abs(this.z) < 1;
    }
    clone(){
        return new Vector3(this.x,this.y,this.z);
    }

    /**
     * new Vector3(0,0,0)
     * @return {Vector3} The transformed direction.
    */
    static get zero(): Vector3 {
        return new Vector3(0, 0, 0);
    }

    /**
     * new Vector3(1,1,1)
     * @return {Vector3} The transformed direction.
    */
    static get one(): Vector3 {
        return new Vector3(1, 1, 1);
    }
    /**
     * new Vector3(0,1,0)
     * @return {Vector3} The transformed direction.
    */
    static get up(): Vector3 {
        return new Vector3(0, 1, 0);
    }
    /**
     * new Vector3(0,-1,0)
     * @return {Vector3} The transformed direction.
    */
    static get down(): Vector3 {
        return new Vector3(0, -1, 0);
    }
    /**
     * new Vector3(-1,0,0)
     * @return {Vector3} The transformed direction.
    */
    static get left(): Vector3 {
        return new Vector3(-1, 0, 0);
    }
    /**
     * new Vector3(1,0,0)
     * @return {Vector3} The transformed direction.
    */
    static get right(): Vector3 {
        return new Vector3(1, 0, 0);
    }

    get 2(): number {
        return this.z;
    }
    
    set 2(z : number){
        this.z = z;
    }

    static sum(v1: Vector3, v2: Vector3 | number): Vector3 {
        if(!(v2 instanceof Vector3)) v2 = new Vector3(v2,v2,v2);
        return new Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    }

    static subtract(v1: Vector3, v2: Vector3 | number): Vector3 {
        if(!(v2 instanceof Vector3)) v2 = new Vector3(v2,v2,v2);
        return new Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
    }

    static multiply(v1: Vector3, v2: Vector3 | number): Vector3 {
        if(!(v2 instanceof Vector3)) v2 = new Vector3(v2,v2,v2);
        return new Vector3(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z);
    }

    static divide(v1: Vector3, v2: Vector3 | number): Vector3 {
        if(!(v2 instanceof Vector3)) v2 = new Vector3(v2,v2,v2);
        return new Vector3(v1.x / v2.x, v1.y / v2.y, v1.z / v2.z);
    }

    static Distance(v1: Vector3, v2: Vector3): number {
        return Math.sqrt(Math.pow(v2.x - v1.x, 2) + Math.pow(v2.y - v1.y, 2) + Math.pow(v2.z - v1.z, 2))
    }

    static MoveTowards(current: Vector3, target: Vector3, maxDistanceDelta: number): Vector3 {
        const toVector_x = target.x - current.x;
        const toVector_y = target.y - current.y;
        const toVector_z = target.z - current.z;
        const sqdist = Math.pow(toVector_x,2) + Math.pow(toVector_y,2) + Math.pow(toVector_z,2);
        if (sqdist == 0 || (maxDistanceDelta >= 0 && sqdist <= maxDistanceDelta * maxDistanceDelta)) return target.clone();
        const dist = Math.sqrt(sqdist);
        return new Vector3(current.x + toVector_x / dist * maxDistanceDelta, current.y + toVector_y / dist * maxDistanceDelta, current.z + toVector_z / dist * maxDistanceDelta);
    }
}
export default Vector3;