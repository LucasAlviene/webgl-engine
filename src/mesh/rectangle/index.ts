import WebGL from "@lib/webGL";
import Buffer from "@lib/buffer";
import vertex from "./vertex.hlsl"
import fragment from './fragment.hlsl'
import Object from "@lib/object";

class Rectangle extends Object{
    /*

    private a_position: Buffer;
    private resolutionUniformLocation: WebGLUniformLocation;
    private colorLocation: WebGLUniformLocation;

    constructor() {
        super(vertex,fragment);
        this.a_position = this.program.attribute("a_position");
        this.resolutionUniformLocation = this.program.getUniform("u_resolution");
        this.colorLocation = this.program.getUniform("u_color");
    }

    render(gameObject: GameObject) {
        const context = WebGL.getContext();

        this.useProgram();
        this.a_position.render();
        context.uniform2f(this.resolutionUniformLocation, context.canvas.width, context.canvas.height);

        // Update the position buffer with rectangle positions
        const {translation} = gameObject.transform;
        this.setRectangle(translation.x, translation.y, gameObject.width, gameObject.height);

        // Set a random color.
        context.uniform4fv(this.colorLocation, gameObject.color);

        // Draw the rectangle.
        var primitiveType = context.TRIANGLES;
        var offset = 0;
        var count = 6;
        context.drawArrays(primitiveType, offset, count);

    }

    setRectangle(x : number, y : number, width : number, height : number) {
        const context = WebGL.getContext();
        var x1 = x;
        var x2 = x + width;
        var y1 = y;
        var y2 = y + height;
        context.bufferData(context.ARRAY_BUFFER, new Float32Array([
            x1, y1,
            x2, y1,
            x1, y2,
            x1, y2,
            x2, y1,
            x2, y2,
        ]), context.STATIC_DRAW);
    }*/
}
export default Rectangle;