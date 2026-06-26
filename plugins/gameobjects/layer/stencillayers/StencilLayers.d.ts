export default StencilLayers;

declare namespace StencilLayers {
    type AlphaStrategy = Phaser.Types.Renderer.WebGL.AlphaStrategy;

    /**
     * Stencil options used when creating a new stencil.
     *
     * `stencilLayerMode` is managed internally and is always forced to `addLayer`.
     */
    interface IAddStencil {
        /**
         * Alpha strategy used while rendering stencil children.
         */
        stencilAlphaStrategy?: AlphaStrategy,
        /**
         * Value used by Phaser stencil clear modes.
         */
        stencilClearValue?: number,
        /**
         * Whether to composite stencil children to a framebuffer.
         */
        stencilCompositeCheck?: boolean | 'auto',
        /**
         * Whether to invert the stencil.
         *
         * For normal mask behavior, where children are visible inside the stencil shape,
         * set this to `true`.
         */
        stencilInvert?: boolean,
        /**
         * Managed internally. Do not set.
         */
        stencilLayerMode?: never,
        /**
         * Whether stencil buffer values wrap on overflow or underflow.
         */
        stencilValueWrap?: boolean,
    }

    /**
     * Options used when creating the stencil reference that removes a stencil.
     *
     * `stencilLayerMode` and `stencilInvert` are managed internally so the
     * reference stays paired with its source stencil.
     */
    interface IRemoveStencil {
        /**
         * Alpha strategy used while rendering stencil children.
         */
        stencilAlphaStrategy?: AlphaStrategy,
        /**
         * Value used by Phaser stencil clear modes.
         */
        stencilClearValue?: number,
        /**
         * Whether to composite stencil children to a framebuffer.
         */
        stencilCompositeCheck?: boolean | 'auto',
        /**
         * Managed internally. Do not set.
         */
        stencilInvert?: never,
        /**
         * Managed internally. Do not set.
         */
        stencilLayerMode?: never,
        /**
         * Whether stencil buffer values wrap on overflow or underflow.
         */
        stencilValueWrap?: boolean,
    }
}

/**
 * Layer that builds an ordered sequence of Stencil, Layer, and StencilReference
 * game objects.
 *
 * Use `addStencil()` to start a stencil section and create the following layer.
 * Use `removeStencil()` to insert the matching StencilReference and create the
 * following layer. Call `end()` to verify that all stencils were removed.
 */
declare class StencilLayers extends Phaser.GameObjects.Layer {
    /**
     * Add a stencil operation and create the layer rendered after it.
     *
     * @param stencilName - Unique stencil name.
     * @param layerName - Unique layer name for the layer created after this stencil.
     * @param config - Stencil options. `stencilLayerMode` is not allowed.
     * @returns This stencil layers instance.
     */
    addStencil(
        stencilName: string,
        layerName: string,
        config?: StencilLayers.IAddStencil
    ): this;

    /**
     * Add a stencil reference operation that removes a previously added stencil,
     * then create the layer rendered after the reference.
     *
     * @param stencilName - Existing open stencil name to remove.
     * @param layerName - Unique layer name for the layer created after this reference.
     * @param config - Reference options. `stencilLayerMode` and `stencilInvert` are not allowed.
     * @returns This stencil layers instance.
     */
    removeStencil(
        stencilName: string,
        layerName: string,
        config?: StencilLayers.IRemoveStencil
    ): this;

    /**
     * Verify that all stencils added by `addStencil()` have been removed.
     *
     * @returns This stencil layers instance.
     */
    end(): this;

    /**
     * Get a generated stencil by name.
     *
     * Add stencil source children to the returned object.
     *
     * @param name - Stencil name.
     * @returns The generated stencil, or `undefined` if not found.
     */
    getStencil(name: string): Phaser.GameObjects.Stencil | undefined;

    /**
     * Get a generated layer by name.
     *
     * Add display children to the returned layer.
     *
     * @param name - Layer name.
     * @returns The generated layer, or `undefined` if not found.
     */
    getLayer(name: string): Phaser.GameObjects.Layer | undefined;
}
