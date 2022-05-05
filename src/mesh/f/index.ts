import WebGL from "@lib/webGL";
import Buffer from "@lib/buffer";
import vertex from "./vertex.hlsl"
import fragment from './fragment.hlsl'
import Object from "@lib/object";
import GameObject from "@lib/engine/model";
import Vector2 from "@lib/engine/vector2";

class F extends Object {
/*
    private a_position: Buffer;
    private resolutionUniformLocation: WebGLUniformLocation;
    private colorLocation: WebGLUniformLocation;
    private translationLocation: WebGLUniformLocation;

    constructor() {
        super(vertex, fragment);
        this.a_position = this.program.attribute("a_position");
        this.resolutionUniformLocation = this.program.getUniform("u_resolution");
        this.colorLocation = this.program.getUniform("u_color");
        this.translationLocation = this.program.getUniform("u_translation");;
    }

    render(gameObject: GameObject) {
        this.useProgram();
        const context = WebGL.getContext();

        this.a_position.render();
        context.uniform2f(this.resolutionUniformLocation, context.canvas.width, context.canvas.height);

        // Update the position buffer with rectangle positions
        this.setGeometry();
        
        // Set a random color.
        context.uniform4fv(this.colorLocation, gameObject.color);
        const translation = gameObject.transform.translation as Vector2;
        context.uniform2fv(this.translationLocation, [translation.x,translation.y]);

        // Draw the rectangle.
        var primitiveType = context.TRIANGLES;
        var offset = 0;
        var count = 18;
        context.drawArrays(primitiveType, offset, count);

    }

    setGeometry() {
        const context = WebGL.getContext();
        context.bufferData(
            context.ARRAY_BUFFER,
            new Float32Array([
                // left column
                0, 0,
                30, 0,
                0, 150,
                0, 150,
                30, 0,
                30, 150,

                // top rung
                30, 0,
                100, 0,
                30, 30,
                30, 30,
                100, 0,
                100, 30,

                // middle rung
                30, 60,
                67, 60,
                30, 90,
                30, 90,
                67, 60,
                67, 90,
            ]),
            context.STATIC_DRAW);
    }*/
}
export default F;