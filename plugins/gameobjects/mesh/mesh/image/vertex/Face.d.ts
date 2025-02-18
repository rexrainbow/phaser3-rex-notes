import Vertex from './Vertex';

export default Face;

declare class Face {
    constructor(
        vertex0?: Vertex,
        vertex1?: Vertex,
        vertex2?: Vertex
    );
    vertex0: Vertex;
    vertex1: Vertex;
    vertex2: Vertex;

    setName(name: string | number): this;
    name: string | number;

    setUV(
        u0: number, v0: number,
        u1: number, v1: number,
        u2: number, v2: number
    ): this;

    setLocalOffset(x: number, y: number): this;
    resetVerticesPosition(): this;
    updateVerticesPosition(): this;
    localOffsetX: number;
    localOffsetY: number;

    setRotation(value: number): this;
    rotation: number;

    setAngle(value: number): this;
    angle: number;

    setAlpha(value: number): this;
    alpha: number;

    setColor(value: number): this;
    color: number;

    setFrameUV(frameU0: number, frameV0: number, frameU1: number, frameV1: number): this;
    setFrameSize(frameWidth: number, frameHeight: number): this;

    contains(localX: number, localY: number): this;

}