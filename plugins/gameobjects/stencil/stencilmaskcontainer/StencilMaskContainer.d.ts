export default StencilMaskContainer;

declare namespace StencilMaskContainer {
    interface IConfig {
        /**
         * Render mask game objects in the container local coordinate space.
         *
         * When `false`, mask game objects use world coordinates.
         */
        local?: boolean,
    }
}

/**
 * Container game object that masks its children with stencil mask game objects.
 *
 * Mask sources are not added to the container children list. When `local` is
 * `true`, they are rendered with the container transform during stencil setup.
 */
declare class StencilMaskContainer extends Phaser.GameObjects.Container {
    /**
     * Game objects used as stencil mask sources.
     */
    maskGameObjects: Phaser.GameObjects.GameObject[];
    /**
     * Whether mask game objects use container-local coordinates.
     */
    maskLocal: boolean;
    /**
     * Whether to invert the stencil mask.
     *
     * When `true`, children are visible inside the union of stencil mask sources.
     * When `false`, children are visible outside the stencil mask sources.
     */
    stencilInvert: boolean;

    addMaskGameObject(
        gameObject: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[]
    ): this;

    removeMaskGameObject(
        gameObject: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[]
    ): this;

    clearMaskGameObjects(): this;

    setStencilInvert(enable?: boolean): this;
}
