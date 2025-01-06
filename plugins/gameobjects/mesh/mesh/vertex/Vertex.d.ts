export default Vertex;

declare namespace Vertex {
    interface IPoint {
        x: number,
        y: number
    }
}

declare class Vertex {
    setName(name: string | number): this;
    name: string | number;

    setUV(u: number, v: number): this;
    u: number;
    v: number;

    // setFrameUV(frameU0: number, frameV0: number, frameU1: number, frameV1: number): this;
    // frameU: number;
    // frameV: number;
    // setFrameSize(frameWidth: number, frameHeight: number): this;
    // frameX: number;
    // frameY: number;

    resetPosition(): this;
    setLocalPosition(x: number, y: number): this;
    rotateAround(ox: number, oy: number, rotation: number): this;
    localX: number;
    localY: number;

    setAlpha(value: number): this;
    alpha: number;

    setColor(value: number): this;
    color: number;

    getWorldXY(out: Vertex.IPoint): Vertex.IPoint | null;
    setWorldXY(x: number, y: number): this;
    setPosition(x: number, y: number): this;
    x: number;
    y: number;
}