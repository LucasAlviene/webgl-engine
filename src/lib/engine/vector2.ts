class Vector2 {

    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    toArray() : number[]{
        return [this.x,this.y];
    }
    
    static get zero() : Vector2{
        return new Vector2(0,0);
    }

    static get one() : Vector2{
        return new Vector2(1,1);
    }

    get 0(): number{
        return this.x;
    }

    get 1(): number{
        return this.y;
    }

    set 0(x : number){
        this.x = x;
    }

    set 1(y : number){
        this.y = y;
    }

    static Distance(v1: Vector2, v2: Vector2) : number{
        return Math.sqrt(Math.pow(v2.x - v1.x,2) + Math.pow(v2.y - v1.y,2))
    }
}

export default Vector2;