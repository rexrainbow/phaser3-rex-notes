export default GridCutImage;

declare namespace GridCutImage {
    /**
     * Configuration options for GridCutImage.
     */
    interface IConfig<T = Phaser.GameObjects.Image> {
        /**
         * Number of columns.
         */
        columns?: number,
        /**
         * Number of rows.
         */
        rows?: number,

        /**
         * Callback to create an image.
         *
         * @param scene - Scene instance.
         * @param key - Texture instance.
         * @param frame - Frame name.
         * @returns The created image.
         */
        createImageCallback?: (
            scene: Phaser.Scene,
            key: Phaser.Textures.Texture,
            frame: string
        ) => T,
        /**
         * Image class to instantiate.
         */
        ImageClass?: T,
        /**
         * Object pool for reusing images.
         */
        objectPool?: T[],

        /**
         * Origin X for created images.
         */
        originX?: number,
        /**
         * Origin Y for created images.
         */
        originY?: number,

        /**
         * Add created images to the scene.
         */
        add?: boolean,
        /**
         * Align created images.
         */
        align?: boolean,
    }
}

/**
 * Cut a game object into a grid with explicit dimensions.
 *
 * @param gameObject - Source game object.
 * @param columns - Number of columns.
 * @param rows - Number of rows.
 * @param config - Configuration options.
 * @returns The created image list.
 */
declare function GridCutImage<T = Phaser.GameObjects.Image>(
    gameObject: Phaser.GameObjects.GameObject,
    columns: number,
    rows: number,
    config?: GridCutImage.IConfig
): T[];

/**
 * Cut a game object into a grid using config options.
 *
 * @param gameObject - Source game object.
 * @param config - Configuration options.
 * @returns The created image list.
 */
declare function GridCutImage<T = Phaser.GameObjects.Image>(
    gameObject: Phaser.GameObjects.GameObject,
    config?: GridCutImage.IConfig
): T[];
