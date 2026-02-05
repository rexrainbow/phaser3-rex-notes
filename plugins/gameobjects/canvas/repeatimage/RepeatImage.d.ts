import Canvas from '../canvas/Canvas';

export default RepeatImage;

declare namespace RepeatImage {
}

/**
 * Canvas image object that renders texture as repeatable pattern.
 */
declare class RepeatImage extends Canvas {
    /**
     * Create a repeat image object.
     *
     * @param scene - Scene that owns this game object.
     * @param x - Initial x position.
     * @param y - Initial y position.
     * @param width - Initial width.
     * @param height - Initial height.
     * @param key - Source texture key.
     * @param frame - Source frame key.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        width?: number,
        height?: number,
        key?: string,
        frame?: string
    );

    /**
     * Set source texture and frame.
     *
     * @param key - Source texture key.
     * @param frame - Source frame key.
     * @returns This game object.
     */
    setTexture(
        key?: string,
        frame?: string
    ): this;

    /**
     * Set source frame.
     *
     * @param frame - Source frame key.
     * @returns This game object.
     */
    setFrame(
        frame: string
    ): this;

    /**
     * Set tile pattern position offset.
     *
     * @param x - Horizontal tile offset.
     * @param y - Vertical tile offset.
     * @returns This game object.
     */
    setTilePosition(
        x: number,
        y: number
    ): this;
    /**
     * Horizontal tile offset.
     */
    tilePositionX: number;
    /**
     * Vertical tile offset.
     */
    tilePositionY: number;

    /**
     * Set tile pattern scale.
     *
     * @param x - Horizontal tile scale.
     * @param y - Vertical tile scale.
     * @returns This game object.
     */
    setTileScale(
        x: number,
        y: number
    ): this;
    /**
     * Horizontal tile scale.
     */
    tileScaleX: number;
    /**
     * Vertical tile scale.
     */
    tileScaleY: number;

}
