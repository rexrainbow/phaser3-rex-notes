import StencilLayersBase from '../stencillayersbase/StencilLayersBase';

export default StencilContainers;

declare namespace StencilContainers {
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
 * Container-based stencil sequence.
 *
 * Generated sections are Containers by default. Layer sections are not allowed
 * because Phaser Containers cannot contain Layer children.
 */
declare class StencilContainers extends Phaser.GameObjects.Container implements StencilLayersBase.IMethods {
    /**
     * Add a stencil start operation and create the section rendered after it.
     */
    addStencil(
        stencilName: string,
        layerName: string,
        config?: StencilContainers.IAddStencil
    ): this;

    /**
     * Add a stencil start operation using a single configuration object.
     */
    addStencil(
        config: StencilContainers.IAddStencil & {
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
        config?: StencilContainers.IRemoveStencil
    ): this;

    /**
     * Add a stencil reference operation using a single configuration object.
     */
    removeStencil(
        config: StencilContainers.IRemoveStencil & {
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
     * Get a generated Container section by name.
     */
    getLayer(name: string): Phaser.GameObjects.Layer | Phaser.GameObjects.Container | undefined;

    /**
     * Alias of `getLayer()` for container-oriented code.
     */
    getContainer(name: string): Phaser.GameObjects.Layer | Phaser.GameObjects.Container | undefined;
}
