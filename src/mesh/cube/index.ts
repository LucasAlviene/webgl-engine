import WebGL from "@lib/webGL";
import vertex from "./vertex.hlsl"
import fragment from './fragment.hlsl'
import cubeObj from './cube.obj'
import Object from "@lib/object";
import Model from "@lib/engine/model";

import * as twgl from 'twgl.js';

import { createPrimitives } from '@utils/primitives'

import m4 from "@utils/m4";
import Vector3 from "@lib/engine/vector3";
import Matrix4x4 from "@lib/matrix4x4";
import Camera from "@lib/camera";
import Color from "@lib/color";

class Cube extends Object {

    private vao: any;
    private bufferIfno: any;
    private cubeUniforms: any;

    constructor(name: string) {
        super(vertex, fragment);
        const context = WebGL.getContext();

        this.bufferIfno = createPrimitives(context, name);
        this.vao = twgl.createVAOFromBufferInfo(
            context,
            this.program,
            this.bufferIfno,
        );

        this.cubeUniforms = {
            u_colorMult: [1, 0.5, 0.5, 1],
            u_matrix: Matrix4x4.identity,
        };
    }

    render(gameObject: Model) {
        const context = WebGL.getContext();
        this.useProgram();
        // ------ Draw the cube --------

        // Setup all the needed attributes.
        context.bindVertexArray(this.vao);
        this.cubeUniforms.u_colorMult = new Color(gameObject.color).normalize();
        this.cubeUniforms.u_matrix = m4.multiply(Camera.viewProjection, gameObject.transform.worldMatrix);

        // Set the uniforms we just computed
        twgl.setUniforms(this.program, this.cubeUniforms);
        twgl.drawBufferInfo(context, this.bufferIfno);
    }

}
export default Cube;