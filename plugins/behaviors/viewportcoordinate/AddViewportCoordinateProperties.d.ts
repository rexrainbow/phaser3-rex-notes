export default AddViewportCoordinateProperties;

declare namespace AddViewportCoordinateProperties {
    /**
     * Game object with viewport coordinate properties.
     */
    interface PolarCoordinateGameObject extends Phaser.GameObjects.GameObject {
        /**
         * Viewport rectangle.
         */
        vp: Phaser.Geom.Rectangle;
        /**
         * Viewport x ratio.
         */
        vpx: number;
        /**
         * Viewport y ratio.
         */
        vpy: number;
        /**
         * Viewport x offset.
         */
        vpxOffset: number;
        /**
         * Viewport y offset.
         */
        vpyOffset: number;
    }

    /**
     * Transform callback without offsets.
     */
    type TransformCallbackType0 =
        (
            /**
             * Viewport x ratio.
             */
            vpx: number,
            /**
             * Viewport y ratio.
             */
            vpy: number,
            /**
             * Viewport rectangle.
             */
            viewport: Phaser.Geom.Rectangle,
            /**
             * Target game object.
             */
            gameObject: Phaser.GameObjects.GameObject,
        ) => void;

    /**
     * Transform callback with offsets.
     */
    type TransformCallbackType1 =
        (
            /**
             * Viewport x ratio.
             */
            vpx: number,
            /**
             * Viewport y ratio.
             */
            vpy: number,
            /**
             * Viewport x offset.
             */
            vpxOffset: number,
            /**
             * Viewport y offset.
             */
            vpyOffset: number,
            /**
             * Viewport rectangle.
             */
            viewport: Phaser.Geom.Rectangle,
            /**
             * Target game object.
             */
            gameObject: Phaser.GameObjects.GameObject,
        ) => void;

    /**
     * Transform callback type.
     */
    type TransformCallbackType = TransformCallbackType0 | TransformCallbackType1;
}

/**
 * Add viewport coordinate properties to a game object.
 * @param gameObject - Target game object.
 * @param viewport - Viewport rectangle.
 * @param vpx - Viewport x ratio.
 * @param vpy - Viewport y ratio.
 * @param vpxOffset - Viewport x offset.
 * @param vpyOffset - Viewport y offset.
 * @param transformCallback - Transform callback.
 * @returns Game object with viewport coordinate properties.
 */
declare function AddViewportCoordinateProperties(
    gameObject: Phaser.GameObjects.GameObject,
    viewport?: Phaser.Geom.Rectangle,
    vpx?: number,
    vpy?: number,
    vpxOffset?: number,
    vpyOffset?: number,
    transformCallback?: AddViewportCoordinateProperties.TransformCallbackType
): AddViewportCoordinateProperties.PolarCoordinateGameObject;

/**
 * Add viewport coordinate properties to a game object.
 * @param gameObject - Target game object.
 * @param viewport - Viewport rectangle.
 * @param vpx - Viewport x ratio.
 * @param vpy - Viewport y ratio.
 * @param transformCallback - Transform callback.
 * @returns Game object with viewport coordinate properties.
 */
declare function AddViewportCoordinateProperties(
    gameObject: Phaser.GameObjects.GameObject,
    viewport?: Phaser.Geom.Rectangle,
    vpx?: number,
    vpy?: number,
    transformCallback?: AddViewportCoordinateProperties.TransformCallbackType
): AddViewportCoordinateProperties.PolarCoordinateGameObject;

/**
 * Add viewport coordinate properties to a game object.
 * @param gameObject - Target game object.
 * @param viewport - Viewport rectangle.
 * @param transformCallback - Transform callback.
 * @returns Game object with viewport coordinate properties.
 */
declare function AddViewportCoordinateProperties(
    gameObject: Phaser.GameObjects.GameObject,
    viewport?: Phaser.Geom.Rectangle,
    transformCallback?: AddViewportCoordinateProperties.TransformCallbackType
): AddViewportCoordinateProperties.PolarCoordinateGameObject;
