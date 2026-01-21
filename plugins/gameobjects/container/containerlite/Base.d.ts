export default Base;

/**
 * Lightweight container base built on a Zone.
 * @remarks Provides container-like helpers on top of a Zone.
 */
declare class Base extends Phaser.GameObjects.Zone {
    /**
     * Create a base container zone.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position of the zone.
     * @param y - The y position of the zone.
     * @param width - The width of the zone.
     * @param height - The height of the zone.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        width?: number, height?: number,
    );

    /**
     * Check if a child is part of this container.
     * @param gameObject - The child to check.
     * @returns True if the child belongs to this container.
     */
    contains(
        gameObject: Phaser.GameObjects.GameObject
    ): boolean;

    /**
     * Add one or more children.
     * @param child - A child or array of children to add.
     * @returns This instance.
     */
    add(
        child: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[]
    ): this;

    /**
     * Remove a child, optionally destroying it.
     * @param gameObject - The child to remove.
     * @param destroyChild - True to destroy the child.
     * @returns This instance.
     */
    remove(
        gameObject: Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    /**
     * Remove all children, optionally destroying them.
     * @param destroyChild - True to destroy the removed children.
     * @returns This instance.
     */
    clear(
        destroyChild?: boolean
    ): this;


    /**
     * Reset alpha on all corners.
     * @returns This instance.
     */
    clearAlpha(): this;
    /**
     * Set alpha values for each corner.
     * @param topLeft - Alpha for the top-left corner.
     * @param topRight - Alpha for the top-right corner.
     * @param bottomLeft - Alpha for the bottom-left corner.
     * @param bottomRight - Alpha for the bottom-right corner.
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
     * Toggle horizontal flip state.
     * @returns This instance.
     */
    toggleFlipX(): this;
    /**
     * Toggle vertical flip state.
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
}
