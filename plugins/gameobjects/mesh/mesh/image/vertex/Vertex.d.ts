export default Vertex;

declare namespace Vertex {
    /**
     * A 2D point object.
     */
    interface IPoint {
        /**
         * Horizontal coordinate.
         */
        x: number,
        /**
         * Vertical coordinate.
         */
        y: number
    }
}

/**
 * A mesh vertex with UV, position, alpha, and color data.
 */
declare class Vertex {
    /**
     * Set vertex name.
     *
     * @param name - Vertex name or id.
     * @returns This vertex instance.
     */
    setName(name: string | number): this;
    /**
     * Vertex name or id.
     */
    name: string | number;

    /**
     * Set UV coordinates.
     *
     * @param u - Horizontal UV coordinate.
     * @param v - Vertical UV coordinate.
     * @returns This vertex instance.
     */
    setUV(
        u: number,
        v: number
    ): this;
    /**
     * Horizontal UV coordinate.
     */
    u: number;
    /**
     * Vertical UV coordinate.
     */
    v: number;

    // setFrameUV(frameU0: number, frameV0: number, frameU1: number, frameV1: number): this;
    // frameU: number;
    // frameV: number;
    // setFrameSize(frameWidth: number, frameHeight: number): this;
    // frameX: number;
    // frameY: number;

    /**
     * Reset local position to the frame position.
     *
     * @returns This vertex instance.
     */
    resetPosition(): this;
    /**
     * Set local position.
     *
     * @param x - Local x coordinate.
     * @param y - Local y coordinate.
     * @returns This vertex instance.
     */
    setLocalPosition(
        x: number,
        y: number
    ): this;
    /**
     * Rotate local position around an origin.
     *
     * @param ox - Origin x coordinate.
     * @param oy - Origin y coordinate.
     * @param rotation - Rotation in radians.
     * @returns This vertex instance.
     */
    rotateAround(
        ox: number,
        oy: number,
        rotation: number
    ): this;
    /**
     * Local x coordinate.
     */
    localX: number;
    /**
     * Local y coordinate.
     */
    localY: number;

    /**
     * Set vertex alpha.
     *
     * @param value - Alpha value.
     * @returns This vertex instance.
     */
    setAlpha(value: number): this;
    /**
     * Vertex alpha.
     */
    alpha: number;

    /**
     * Set vertex tint color.
     *
     * @param value - Tint color as a hex number.
     * @returns This vertex instance.
     */
    setColor(value: number): this;
    /**
     * Vertex tint color as a hex number.
     */
    color: number;

    /**
     * Get world position from local position.
     *
     * @param out - Output point object.
     * @returns The output point, or null if this vertex has no parent mesh.
     */
    getWorldXY(out: Vertex.IPoint): Vertex.IPoint | null;
    /**
     * Set position in world space.
     *
     * @param x - World x coordinate.
     * @param y - World y coordinate.
     * @returns This vertex instance.
     */
    setWorldXY(
        x: number,
        y: number
    ): this;
    /**
     * Alias of setWorldXY.
     *
     * @param x - World x coordinate.
     * @param y - World y coordinate.
     * @returns This vertex instance.
     */
    setPosition(
        x: number,
        y: number
    ): this;
    /**
     * World x coordinate.
     */
    x: number;
    /**
     * World y coordinate.
     */
    y: number;
}
