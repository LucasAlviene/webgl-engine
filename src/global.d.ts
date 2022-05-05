declare module '*.hlsl' {
    const data: string;
    export default data;
}

declare module '*.jpg' {
    const data: any;
    export default data;
}

interface ObjData{
    position: number[]
    texcoord: number[]
    webglVertexData: number[]
}
type Arrays = {
    [key: string]: any;
};
declare module '*.obj' {
    const data: Arrays;
    export default data;
}