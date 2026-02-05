import LineProgressCanvas from '../lineprogresscanvas/LineProgressCanvas';
import CircularProgressCanvas from '../circularprogresscanvas/CircularProgressCanvas';

// import * as Phaser from 'phaser';
import Sizer from '../sizer/Sizer';

export default NameValueLabel;

declare namespace NameValueLabel {

    /**
     * Line progress canvas configuration.
     */
    interface ILineProgressCanvasConfig extends LineProgressCanvas.IConfig {
        /**
         * Fixed shape discriminator.
         */
        shape?: 'line',
    }

    /**
     * Circular progress canvas configuration.
     */
    interface ICircularProgressCanvasConfig extends CircularProgressCanvas.IConfig {
        /**
         * Fixed shape discriminator.
         */
        shape: 'circle',
    }

    /**
     * Callback used to format value text.
     */
    type ValueTextFormatCallbackType = (
        /**
         * Current value.
         */
        value: number,
        /**
         * Minimum value.
         */
        min: number,
        /**
         * Maximum value.
         */
        max: number
    ) => string | null;

    /**
     * Configuration options for creating a name-value label.
     */
    interface IConfig extends Sizer.IConfig {
        space?: {
            left?: number,
            right?: number,
            top?: number,
            bottom?: number,

            icon?: number,
            iconTop?: number,
            iconBottom?: number,
            iconLeft?: number,
            iconRight?: number,

            name?: number,
            value?: number,

            bar?: number,
            batTop?: number,
            barBottom?: number,
            barLeft?: number,
            barRight?: number,

            action?: number,
            actionTop?: number,
            actionBottom?: number,
            actionLeft?: number,
            actionRight?: number,
        },

        /**
         * Optional background game object.
         */
        background?: Phaser.GameObjects.GameObject,

        /**
         * Optional icon game object.
         */
        icon?: Phaser.GameObjects.GameObject,
        /**
         * Set to true to mask icon.
         */
        iconMask?: boolean,

        /**
         * Optional name text game object.
         */
        nameText?: Phaser.GameObjects.GameObject,

        /**
         * Optional value text game object.
         */
        valueText?: Phaser.GameObjects.GameObject,

        /**
         * Progress bar shape type.
         */
        barShape?: 'line' | 'circle',
        /**
         * Progress bar game object or bar configuration.
         */
        bar?: Phaser.GameObjects.GameObject | LineProgressCanvas.IConfig | CircularProgressCanvas.IConfig,

        /**
         * Optional action game object.
         */
        action?: Phaser.GameObjects.GameObject,
        /**
         * Set to true to mask action object.
         */
        actionMask?: boolean,

        /**
         * Callback used to format value text.
         */
        valueTextFormatCallback?: ValueTextFormatCallbackType,

        align?: {
            text?: 'left' | 'right' | 'center' | number,
            title?: 'left' | 'right' | 'center' | number,
        },

        proportion?: {
            title?: number,
            separator?: number,
            text?: number,
        },
    }
}

/**
 * UI label that displays name text, value text, and optional progress bar.
 */
declare class NameValueLabel extends Sizer {
    /**
     * Create a name-value label.
     *
     * @param scene - Scene that owns this component.
     * @param config - Optional component configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: NameValueLabel.IConfig
    );

    /**
     * Current name text.
     */
    nameText: string;
    /**
     * Set name text.
     *
     * @param value - Name text value.
     * @returns This component instance.
     */
    setNameText(value?: string): this;

    /**
     * Current value text.
     */
    valueText: string;
    /**
     * Set value text.
     *
     * @param value - Value text string.
     * @returns This component instance.
     */
    setValueText(value?: string): this;

    /**
     * Current normalized bar value.
     */
    barValue: number;
    /**
     * Set bar value.
     *
     * @param value - Value to set.
     * @param min - Optional minimum range.
     * @param max - Optional maximum range.
     * @returns This component instance.
     */
    setBarValue(
        value: number,
        min?: number,
        max?: number
    ): this;
    /**
     * Ease bar value to target.
     *
     * @param value - Target value.
     * @param min - Optional minimum range.
     * @param max - Optional maximum range.
     * @returns This component instance.
     */
    easeBarValueTo(
        value: number,
        min?: number,
        max?: number
    ): this;

    /**
     * Set texture on icon/action target.
     *
     * @param key - Texture key or texture object.
     * @param frame - Optional frame name or index.
     * @returns This component instance.
     */
    setTexture(
        key: string | Phaser.Textures.Texture,
        frame?: string | number
    ): this;
    /**
     * Current texture.
     */
    readonly texture: Phaser.Textures.Texture | Phaser.Textures.CanvasTexture;
    /**
     * Current frame.
     */
    readonly frame: Phaser.Textures.Frame;

    /**
     * Set value and optional range.
     *
     * @param value - Value to set.
     * @param min - Optional minimum range.
     * @param max - Optional maximum range.
     * @returns This component instance.
     */
    setValue(
        value: number,
        min?: number,
        max?: number
    ): this;
    /**
     * Current value.
     */
    value: number;
    /**
     * Current minimum range value.
     */
    minValue: number;
    /**
     * Current maximum range value.
     */
    maxValue: number;

    /**
     * Set easing duration for value transitions.
     *
     * @param duration - Duration in milliseconds.
     * @returns This component instance.
     */
    setEaseValueDuration(duration: number): this;

    /**
     * Ease value to target and optional range.
     *
     * @param value - Target value.
     * @param min - Optional minimum range.
     * @param max - Optional maximum range.
     * @returns This component instance.
     */
    easeValueTo(
        value: number,
        min?: number,
        max?: number
    ): this;

}
