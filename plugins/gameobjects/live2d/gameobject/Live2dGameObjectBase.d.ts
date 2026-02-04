export default Live2dGameObjectBase;

declare namespace Live2dGameObjectBase {

}

/**
 * Base transform and display API surface shared by Live2D game objects.
 */
declare class Live2dGameObjectBase extends Phaser.GameObjects.GameObject {

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

    blendMode: Phaser.BlendModes | string;
    /**
     * Set blend mode.
     *
     * @param value - Blend mode name or Phaser blend mode constant.
     * @returns This game object.
     */
    setBlendMode(value: string | Phaser.BlendModes): this;

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

    depth: number;
    /**
     * Set depth value used for display ordering.
     *
     * @param value - New depth value.
     * @returns This game object.
     */
    setDepth(value: number): this;

    /**
     * Get center point in world space.
     *
     * @param output - Optional output vector.
     * @returns Center point.
     */
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

    originX: number;
    originY: number;
    displayOriginX: number;
    displayOriginY: number;
    /**
     * Set origin using normalized coordinates.
     *
     * @param x - Horizontal origin in the range of 0 to 1.
     * @param y - Vertical origin in the range of 0 to 1.
     * @returns This game object.
     */
    setOrigin(
        x?: number,
        y?: number
    ): this;
    /**
     * Set origin based on frame origin data.
     *
     * @returns This game object.
     */
    setOriginFromFrame(): this;
    /**
     * Set display origin in pixels.
     *
     * @param x - Horizontal display origin.
     * @param y - Vertical display origin.
     * @returns This game object.
     */
    setDisplayOrigin(
        x?: number,
        y?: number
    ): this;
    /**
     * Recalculate display origin from origin and size.
     *
     * @returns This game object.
     */
    updateDisplayOrigin(): this;

    scrollFactorX: number;
    scrollFactorY: number;
    /**
     * Set camera scroll factors.
     *
     * @param x - Horizontal scroll factor.
     * @param y - Vertical scroll factor.
     * @returns This game object.
     */
    setScrollFactor(
        x: number,
        y?: number
    ): this;

    x: number;
    y: number;
    z: number;
    w: number;
    scale: number;
    scaleX: number;
    scaleY: number;
    angle: number;
    rotation: number;
    /**
     * Set position components.
     *
     * @param x - Horizontal position.
     * @param y - Vertical position.
     * @param z - Z position.
     * @param w - W position.
     * @returns This game object.
     */
    setPosition(
        x?: number,
        y?: number,
        z?: number,
        w?: number
    ): this;
    /**
     * Copy position from a vector-like object.
     *
     * @param source - Source vector values.
     * @returns This game object.
     */
    copyPosition(source: Phaser.Types.Math.Vector2Like | Phaser.Types.Math.Vector3Like | Phaser.Types.Math.Vector4Like): this;
    /**
     * Set random position within a rectangle.
     *
     * @param x - Rectangle left position.
     * @param y - Rectangle top position.
     * @param width - Rectangle width.
     * @param height - Rectangle height.
     * @returns This game object.
     */
    setRandomPosition(
        x?: number,
        y?: number,
        width?: number,
        height?: number
    ): this;
    /**
     * Set rotation in radians.
     *
     * @param radians - Rotation value in radians.
     * @returns This game object.
     */
    setRotation(radians?: number): this;
    /**
     * Set angle in degrees.
     *
     * @param degrees - Rotation value in degrees.
     * @returns This game object.
     */
    setAngle(degrees?: number): this;
    /**
     * Set scale.
     *
     * @param x - Horizontal scale.
     * @param y - Vertical scale.
     * @returns This game object.
     */
    setScale(
        x: number,
        y?: number
    ): this;
    /**
     * Set x position.
     *
     * @param value - New x value.
     * @returns This game object.
     */
    setX(value?: number): this;
    /**
     * Set y position.
     *
     * @param value - New y value.
     * @returns This game object.
     */
    setY(value?: number): this;
    /**
     * Set z position.
     *
     * @param value - New z value.
     * @returns This game object.
     */
    setZ(value?: number): this;
    /**
     * Set w position.
     *
     * @param value - New w value.
     * @returns This game object.
     */
    setW(value?: number): this;
    /**
     * Get local transform matrix.
     *
     * @param tempMatrix - Optional matrix instance to write into.
     * @returns Local transform matrix.
     */
    getLocalTransformMatrix(tempMatrix?: Phaser.GameObjects.Components.TransformMatrix): Phaser.GameObjects.Components.TransformMatrix;
    /**
     * Get world transform matrix.
     *
     * @param tempMatrix - Optional matrix instance to write into.
     * @param parentMatrix - Optional parent transform matrix.
     * @returns World transform matrix.
     */
    getWorldTransformMatrix(
        tempMatrix?: Phaser.GameObjects.Components.TransformMatrix,
        parentMatrix?: Phaser.GameObjects.Components.TransformMatrix
    ): Phaser.GameObjects.Components.TransformMatrix;
    /**
     * Convert world position to local position.
     *
     * @param x - World x coordinate.
     * @param y - World y coordinate.
     * @param point - Optional output vector.
     * @param camera - Optional camera reference.
     * @returns Local-space point.
     */
    getLocalPoint(
        x: number,
        y: number,
        point?: Phaser.Math.Vector2,
        camera?: Phaser.Cameras.Scene2D.Camera
    ): Phaser.Math.Vector2;
    /**
     * Get accumulated parent rotation in radians.
     *
     * @returns Parent rotation value.
     */
    getParentRotation(): number;

    visible: boolean;
    /**
     * Set visibility.
     *
     * @param value - True to show, false to hide.
     * @returns This game object.
     */
    setVisible(value: boolean): this;
}
