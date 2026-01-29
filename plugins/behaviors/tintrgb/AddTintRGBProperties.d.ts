export default AddTintRGBProperties;

declare namespace AddTintRGBProperties {
    /**
     * Game object with tint RGB properties.
     */
    interface TintRGBGameObject extends Phaser.GameObjects.GameObject {
        /**
         * Red tint channel.
         */
        tintR: number;
        /**
         * Green tint channel.
         */
        tintG: number;
        /**
         * Blue tint channel.
         */
        tintB: number;
        /**
         * Grayscale tint.
         */
        tintGray: number;
    }
}

/**
 * Add tint RGB properties to a game object.
 * @param gameObject - Target game object.
 * @param colorRGB - Initial RGB color.
 * @returns Game object with tint properties.
 */
declare function AddTintRGBProperties(
    gameObject: Phaser.GameObjects.GameObject,
    colorRGB?: number
): AddTintRGBProperties.TintRGBGameObject;
