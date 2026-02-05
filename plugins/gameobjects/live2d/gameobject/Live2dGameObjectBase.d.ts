export default Live2dGameObjectBase;

declare namespace Live2dGameObjectBase {

}

/**
 * Base transform and display API surface shared by Live2D game objects.
 */
declare class Live2dGameObjectBase extends Phaser.GameObjects.Extern {

    /**
     * Clear alpha and restore fully opaque rendering.
     *
     * @returns This game object.
     */
    clearAlpha(): this;
    /**
     * Set alpha value.
     *
     * @param value - Alpha value in the range of 0 to 1.
     * @returns This game object.
     */
    setAlpha(value?: number): this;
    alpha: number;

    width: number;
    height: number;
    displayWidth: number;
    displayHeight: number;
    /**
     * Set native size.
     *
     * @param width - Native width.
     * @param height - Native height.
     * @returns This game object.
     */
    setSize(
        width: number,
        height: number
    ): this;
    /**
     * Set display size.
     *
     * @param width - Display width.
     * @param height - Display height.
     * @returns This game object.
     */
    setDisplaySize(
        width: number,
        height: number
    ): this;

    getCenter<O extends Phaser.Math.Vector2>(output?: O): O;
    /**
     * Get top-left point in world space.
     *
     * @param output - Optional output vector.
     * @param includeParent - Include parent container transform if true.
     * @returns Top-left point.
     */
    getTopLeft<O extends Phaser.Math.Vector2>(
        output?: O,
        includeParent?: boolean
    ): O;
    /**
     * Get top-center point in world space.
     *
     * @param output - Optional output vector.
     * @param includeParent - Include parent container transform if true.
     * @returns Top-center point.
     */
    getTopCenter<O extends Phaser.Math.Vector2>(
        output?: O,
        includeParent?: boolean
    ): O;
    /**
     * Get top-right point in world space.
     *
     * @param output - Optional output vector.
     * @param includeParent - Include parent container transform if true.
     * @returns Top-right point.
     */
    getTopRight<O extends Phaser.Math.Vector2>(
        output?: O,
        includeParent?: boolean
    ): O;
    /**
     * Get left-center point in world space.
     *
     * @param output - Optional output vector.
     * @param includeParent - Include parent container transform if true.
     * @returns Left-center point.
     */
    getLeftCenter<O extends Phaser.Math.Vector2>(
        output?: O,
        includeParent?: boolean
    ): O;
    /**
     * Get right-center point in world space.
     *
     * @param output - Optional output vector.
     * @param includeParent - Include parent container transform if true.
     * @returns Right-center point.
     */
    getRightCenter<O extends Phaser.Math.Vector2>(
        output?: O,
        includeParent?: boolean
    ): O;
    /**
     * Get bottom-left point in world space.
     *
     * @param output - Optional output vector.
     * @param includeParent - Include parent container transform if true.
     * @returns Bottom-left point.
     */
    getBottomLeft<O extends Phaser.Math.Vector2>(
        output?: O,
        includeParent?: boolean
    ): O;
    /**
     * Get bottom-center point in world space.
     *
     * @param output - Optional output vector.
     * @param includeParent - Include parent container transform if true.
     * @returns Bottom-center point.
     */
    getBottomCenter<O extends Phaser.Math.Vector2>(
        output?: O,
        includeParent?: boolean
    ): O;
    /**
     * Get bottom-right point in world space.
     *
     * @param output - Optional output vector.
     * @param includeParent - Include parent container transform if true.
     * @returns Bottom-right point.
     */
    getBottomRight<O extends Phaser.Math.Vector2>(
        output?: O,
        includeParent?: boolean
    ): O;
    /**
     * Get world-space bounds rectangle.
     *
     * @param output - Optional output rectangle.
     * @returns Bounds rectangle.
     */
    getBounds<O extends Phaser.Geom.Rectangle>(output?: O): O;

}
