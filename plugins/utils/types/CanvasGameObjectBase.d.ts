// import * as Phaser from 'phaser';

/**
 * Base type for canvas-backed game objects with common Phaser components.
 */
export default class CanvasGameObjectBase extends Phaser.GameObjects.GameObject {
    // Components

    /**
     * Clear alpha for all corners.
     * @returns This instance.
     */
    clearAlpha(): this;
    /**
     * Set alpha for each corner.
     * @param topLeft - Alpha for top-left.
     * @param topRight - Alpha for top-right.
     * @param bottomLeft - Alpha for bottom-left.
     * @param bottomRight - Alpha for bottom-right.
     * @returns This instance.
     */
    setAlpha(topLeft?: number, topRight?: number, bottomLeft?: number, bottomRight?: number): this;
    /**
     * Global alpha value.
     */
    alpha: number;
    /**
     * Alpha for the top-left corner.
     */
    alphaTopLeft: number;
    /**
     * Alpha for the top-right corner.
     */
    alphaTopRight: number;
    /**
     * Alpha for the bottom-left corner.
     */
    alphaBottomLeft: number;
    /**
     * Alpha for the bottom-right corner.
     */
    alphaBottomRight: number;

    /**
     * Blend mode.
     */
    blendMode: Phaser.BlendModes | string;
    /**
     * Set blend mode.
     * @param value - Blend mode value.
     * @returns This instance.
     */
    setBlendMode(value: string | Phaser.BlendModes): this;

    /**
     * Width value.
     */
    width: number;
    /**
     * Height value.
     */
    height: number;
    /**
     * Display width value.
     */
    displayWidth: number;
    /**
     * Display height value.
     */
    displayHeight: number;
    /**
     * Set size.
     * @param width - Width value.
     * @param height - Height value.
     * @returns This instance.
     */
    setSize(width: number, height: number): this;
    /**
     * Set display size.
     * @param width - Display width.
     * @param height - Display height.
     * @returns This instance.
     */
    setDisplaySize(width: number, height: number): this;
    /**
     * Texture reference.
     */
    texture: Phaser.Textures.Texture | Phaser.Textures.CanvasTexture;
    /**
     * Frame reference.
     */
    frame: Phaser.Textures.Frame;
    /**
     * True if this object is cropped.
     */
    isCropped: boolean;
    /**
     * Set a crop rectangle.
     * @param x - X or a rectangle.
     * @param y - Y value.
     * @param width - Crop width.
     * @param height - Crop height.
     * @returns This instance.
     */
    setCrop(x?: number | Phaser.Geom.Rectangle, y?: number, width?: number, height?: number): this;

    /**
     * Depth value.
     */
    depth: number;
    /**
     * Set depth value.
     * @param value - Depth value.
     * @returns This instance.
     */
    setDepth(value: number): this;
    setToTop(): this;
    setToBack(): this;
    setAbove(gameObject: Phaser.GameObjects.GameObject): this;
    setBelow(gameObject: Phaser.GameObjects.GameObject): this;

    /**
     * Horizontal flip state.
     */
    flipX: boolean;
    /**
     * Vertical flip state.
     */
    flipY: boolean;
    /**
     * Toggle horizontal flip.
     * @returns This instance.
     */
    toggleFlipX(): this;
    /**
     * Toggle vertical flip.
     * @returns This instance.
     */
    toggleFlipY(): this;
    /**
     * Set horizontal flip state.
     * @param value - True to flip horizontally.
     * @returns This instance.
     */
    setFlipX(value: boolean): this;
    /**
     * Set vertical flip state.
     * @param value - True to flip vertically.
     * @returns This instance.
     */
    setFlipY(value: boolean): this;
    /**
     * Set both horizontal and vertical flip states.
     * @param x - True to flip horizontally.
     * @param y - True to flip vertically.
     * @returns This instance.
     */
    setFlip(x: boolean, y: boolean): this;
    /**
     * Reset both flip states to false.
     * @returns This instance.
     */
    resetFlip(): this;

    /**
     * Get center point.
     * @param output - Optional output vector.
     * @returns The output vector.
     */
    getCenter<O extends Phaser.Math.Vector2>(output?: O): O;
    /**
     * Get top-left point.
     * @param output - Optional output vector.
     * @param includeParent - True to include parent transform.
     * @returns The output vector.
     */
    getTopLeft<O extends Phaser.Math.Vector2>(output?: O, includeParent?: boolean): O;
    /**
     * Get top-center point.
     * @param output - Optional output vector.
     * @param includeParent - True to include parent transform.
     * @returns The output vector.
     */
    getTopCenter<O extends Phaser.Math.Vector2>(output?: O, includeParent?: boolean): O;
    /**
     * Get top-right point.
     * @param output - Optional output vector.
     * @param includeParent - True to include parent transform.
     * @returns The output vector.
     */
    getTopRight<O extends Phaser.Math.Vector2>(output?: O, includeParent?: boolean): O;
    /**
     * Get left-center point.
     * @param output - Optional output vector.
     * @param includeParent - True to include parent transform.
     * @returns The output vector.
     */
    getLeftCenter<O extends Phaser.Math.Vector2>(output?: O, includeParent?: boolean): O;
    /**
     * Get right-center point.
     * @param output - Optional output vector.
     * @param includeParent - True to include parent transform.
     * @returns The output vector.
     */
    getRightCenter<O extends Phaser.Math.Vector2>(output?: O, includeParent?: boolean): O;
    /**
     * Get bottom-left point.
     * @param output - Optional output vector.
     * @param includeParent - True to include parent transform.
     * @returns The output vector.
     */
    getBottomLeft<O extends Phaser.Math.Vector2>(output?: O, includeParent?: boolean): O;
    /**
     * Get bottom-center point.
     * @param output - Optional output vector.
     * @param includeParent - True to include parent transform.
     * @returns The output vector.
     */
    getBottomCenter<O extends Phaser.Math.Vector2>(output?: O, includeParent?: boolean): O;
    /**
     * Get bottom-right point.
     * @param output - Optional output vector.
     * @param includeParent - True to include parent transform.
     * @returns The output vector.
     */
    getBottomRight<O extends Phaser.Math.Vector2>(output?: O, includeParent?: boolean): O;
    /**
     * Get bounds rectangle.
     * @param output - Optional output rectangle.
     * @returns The output rectangle.
     */
    getBounds<O extends Phaser.Geom.Rectangle>(output?: O): O;

    /**
     * Current mask.
     */
    mask: Phaser.Display.Masks.BitmapMask | Phaser.Display.Masks.GeometryMask;
    /**
     * Set the mask.
     * @param mask - Mask to apply.
     * @returns This instance.
     */
    setMask(mask: Phaser.Display.Masks.BitmapMask | Phaser.Display.Masks.GeometryMask): this;
    /**
     * Clear the current mask.
     * @param destroyMask - True to destroy the mask.
     * @returns This instance.
     */
    clearMask(destroyMask?: boolean): this;
    /**
     * Create a bitmap mask.
     * @param renderable - Renderable used to create the mask.
     * @returns The bitmap mask.
     */
    createBitmapMask(renderable?: Phaser.GameObjects.GameObject): Phaser.Display.Masks.BitmapMask;
    /**
     * Create a geometry mask.
     * @param graphics - Graphics used to create the mask.
     * @returns The geometry mask.
     */
    createGeometryMask(graphics?: Phaser.GameObjects.Graphics): Phaser.Display.Masks.GeometryMask;

    /**
     * Origin x value.
     */
    originX: number;
    /**
     * Origin y value.
     */
    originY: number;
    /**
     * Display origin x value.
     */
    displayOriginX: number;
    /**
     * Display origin y value.
     */
    displayOriginY: number;
    /**
     * Set origin.
     * @param x - Origin x.
     * @param y - Origin y.
     * @returns This instance.
     */
    setOrigin(x?: number, y?: number): this;
    /**
     * Set origin from frame data.
     * @returns This instance.
     */
    setOriginFromFrame(): this;
    /**
     * Set display origin.
     * @param x - Display origin x.
     * @param y - Display origin y.
     * @returns This instance.
     */
    setDisplayOrigin(x?: number, y?: number): this;
    /**
     * Update display origin from size and origin.
     */
    updateDisplayOrigin(): this;

    customRenderNodes: object;
    defaultRenderNodes: object;
    renderNodeData: object;
    initRenderNodes(defaultNodes: Map<string, string>): void;
    setRenderNodeRole(key: string, renderNode: string | Phaser.Renderer.WebGL.RenderNodes.RenderNode | null, renderNodeData?: object, copyData?: boolean): this;
    setRenderNodeData(renderNode: string | Phaser.Renderer.WebGL.RenderNodes.RenderNode, key: string, value: any): this;

    /**
     * Scroll factor X.
     */
    scrollFactorX: number;
    /**
     * Scroll factor Y.
     */
    scrollFactorY: number;
    /**
     * Set scroll factor.
     * @param x - Scroll factor x.
     * @param y - Scroll factor y.
     * @returns This instance.
     */
    setScrollFactor(x: number, y?: number): this;

    /**
     * Tint for the top-left corner.
     */
    tintTopLeft: number;
    /**
     * Tint for the top-right corner.
     */
    tintTopRight: number;
    /**
     * Tint for the bottom-left corner.
     */
    tintBottomLeft: number;
    /**
     * Tint for the bottom-right corner.
     */
    tintBottomRight: number;
    /**
     * True if tint fill mode is enabled.
     */
    tintFill: boolean;
    /**
     * Clear tint.
     * @returns This instance.
     */
    clearTint(): this;
    /**
     * Set corner tints.
     * @param topLeft - Tint for top-left.
     * @param topRight - Tint for top-right.
     * @param bottomLeft - Tint for bottom-left.
     * @param bottomRight - Tint for bottom-right.
     * @returns This instance.
     */
    setTint(topLeft?: number, topRight?: number, bottomLeft?: number, bottomRight?: number): this;
    /**
     * Set corner tints and enable fill.
     * @param topLeft - Tint for top-left.
     * @param topRight - Tint for top-right.
     * @param bottomLeft - Tint for bottom-left.
     * @param bottomRight - Tint for bottom-right.
     * @returns This instance.
     */
    setTintFill(topLeft?: number, topRight?: number, bottomLeft?: number, bottomRight?: number): this;
    /**
     * Unified tint value.
     */
    tint: number;
    /**
     * True if tinted.
     */
    readonly isTinted: boolean;

    readonly hasTransformComponent: boolean;

    x: number;
    /**
     * Y position.
     */
    y: number;
    /**
     * Z position.
     */
    z: number;
    /**
     * W position.
     */
    w: number;
    /**
     * Uniform scale.
     */
    scale: number;
    /**
     * Scale x.
     */
    scaleX: number;
    /**
     * Scale y.
     */
    scaleY: number;
    /**
     * Angle in degrees.
     */
    angle: number;
    /**
     * Rotation in radians.
     */
    rotation: number;
    /**
     * Set position.
     * @param x - X position.
     * @param y - Y position.
     * @param z - Z position.
     * @param w - W position.
     * @returns This instance.
     */
    setPosition(x?: number, y?: number, z?: number, w?: number): this;
    /**
     * Copy position from another vector.
     * @param source - Source vector.
     * @returns This instance.
     */
    copyPosition(source: Phaser.Types.Math.Vector2Like | Phaser.Types.Math.Vector3Like | Phaser.Types.Math.Vector4Like): this;
    /**
     * Set a random position within a rectangle.
     * @param x - X origin.
     * @param y - Y origin.
     * @param width - Width range.
     * @param height - Height range.
     * @returns This instance.
     */
    setRandomPosition(x?: number, y?: number, width?: number, height?: number): this;
    /**
     * Set rotation in radians.
     * @param radians - Rotation in radians.
     * @returns This instance.
     */
    setRotation(radians?: number): this;
    /**
     * Set angle in degrees.
     * @param degrees - Angle in degrees.
     * @returns This instance.
     */
    setAngle(degrees?: number): this;
    /**
     * Set scale.
     * @param x - Scale x.
     * @param y - Scale y.
     * @returns This instance.
     */
    setScale(x?: number, y?: number): this;
    /**
     * Set x position.
     * @param value - X value.
     * @returns This instance.
     */
    setX(value?: number): this;
    /**
     * Set y position.
     * @param value - Y value.
     * @returns This instance.
     */
    setY(value?: number): this;
    /**
     * Set z position.
     * @param value - Z value.
     * @returns This instance.
     */
    setZ(value?: number): this;
    /**
     * Set w position.
     * @param value - W value.
     * @returns This instance.
     */
    setW(value?: number): this;
    /**
     * Get local transform matrix.
     * @param tempMatrix - Optional temp matrix.
     * @returns The local transform matrix.
     */
    getLocalTransformMatrix(tempMatrix?: Phaser.GameObjects.Components.TransformMatrix): Phaser.GameObjects.Components.TransformMatrix;
    /**
     * Get world transform matrix.
     * @param tempMatrix - Optional temp matrix.
     * @param parentMatrix - Optional parent matrix.
     * @returns The world transform matrix.
     */
    getWorldTransformMatrix(tempMatrix?: Phaser.GameObjects.Components.TransformMatrix, parentMatrix?: Phaser.GameObjects.Components.TransformMatrix): Phaser.GameObjects.Components.TransformMatrix;
    /**
     * Convert a point to local space.
     * @param x - World x.
     * @param y - World y.
     * @param point - Optional output point.
     * @param camera - Optional camera.
     * @returns The local point.
     */
    getLocalPoint(x: number, y: number, point?: Phaser.Math.Vector2, camera?: Phaser.Cameras.Scene2D.Camera): Phaser.Math.Vector2;
    /**
     * Get parent rotation.
     * @returns Parent rotation in radians.
     */
    getParentRotation(): number;

    /**
     * Visibility flag.
     */
    visible: boolean;
    /**
     * Set visibility.
     * @param value - True to show.
     * @returns This instance.
     */
    setVisible(value: boolean): this;
}
