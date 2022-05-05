import Vector3 from "./engine/vector3";
import m4 from "@utils/m4";
import { degToRad } from "@utils/index";
import Vector4 from "./engine/vector4";

class Matrix4x4 {

    private _matrix: Float32Array;

    constructor(matrix?: Float32Array) {
        this._matrix = matrix ?? Matrix4x4.identity;
    }

    transform(translation?: Vector3, rotation?: Vector3, scale?: Vector3) {
        this._matrix = Matrix4x4.identity;
        if (translation) this.translation(translation);
        if (rotation) this.rotate(rotation);
        if (scale) this.scale(scale);
    }

    toArray(): Float32Array {
        return this._matrix;
    }

    getTranslation(): Vector3 {
        return new Vector3(this[12], this[13], this[14]);
    }

    translation(vector3: Vector3 | number[]) {
        this[12] = vector3[0] ?? 0; // or vector.x
        this[13] = vector3[1] ?? 0; // or vector.y
        this[14] = vector3[2] ?? 0; // or vector.z
    }

    multiply(a: Matrix4x4 | Float32Array, b: Matrix4x4 | Float32Array) {
        m4.multiply(a, b, this);
    }

    translate(vector: Vector3, projection: number[] | Float32Array) {
        this._matrix = m4.translate(
            projection,
            vector.x,
            vector.y,
            vector.z,
        )
    }

    rotate(vector: Vector3) {
        const matrix = Matrix4x4.identity;
        m4.xRotate(matrix, degToRad(vector.x), matrix);
        m4.yRotate(matrix, degToRad(vector.y), matrix);
        m4.zRotate(matrix, degToRad(vector.z), matrix);

        this.multiply(matrix, this._matrix);
    }

    scale(vector: Vector3) {
        /*
        const m = this._matrix;
        const sx = vector[0] ?? 0;
        const sy = vector[1] ?? 0;
        const sz = vector[2] ?? 0;
        this[0] = sx * m[0 * 4 + 0];
        this[1] = sx * m[0 * 4 + 1];
        this[2] = sx * m[0 * 4 + 2];
        this[3] = sx * m[0 * 4 + 3];
        this[4] = sy * m[1 * 4 + 0];
        this[5] = sy * m[1 * 4 + 1];
        this[6] = sy * m[1 * 4 + 2];
        this[7] = sy * m[1 * 4 + 3];
        this[8] = sz * m[2 * 4 + 0];
        this[9] = sz * m[2 * 4 + 1];
        this[10] = sz * m[2 * 4 + 2];
        this[11] = sz * m[2 * 4 + 3];*/
        const matrix = Matrix4x4.identity;
        m4.scale(matrix, vector.x, vector.y, vector.z, matrix);
        this.multiply(matrix, this);
    }

    vector4(): Vector4 {
        const vector = Vector4.zero;
        for (var i = 0; i < 4; ++i) {
            vector[i] = 0.0;
            for (var j = 0; j < 4; ++j) {
                vector[i] += vector[j] * this[j * 4 + i];
            }
        }
        return vector;
    }

    static get identity(): Float32Array {
        return new Float32Array([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
    }

    static log(matrix: Float32Array, name?: String) {
        console.log("-----------------------------")
        console.log(name);
        console.log(matrix[0], matrix[4], matrix[8], matrix[12])
        console.log(matrix[1], matrix[5], matrix[9], matrix[13])
        console.log(matrix[2], matrix[6], matrix[10], matrix[14])
        console.log(matrix[3], matrix[7], matrix[11], matrix[15])
        console.log("-----------------------------")
    }

    /* Getter */
    get 0() { return this._matrix[0] }
    get 1() { return this._matrix[1] }
    get 2() { return this._matrix[2] }
    get 3() { return this._matrix[3] }
    get 4() { return this._matrix[4] }
    get 5() { return this._matrix[5] }
    get 6() { return this._matrix[6] }
    get 7() { return this._matrix[7] }
    get 8() { return this._matrix[8] }
    get 9() { return this._matrix[9] }
    get 10() { return this._matrix[10] }
    get 11() { return this._matrix[11] }
    get 12() { return this._matrix[12] }
    get 13() { return this._matrix[13] }
    get 14() { return this._matrix[14] }
    get 15() { return this._matrix[15] }

    /* Setter */
    set 0(value) { this._matrix[0] = value; }
    set 1(value) { this._matrix[1] = value; }
    set 2(value) { this._matrix[2] = value; }
    set 3(value) { this._matrix[3] = value; }
    set 4(value) { this._matrix[4] = value; }
    set 5(value) { this._matrix[5] = value; }
    set 6(value) { this._matrix[6] = value; }
    set 7(value) { this._matrix[7] = value; }
    set 8(value) { this._matrix[8] = value; }
    set 9(value) { this._matrix[9] = value; }
    set 10(value) { this._matrix[10] = value; }
    set 11(value) { this._matrix[11] = value; }
    set 12(value) { this._matrix[12] = value; }
    set 13(value) { this._matrix[13] = value; }
    set 14(value) { this._matrix[14] = value; }
    set 15(value) { this._matrix[15] = value; }
}
export default Matrix4x4;