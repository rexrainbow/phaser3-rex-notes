import Vertex from './vertex/Vertex';
import Face from './vertex/Face';

export default Mesh;

declare namespace Mesh {
    type DebugCallback = (
        src: Mesh,
        meshLength: number,
        verts: number[]
    ) => void
}

declare class Mesh extends Phaser.GameObjects.GameObject {

    clear(): this;
    createVertex(u?: number, v?: number): Vertex;
    createFace(vertex0?: Vertex, vertex1?: Vertex, vertex2?: Vertex): Face;
    addFace(face: Face): this;
    addFaces(faces: Face[]): this;
    getVertexByName(name: string | number): Vertex | null;
    getFaceByName(name: string | number): Face | null;
    resetVerticesPosition(): this;

    setTintFill(value?: boolean): this;

    setDebug(
        graphic: Phaser.GameObjects.Graphics,
        callback?: Mesh.DebugCallback
    ): this;
}