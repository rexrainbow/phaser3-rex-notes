export default Snapshot;

declare namespace Snapshot {
    /**
     * Configuration options for taking a snapshot.
     */
    interface IConfig {
        /**
         * Game objects to render into the snapshot.
         */
        gameObjects: Phaser.GameObjects.GameObject[],
        /**
         * Target render texture.
         */
        renderTexture?: Phaser.GameObjects.RenderTexture,

        /**
         * Snapshot x position.
         */
        x?: number,
        /**
         * Snapshot y position.
         */
        y?: number,
        /**
         * Snapshot width.
         */
        width?: number,
        /**
         * Snapshot height.
         */
        height?: number,
        /**
         * Snapshot padding.
         */
        padding?: number,
        /**
         * Origin x value.
         */
        originX?: number,
        /**
         * Origin y value.
         */
        originY?: number,

        /**
         * Save texture key.
         */
        saveTexture?: string,
    }
}

/**
 * Render game objects into a render texture snapshot.
 *
 * @param config - Snapshot configuration.
 * @returns The render texture that contains the snapshot.
 */
declare function Snapshot(
    config: Snapshot.IConfig
): Phaser.GameObjects.RenderTexture;
