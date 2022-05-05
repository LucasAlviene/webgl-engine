class Color {

    private _r: number = 0;
    private _g: number = 0;
    private _b: number = 0;
    private _a: number = 0;

    constructor(rgba: number[]);
    constructor(r: number, g: number, b: number, a: number);
    constructor(r: number | number[] = 255, g: number = 255, b: number = 255, a: number = 255) {
        if (Array.isArray(r)) {
            this.r = r[0] ?? 255;
            this.g = r[1] ?? 255;
            this.b = r[2] ?? 255;
            this.a = r[3] ?? 255;
        } else {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }
    }

    public normalize(): number[] {
        return [this.r / 255, this.g / 255, this.b / 255, this.a / 255];
    }

    get 0(): number { return this._r };
    get 1(): number { return this._g };
    get 2(): number { return this._b };
    get 3(): number { return this._a };

    get r(): number { return this._r; }
    get g(): number { return this._g; }
    get b(): number { return this._b; }
    get a(): number { return this._a; }

    set r(value: number) {
        if (value < 0) value = 0;
        if (value > 255) value = 255;
        this._r = value;
    }
    set g(value: number) {
        if (value < 0) value = 0;
        if (value > 255) value = 255;
        this._g = value;
    }
    set b(value: number) {
        if (value < 0) value = 0;
        if (value > 255) value = 255;
        this._b = value;
    }
    set a(value: number) {
        if (value < 0) value = 0;
        if (value > 255) value = 255;
        this._a = value;
    }

    set 0(value: number) { this.r = value; };
    set 1(value: number) { this.g = value; };
    set 2(value: number) { this.b = value; };
    set 3(value: number) { this.a = value; };
}
export default Color;