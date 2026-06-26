import StencilLayersBase from '../stencillayersbase/StencilLayersBase';

export default StencilLayers;

declare namespace StencilLayers {
    /**
     * Options used when creating a stencil start operation.
     */
    type IAddStencil = StencilLayersBase.IAddStencil;
    /**
     * Options used when creating a stencil reference operation.
     */
    type IRemoveStencil = StencilLayersBase.IRemoveStencil;
}

/**
 * Layer-based stencil sequence.
 *
 * Generated sections are Layers by default. Pass `useContainer: true` to
 * `addStencil()` or `removeStencil()` to create a Container section instead.
 */
declare class StencilLayers extends Phaser.GameObjects.Layer implements StencilLayersBase.IMethods {
    /**
     * Add a stencil start operation and create the section rendered after it.
     */
    addStencil(
        stencilName: string,
        layerName: string,
        config?: StencilLayers.IAddStencil
    ): this;

    /**
     * Add a stencil start operation using a single configuration object.
     */
    addStencil(
        config: StencilLayers.IAddStencil & {
            stencilName: string,
        } & (
            { layerName: string } |
            { containerName: string }
        )
    ): this;

    /**
     * Add a stencil reference operation and create the section rendered after it.
     */
    removeStencil(
        stencilName: string,
        layerName: string,
        config?: StencilLayers.IRemoveStencil
    ): this;

    /**
     * Add a stencil reference operation using a single configuration object.
     */
    removeStencil(
        config: StencilLayers.IRemoveStencil & {
            stencilName: string,
        } & (
            { layerName: string } |
            { containerName: string }
        )
    ): this;

    /**
     * Verify that all stencils have matching remove operations.
     */
    end(): this;

    /**
     * Get a generated stencil by name.
     */
    getStencil(name: string): Phaser.GameObjects.Stencil | undefined;

    /**
     * Get a generated Layer or Container section by name.
     */
    getLayer(name: string): Phaser.GameObjects.Layer | Phaser.GameObjects.Container | undefined;

    /**
     * Alias of `getLayer()` for container-oriented code.
     */
    getContainer(name: string): Phaser.GameObjects.Layer | Phaser.GameObjects.Container | undefined;
}
