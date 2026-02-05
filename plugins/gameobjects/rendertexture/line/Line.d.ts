export default Line;

declare namespace Line {

    /**
     * Extend mode of the line body texture.
     */
    type ExtendModeTyp = 0 | 1 | 'scale' | 'repeat';

    /**
     * Configuration options for creating a textured line object.
     */
    interface IConfig {
        start?: {
            /**
             * Start point x position.
             */
            x?: number,
            /**
             * Start point y position.
             */
            y?: number,
            /**
             * Texture key of start cap.
             */
            key?: string,
            /**
             * Frame name of start cap.
             */
            frame?: string,
            /**
             * Origin value of start cap.
             */
            origin?: number
        } |
        /**
         * Texture key of start cap.
         */
        string,

        end?: {
            /**
             * End point x position.
             */
            x?: number,
            /**
             * End point y position.
             */
            y?: number,
            /**
             * Texture key of end cap.
             */
            key?: string,
            /**
             * Frame name of end cap.
             */
            frame?: string,
            /**
             * Origin value of end cap.
             */
            origin?: number
        } |
        /**
         * Texture key of end cap.
         */
        string,

        body?: {
            /**
             * Texture key of line body.
             */
            key?: string,
            /**
             * Frame name of line body.
             */
            frame?: string,
            /**
             * Extend mode of line body.
             */
            extendMode?: ExtendModeTyp,
            /**
             * Body width.
             */
            width?: number,
        } |
        /**
         * Texture key of line body.
         */
        string,
    }
}

/**
 * RenderTexture-based line object with start/end caps and repeatable body.
 */
declare class Line extends Phaser.GameObjects.RenderTexture {
    /**
     * Create a textured line object.
     *
     * @param scene - Scene that owns this game object.
     * @param config - Optional line configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: Line.IConfig
    );

    /**
     * Set line start point position.
     *
     * @param x - Start point x position.
     * @param y - Start point y position.
     * @returns This game object.
     */
    setLineStartPosition(
        x?: number,
        y?: number
    ): this;
    /**
     * Start point x position.
     */
    x0: number;
    /**
     * Start point y position.
     */
    y0: number;

    /**
     * Set line end point position.
     *
     * @param x - End point x position.
     * @param y - End point y position.
     * @returns This game object.
     */
    setLineEndPosition(
        x?: number,
        y?: number
    ): this;
    /**
     * End point x position.
     */
    x1: number;
    /**
     * End point y position.
     */
    y1: number;

    /**
     * Set start cap texture.
     *
     * @param key - Texture key.
     * @param frameName - Frame name.
     * @returns This game object.
     */
    setLineStartTexture(
        key?: string,
        frameName?: string
    ): this;
    /**
     * Set end cap texture.
     *
     * @param key - Texture key.
     * @param frameName - Frame name.
     * @returns This game object.
     */
    setLineEndTexture(
        key?: string,
        frameName?: string
    ): this;
    /**
     * Set line body texture.
     *
     * @param key - Texture key.
     * @param frameName - Frame name.
     * @returns This game object.
     */
    setLineBodyTexture(
        key?: string,
        frameName?: string
    ): this;

    /**
     * Set origin of start cap.
     *
     * @param origin - Origin value.
     * @returns This game object.
     */
    setLineStartOrigin(origin: number): this;
    /**
     * Set origin of end cap.
     *
     * @param origin - Origin value.
     * @returns This game object.
     */
    setLineEndOrigin(origin: number): this;
    /**
     * Set extend mode of line body.
     *
     * @param mode - Extend mode value.
     * @returns This game object.
     */
    setLineBodyExtendMode(mode: Line.ExtendModeTyp): this;
    /**
     * Set width of line body.
     *
     * @param width - Body width.
     * @returns Updated return value from implementation.
     */
    setLineBodyWidth(width: number);

}
