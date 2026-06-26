export default StencilLayersBase;

declare namespace StencilLayersBase {
    /**
     * Alpha strategy used by Phaser stencil rendering.
     */
    type AlphaStrategy = Phaser.Types.Renderer.WebGL.AlphaStrategy;

    /**
     * Options used when creating a stencil start operation.
     *
     * `stencilLayerMode` is managed internally and is always forced to `addLayer`.
     */
    interface IAddStencil {
        /**
         * Unique stencil name.
         *
         * Required when this object is passed as the only `addStencil()` argument.
         */
        stencilName?: string,
        /**
         * Name of the section created after this stencil.
         */
        layerName?: string,
        /**
         * Name of the section created after this stencil.
         *
         * This is only a naming alias. It does not force the section to be a Container.
         */
        containerName?: string,
        /**
         * Create a Container section when `true`, or a Layer section when `false`.
         *
         * If omitted, the concrete class default is used.
         */
        useContainer?: boolean,
        /**
         * Alpha strategy used while rendering stencil source children.
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
         * For normal mask behavior, where later content is visible inside the
         * stencil source shape, set this to `true`.
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
     * Options used when creating a stencil reference that removes a stencil.
     *
     * `stencilLayerMode` and `stencilInvert` are managed internally so the
     * reference remains paired with its source stencil.
     */
    interface IRemoveStencil {
        /**
         * Existing open stencil name to remove.
         *
         * Required when this object is passed as the only `removeStencil()` argument.
         */
        stencilName?: string,
        /**
         * Name of the section created after this stencil reference.
         */
        layerName?: string,
        /**
         * Name of the section created after this stencil reference.
         *
         * This is only a naming alias. It does not force the section to be a Container.
         */
        containerName?: string,
        /**
         * Create a Container section when `true`, or a Layer section when `false`.
         *
         * If omitted, the concrete class default is used.
         */
        useContainer?: boolean,
        /**
         * Alpha strategy used while rendering stencil source children.
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

    /**
     * Shared methods mixed into the concrete stencil sequence classes.
     */
    interface IMethods {
        /**
         * Add a stencil start operation and create the section rendered after it.
         *
         * @param stencilName - Unique stencil name.
         * @param layerName - Unique section name.
         * @param config - Stencil options.
         * @returns This instance.
         */
        addStencil(
            stencilName: string,
            layerName: string,
            config?: IAddStencil
        ): this;

        /**
         * Add a stencil start operation using a single configuration object.
         *
         * `stencilName`, `layerName`, `containerName`, and `useContainer` are
         * consumed by the sequence object and are not passed to Phaser stencil options.
         *
         * @param config - Stencil options with required names.
         * @returns This instance.
         */
        addStencil(
            config: IAddStencil & {
                stencilName: string,
            } & (
                { layerName: string } |
                { containerName: string }
            )
        ): this;

        /**
         * Add a stencil reference operation that removes an open stencil and
         * create the section rendered after it.
         *
         * @param stencilName - Existing open stencil name.
         * @param layerName - Unique section name.
         * @param config - Stencil reference options.
         * @returns This instance.
         */
        removeStencil(
            stencilName: string,
            layerName: string,
            config?: IRemoveStencil
        ): this;

        /**
         * Add a stencil reference operation using a single configuration object.
         *
         * `stencilName`, `layerName`, `containerName`, and `useContainer` are
         * consumed by the sequence object and are not passed to Phaser reference options.
         *
         * @param config - Reference options with required names.
         * @returns This instance.
         */
        removeStencil(
            config: IRemoveStencil & {
                stencilName: string,
            } & (
                { layerName: string } |
                { containerName: string }
            )
        ): this;

        /**
         * Verify that every added stencil has been removed.
         *
         * @returns This instance.
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
         * Get a generated section by name.
         *
         * The returned object can be a Layer or Container depending on
         * `useContainer` and the concrete class default.
         *
         * @param name - Section name.
         * @returns The generated Layer or Container, or `undefined` if not found.
         */
        getLayer(name: string): Phaser.GameObjects.Layer | Phaser.GameObjects.Container | undefined;

        /**
         * Get a generated section by name.
         *
         * Alias of `getLayer()` for container-oriented code. It does not validate
         * that the stored object is actually a Container.
         *
         * @param name - Section name.
         * @returns The generated Layer or Container, or `undefined` if not found.
         */
        getContainer(name: string): Phaser.GameObjects.Layer | Phaser.GameObjects.Container | undefined;
    }
}

/**
 * Create a base class that manages ordered Stencil, section, and
 * StencilReference game objects.
 *
 * @param GOClass - Phaser Game Object class to extend.
 * @param defaultUseContainer - Default section type. `true` creates Containers, `false` creates Layers.
 * @param canAddLayer - Whether generated Layer sections are allowed.
 * @returns A class extending `GOClass` with stencil sequence methods.
 */
declare function StencilLayersBase(
    GOClass: any,
    defaultUseContainer: boolean,
    canAddLayer?: boolean
): any;
