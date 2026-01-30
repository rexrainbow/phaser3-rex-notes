import GenerateFrames from './generateframes/GenerateFrames';

export default CreatePieces;

declare namespace CreatePieces {
    /**
     * Draw callback used to render a piece shape.
     */
    type DrawShapeCallbackType = GenerateFrames.DrawShapeCallbackType;

    /**
     * Configuration options for CreatePieces.
     */
    interface IConfig<T = Phaser.GameObjects.Image> {
        /**
         * Texture key for generated pieces.
         */
        piecesKey?: string,
        /**
         * Number of columns.
         */
        columns: number,
        /**
         * Number of rows.
         */
        rows: number,
        /**
         * Edge width.
         */
        edgeWidth?: number,
        /**
         * Edge height.
         */
        edgeHeight?: number,

        /**
         * Shape draw callback.
         */
        drawShapeCallback?: DrawShapeCallbackType,
        /**
         * Edge definitions or callbacks.
         */
        edges?: GenerateFrames.EdgesType | GenerateFrames.GetEdgeCallbacksType,
        /**
         * Use dynamic texture.
         */
        useDynamicTexture?: boolean,

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
 * Create jigsaw pieces from a game object.
 *
 * @param gameObject - Source game object.
 * @param config - Configuration options.
 * @returns The created piece list.
 */
declare function CreatePieces<T = Phaser.GameObjects.Image>(
    gameObject: Phaser.GameObjects.GameObject,
    config: CreatePieces.IConfig
): T[];
