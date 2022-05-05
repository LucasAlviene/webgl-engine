import WebGL from "@lib/webGL";
import Program from './program';
import Model from './engine/model';
import * as twgl from 'twgl.js';
import Matrix4x4 from "./matrix4x4";

class ObjectDef {
    protected program: twgl.ProgramInfo

    constructor(vertex?: string, fragment?: string) {
        const context = WebGL.getContext();
        twgl.setAttributePrefix("a_");
        this.program = twgl.createProgramInfo(context,[vertex,fragment]);
        //this.program = WebGL.createProgram(vertex, fragment);
    }

    useProgram() {
        const context = WebGL.getContext();
        context.useProgram(this.program.program)
    }

    render(gameObject: Model) {

    }
}
export default ObjectDef;