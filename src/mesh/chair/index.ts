import WebGL from "@lib/webGL";
import vertex from "./vertex.hlsl"
import fragment from './fragment.hlsl'
//@ts-ignore
import chairObj from './chair.obj'
import Object from "@lib/object";
import Model from "@lib/engine/model";

import * as twgl from 'twgl.js';

import { createPrimitives } from '@utils/primitives'

import m4 from "@utils/m4";
import Vector3 from "@lib/engine/vector3";
import Matrix4x4 from "@lib/matrix4x4";
import Camera from "@lib/camera";

class Chair extends Object {

  private vao: any;
  private bufferIfno: any;
  private cubeUniforms: any;
  private parts: any;

  constructor() {
    super(vertex, fragment);
    const context = WebGL.getContext();

    this.cubeUniforms = {
      u_lightDirection: m4.normalize([-1, 3, 5])
    };
    this.parts = chairObj.geometries.map(({ data }) => {
      const bufferInfo = twgl.createBufferInfoFromArrays(context, data);

      const vao = twgl.createVAOFromBufferInfo(context, this.program, bufferInfo);
      return {
        material: {
          u_diffuse: [Math.random(), Math.random(), Math.random(), 1],
        },
        bufferInfo,
        vao,
      };
    });
  }

  render(gameObject: Model) {
    const context = WebGL.getContext();
    this.useProgram();
    // ------ Draw the cube --------

    // Setup all the needed attributes.
    //        this.cubeUniforms.u_view = Camera.view;
    //       this.cubeUniforms.u_projection = Camera.projection;
    twgl.setUniforms(this.program, this.cubeUniforms);

    for (const { bufferInfo, vao, material } of this.parts) {
      // set the attributes for this part.
      context.bindVertexArray(vao);
      // calls gl.uniform
      twgl.setUniforms(this.program, {
        u_matrix: m4.multiply(Camera.viewProjection, gameObject.transform.worldMatrix),//gameObject.transform.matrix,
        u_diffuse: material.u_diffuse,
      });
      // calls gl.drawArrays or gl.drawElements
      twgl.drawBufferInfo(context, bufferInfo);
    }
  }

}

export default Chair;