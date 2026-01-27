export default Open;

declare namespace Open {

    /**
     * File chooser configuration.
     */
    interface IConfig {
        /**
         * Accept attribute string.
         */
        accept?: string,
        /**
         * True to allow multiple files.
         */
        multiple?: boolean
        /**
         * Close delay in ms.
         */
        closeDelay?: number
    }

    /**
     * File chooser result.
     */
    interface IResult {
        /**
         * Selected files.
         */
        files: File[]
    }
}

/**
 * Open a file chooser.
 * @param game - Game, scene, or game object.
 * @param config - File chooser configuration.
 * @returns Promise resolved with selection result.
 */
declare function Open(
    game: Phaser.Game | Phaser.Scene | Phaser.GameObjects.GameObject,
    config?: Open.IConfig
): Promise<Open.IResult>;
