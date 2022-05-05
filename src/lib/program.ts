import WebGL from "./webGL";
import Buffer from "./buffer";
import { ProgramInfo } from 'twgl.js';

class Program{

    private shaders : WebGLShader[] = [];
    private program : WebGLProgram;
    private programTwgl: ProgramInfo = null;

    constructor(vertex? : string,fragment? : string){
        if(vertex) this.vertex(vertex);
        if(fragment) this.fragment(fragment);
    }

    setProgram(program : ProgramInfo){
        this.programTwgl = program;
    }

    create(){
        const context = WebGL.getContext();
        const program = context.createProgram();
        for(const shader of this.shaders){
            context.attachShader(program, shader);
        }
        context.linkProgram(program);
        const success = context.getProgramParameter(program, context.LINK_STATUS);
        if (success) return this.program = program;

        console.log(context.getProgramInfoLog(program));
        context.deleteProgram(program);
    }

    shader(type: number,source: string) : WebGLShader{
        const context = WebGL.getContext();
        const shader = context.createShader(type);
        context.shaderSource(shader, source);
        context.compileShader(shader);
        const success = context.getShaderParameter(shader, context.COMPILE_STATUS);
        if (success){
            this.shaders.push(shader);
            return shader;
        }

        console.log(context.getShaderInfoLog(shader));
        context.deleteShader(shader);
    }

    fragment(source: string) : WebGLShader{
        const context = WebGL.getContext();
        return this.shader(context.FRAGMENT_SHADER,source)
    }
    vertex(source: string) : WebGLShader{
        const context = WebGL.getContext();
        return this.shader(context.VERTEX_SHADER,source)
    }

    attribute(name: string,options : any = {size:2}) : Buffer{
        return new Buffer(name,this.getProgram(),options);//webGL.getContext().getAttribLocation(webGL.program,name);
    }

    getUniform(name: string) : WebGLUniformLocation{
        return WebGL.getContext().getUniformLocation(this.getProgram(),name);
    }

    getProgram(){
        if(!this.program) return this.create();
        return this.program;
    }
    
    getProgramTwgl(){
        return this.programTwgl;
    }
}
export default Program;