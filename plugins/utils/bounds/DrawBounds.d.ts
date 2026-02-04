export default DrawBounds;

declare namespace DrawBounds {
    /**
     * Configuration options for drawing bounds.
     */
    interface IConfig {
        /**
         * Stroke color.
         */
        color?: number,
        /**
         * Stroke line width.
         */
        lineWidth?: number,

        /**
         * Fill color.
         */
        fillColor?: number,
        /**
         * Fill alpha.
         */
        fillAlpha?: number,

        /**
         * Padding around bounds.
         */
        padding?: number,

    }
}

/**
 * Draw bounds of game objects to a graphics object.
 *
 * @param gameObjects - Target game object or list.
 * @param graphics - Graphics to draw on.
 * @param config - Stroke color or draw configuration.
 */
declare function DrawBounds(
    gameObjects: Phaser.GameObjects.GameObject[] | Phaser.GameObjects.GameObject,
    graphics: Phaser.GameObjects.Graphics,
    config?: number | DrawBounds.IConfig
): void;
