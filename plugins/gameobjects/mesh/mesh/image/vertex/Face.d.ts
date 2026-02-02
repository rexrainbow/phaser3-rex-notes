import Vertex from './Vertex';

export default Face;

/**
 * A triangle face made of 3 mesh vertices.
 */
declare class Face {
    /**
     * Create a face from 3 vertices.
     *
     * @param vertex0 - First vertex.
     * @param vertex1 - Second vertex.
     * @param vertex2 - Third vertex.
     */
    constructor(
        vertex0?: Vertex,
        vertex1?: Vertex,
        vertex2?: Vertex
    );
    /**
     * First vertex.
     */
    vertex0: Vertex;
    /**
     * Second vertex.
     */
    vertex1: Vertex;
    /**
     * Third vertex.
     */
    vertex2: Vertex;

    /**
     * Set face name.
     *
     * @param name - Face name or id.
     * @returns This face instance.
     */
    setName(name: string | number): this;
    /**
     * Face name or id.
     */
    name: string | number;

    /**
     * Set UV coordinates for all 3 vertices.
     *
     * @param u0 - Vertex0 u value.
     * @param v0 - Vertex0 v value.
     * @param u1 - Vertex1 u value.
     * @param v1 - Vertex1 v value.
     * @param u2 - Vertex2 u value.
     * @param v2 - Vertex2 v value.
     * @returns This face instance.
     */
    setUV(
        u0: number,
        v0: number,
        u1: number,
        v1: number,
        u2: number,
        v2: number
    ): this;

    /**
     * Set local offset of this face.
     *
     * @param x - Local offset x.
     * @param y - Local offset y.
     * @returns This face instance.
     */
    setLocalOffset(
        x: number,
        y: number
    ): this;
    /**
     * Reset each vertex to its frame position and re-apply face transform.
     *
     * @returns This face instance.
     */
    resetVerticesPosition(): this;
    /**
     * Recalculate vertex positions from frame position, offset, and rotation.
     *
     * @returns This face instance.
     */
    updateVerticesPosition(): this;
    /**
     * Local offset x.
     */
    localOffsetX: number;
    /**
     * Local offset y.
     */
    localOffsetY: number;

    /**
     * Set rotation in radians.
     *
     * @param value - Rotation in radians.
     * @returns This face instance.
     */
    setRotation(value: number): this;
    /**
     * Rotation in radians.
     */
    rotation: number;

    /**
     * Set rotation in degrees.
     *
     * @param value - Rotation in degrees.
     * @returns This face instance.
     */
    setAngle(value: number): this;
    /**
     * Rotation in degrees.
     */
    angle: number;

    /**
     * Set alpha for all 3 vertices.
     *
     * @param value - Alpha value.
     * @returns This face instance.
     */
    setAlpha(value: number): this;
    /**
     * Face alpha value.
     */
    alpha: number;

    /**
     * Set color for all 3 vertices.
     *
     * @param value - Tint color as a hex number.
     * @returns This face instance.
     */
    setColor(value: number): this;
    /**
     * Face tint color as a hex number.
     */
    color: number;

    /**
     * Set UV frame range for all 3 vertices.
     *
     * @param frameU0 - UV frame min u.
     * @param frameV0 - UV frame min v.
     * @param frameU1 - UV frame max u.
     * @param frameV1 - UV frame max v.
     * @returns This face instance.
     */
    setFrameUV(
        frameU0: number,
        frameV0: number,
        frameU1: number,
        frameV1: number
    ): this;
    /**
     * Set frame size used to derive local vertex positions.
     *
     * @param frameWidth - Frame width.
     * @param frameHeight - Frame height.
     * @returns This face instance.
     */
    setFrameSize(
        frameWidth: number,
        frameHeight: number
    ): this;

    /**
     * Test whether a local point is inside this face.
     *
     * @param localX - Local x coordinate.
     * @param localY - Local y coordinate.
     * @returns True if the point is inside this face.
     */
    contains(
        localX: number,
        localY: number
    ): boolean;

}
