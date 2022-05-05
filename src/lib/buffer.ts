import webGL from "./webGL";
class Buffer {

    private name: string
    private index: number;
    private position : WebGLBuffer
    private vao : WebGLVertexArrayObject

    constructor(name: string,program: WebGLProgram,options) {
        this.name = name;
        this.index = webGL.getContext().getAttribLocation(program, name);
        this.create(options);
    }

    create(options : any) {
        const context = webGL.getContext();
        this.position = context.createBuffer();

        // Create a vertex array object (attribute state)
        this.vao = context.createVertexArray();

        // and make it the one we're currently working with
        context.bindVertexArray(this.vao);

        // Turn on the attribute
        context.enableVertexAttribArray(this.index);

        // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
        context.bindBuffer(context.ARRAY_BUFFER, this.position);

        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        //var size = 2;          // vec4 = {x:0, y:0, z:0, w:0} -> size = 2 rece apenas o x e y
        var type = context.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
        context.vertexAttribPointer(this.index, options.size, type, normalize, stride, offset);
    }

    render(){
        const context = webGL.getContext();
        context.bindVertexArray(this.vao);
        context.bindBuffer(context.ARRAY_BUFFER, this.position);
    }

    getIndex(): number {
        return this.index;
    }
}
export default Buffer;