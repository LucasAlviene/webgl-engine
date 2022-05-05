import * as twgl from 'twgl.js'
function createFlattenedVertices(gl: WebGL2RenderingContext, vertices, vertsPerColor: number) {
    let last;
    return twgl.createBufferInfoFromArrays(
        gl,
        twgl.primitives.makeRandomVertexColors(
            twgl.primitives.deindexVertices(vertices),
            {
                vertsPerColor: vertsPerColor || 1,
                rand: function (ndx, channel) {
                    if (channel === 0) {
                        last = 128 + Math.random() * 128 | 0;
                    }
                    return channel < 3 ? last : 255;
                },
            })
    );
}
interface TypeReturn {
    [key: string]: twgl.primitives.TypedArray
}

function createFlattenedFunc(createVerticesFunc: Function, vertsPerColor: number) {
    return function (gl: WebGL2RenderingContext, ...n: any[]) {
        const arrays = createVerticesFunc.apply(null, Array.prototype.slice.call(arguments, 1));
        return createFlattenedVertices(gl, arrays, vertsPerColor);
    };
}

// These functions make primitives with semi-random vertex colors.
// This means the primitives can be displayed without needing lighting
// which is important to keep the samples simple.

export default {
    "create3DFBufferInfo": createFlattenedFunc(twgl.primitives.create3DFVertices, 6),
    "createCubeBufferInfo": createFlattenedFunc(twgl.primitives.createCubeVertices, 6),
    "createPlaneBufferInfo": createFlattenedFunc(twgl.primitives.createPlaneVertices, 6),
    "createSphereBufferInfo": createFlattenedFunc(twgl.primitives.createSphereVertices, 6),
    "createTruncatedConeBufferInfo": createFlattenedFunc(twgl.primitives.createTruncatedConeVertices, 6),
    "createXYQuadBufferInfo": createFlattenedFunc(twgl.primitives.createXYQuadVertices, 6),
    //"createCresentBufferInfo": createFlattenedFunc(twgl.primitives.createCresentVertices, 6),
    "createCylinderBufferInfo": createFlattenedFunc(twgl.primitives.createCylinderVertices, 6),
    "createTorusBufferInfo": createFlattenedFunc(twgl.primitives.createTorusVertices, 6),
    "createDiscBufferInfo": createFlattenedFunc(twgl.primitives.createDiscVertices, 4),
};

const listPrimitives = [
    "createCubeVertices",
    "createSphereVertices",
    "createTruncatedConeVertices"
];
const primitivesParams = {
    "createCubeVertices": [20],
    "createSphereVertices" : [10,12,6],
    "createTruncatedConeVertices": [10, 0, 20, 12, 1, true, false]
}

export const createRandomPrimitives = (gl : WebGL2RenderingContext,vertsPerColor : number = 6) => {
    const primitive = listPrimitives[Math.round(Math.random() * (listPrimitives.length - 1))];
    const array = twgl.primitives[primitive].apply(null,primitivesParams[primitive]);
    return createFlattenedVertices(gl,array,vertsPerColor);
}

export const createPrimitives = (gl : WebGL2RenderingContext,name : string, vertsPerColor : number = 6) => {
    const array = twgl.primitives[name].apply(null,primitivesParams[name]);
    return createFlattenedVertices(gl,array,vertsPerColor);
}