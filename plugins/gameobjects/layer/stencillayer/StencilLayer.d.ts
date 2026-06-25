export default StencilLayer;

/**
 * Layer game object that masks its children with stencil game objects.
 *
 * The stencil game objects are rendered into the stencil buffer as a union mask.
 * It is WebGL-only and requires the renderer stencil buffer to be enabled.
 */
declare class StencilLayer extends Phaser.GameObjects.Layer {
    /**
     * Game objects used as stencil mask sources.
     */
    stencilGameObjects: Phaser.GameObjects.GameObject[];
    /**
     * Whether to invert the stencil mask.
     *
     * When `true`, children are visible inside the union of stencil game objects.
     * When `false`, children are visible outside the stencil game objects.
     */
    stencilInvert: boolean;

    /**
     * Add one or more game objects as stencil mask sources.
     *
     * @param gameObject - Game object, or an array of game objects, to use as stencil sources.
     * @returns This stencil layer instance.
     */
    addStencilGameObject(
        gameObject: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[]
    ): this;

    /**
     * Remove one or more game objects from the stencil mask sources.
     *
     * @param gameObject - Game object, or an array of game objects, to remove from stencil sources.
     * @returns This stencil layer instance.
     */
    removeStencilGameObject(
        gameObject: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[]
    ): this;

    /**
     * Remove all stencil mask sources.
     *
     * @returns This stencil layer instance.
     */
    clearStencilGameObjects(): this;

    /**
     * Set whether the stencil mask is inverted.
     *
     * If omitted, `enable` defaults to `true`.
     *
     * @param enable - `true` to show children inside the stencil union, `false` to show them outside.
     * @returns This stencil layer instance.
     */
    setStencilInvert(enable?: boolean): this;

}
