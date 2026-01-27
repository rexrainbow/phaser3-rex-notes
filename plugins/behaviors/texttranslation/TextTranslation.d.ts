import ComponentBase from '../../utils/componentbase/ComponentBase';
import i18next from 'i18next';

export default TextTranslation;

declare namespace TextTranslation {
    /**
     * Callback to apply translated text.
     */
    type SetTextCallbackType = (
        /**
         * Target game object.
         */
        gameObject: Phaser.GameObjects.GameObject,
        /**
         * Translated text.
         */
        text: string
    ) => void;

    /**
     * Interpolation values.
     */
    type InterpolationsType = { [name: string]: any };

    /**
     * TextTranslation configuration.
     */
    interface IConfig {
        /**
         * Translation key.
         */
        translationKey?: string,
        /**
         * Interpolation values.
         */
        interpolation?: InterpolationsType,
        /**
         * True to update text immediately.
         */
        updateText?: boolean,
        /**
         * Custom text setter.
         */
        setText?: SetTextCallbackType,
    }
}

/**
 * Text translation behavior using i18next.
 */
declare class TextTranslation extends ComponentBase {
    /**
     * Set the i18next instance used for translation.
     * @param obj - i18next instance.
     */
    static setI18Next(obj: typeof i18next): void;

    /**
     * Create a TextTranslation behavior.
     * @param gameObject - Target game object.
     * @param config - TextTranslation configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: TextTranslation.IConfig
    );

    /**
     * Set interpolation values.
     * @param interpolation - Interpolation values.
     * @returns This instance.
     */
    setInterpolation(interpolation: TextTranslation.InterpolationsType): this;
    /**
     * Update a single interpolation value.
     * @param key - Interpolation key.
     * @param value - Interpolation value.
     * @returns This instance.
     */
    updateInterpolation(key: string, value: any): this;
    /**
     * Update interpolation values.
     * @param interpolation - Interpolation values.
     * @returns This instance.
     */
    updateInterpolation(interpolation: TextTranslation.InterpolationsType): this;
    /**
     * Interpolation values.
     */
    interpolation: TextTranslation.InterpolationsType;

    /**
     * Set translation key.
     * @param key - Translation key.
     * @returns This instance.
     */
    setTranslationKey(key: string): this;
    /**
     * Translation key.
     */
    translationKey: string;

    /**
     * Update text using current translation key and interpolation.
     * @returns This instance.
     */
    updateText(): this;
}
