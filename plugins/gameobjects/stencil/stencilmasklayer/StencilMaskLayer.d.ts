export default StencilMaskLayer;

/**
 * Layer game object that masks its children with mask game objects.
 *
 * The mask game objects are rendered into the stencil buffer as a union mask.
 * It is WebGL-only and requires the renderer stencil buffer to be enabled.
 */
declare class StencilMaskLayer extends Phaser.GameObjects.Layer {
    /**
     * Game objects used as stencil mask sources.
     */
    maskGameObjects: Phaser.GameObjects.GameObject[];
    /**
     * Whether to invert the stencil mask.
     *
     * When `true`, children are visible inside the union of stencil game objects.
     * When `false`, children are visible outside the stencil game objects.
     */
    stencilInvert: boolean;

    /**
     * Add one or more game objects as mask sources.
     *
     * @param gameObject - Game object, or an array of game objects, to use as mask sources.
     * @returns This stencil mask layer instance.
     */
    addMaskGameObject(
        gameObject: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[]
    ): this;

    /**
     * Remove one or more game objects from the mask sources.
     *
     * @param gameObject - Game object, or an array of game objects, to remove from mask sources.
     * @returns This stencil mask layer instance.
     */
    removeMaskGameObject(
        gameObject: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[]
    ): this;

    /**
     * Remove all mask sources.
     *
     * @returns This stencil mask layer instance.
     */
    clearMaskGameObjects(): this;

    /**
     * Set whether the stencil mask is inverted.
     *
     * If omitted, `enable` defaults to `true`.
     *
     * @param enable - `true` to show children inside the stencil union, `false` to show them outside.
     * @returns This stencil mask layer instance.
     */
    setStencilInvert(enable?: boolean): this;

}
