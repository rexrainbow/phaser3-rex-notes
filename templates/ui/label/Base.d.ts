// import * as Phaser from 'phaser';
import Sizer from '../sizer/Sizer';

export default LabelBase;

declare namespace LabelBase {
    interface IResetDisplayContentConfig {
        /**
         * Text content to apply.
         */
        text?: string,

        /**
         * Icon texture key, texture, or false to clear.
         */
        icon?: string | Phaser.Textures.Texture | boolean,
        /**
         * Icon frame name or index.
         */
        iconFrame?: string | number,
        /**
         * Icon size to apply.
         */
        iconSize?: number,

        /**
         * Action texture key, texture, or false to clear.
         */
        action?: string | Phaser.Textures.Texture | boolean,
        /**
         * Action frame name or index.
         */
        actionFrame?: string | number,
        /**
         * Action size to apply.
         */
        actionSize?: number,
    }
}

/**
 * Base label sizer that manages common parts (background, icon, text, action)
 * and their optional masks. Provides helpers to update text/texture, sizes
 * icon/action during layout, and keeps masks pinned on layout/resize.
 */
declare class LabelBase extends Sizer {
    /**
     * Current text content.
     */
    text: string;
    /**
     * Set text content.
     * @param text - Text content.
     * @returns This instance.
     */
    setText(text: string): this;
    /**
     * Append text content.
     * @param text - Text content to append.
     * @param addCR - True to add a line break before text.
     * @returns This instance.
     */
    appendText(
        text: string | number | string[],
        addCR?: boolean
    ): this;

    /**
     * Set the texture for the main image/text container.
     * @param key - Texture key or texture.
     * @param frame - Frame name or index.
     * @returns This instance.
     */
    setTexture(
        key: string | Phaser.Textures.Texture,
        frame?: string | number
    ): this;
    /**
     * Current texture for the main image.
     */
    readonly texture: Phaser.Textures.Texture | Phaser.Textures.CanvasTexture;
    /**
     * Current frame for the main image.
     */
    readonly frame: Phaser.Textures.Frame;

    /**
     * Set the icon texture.
     * @param key - Texture key or texture.
     * @param frame - Frame name or index.
     * @returns This instance.
     */
    setIconTexture(
        key: string | Phaser.Textures.Texture,
        frame?: string | number
    ): this;

    /**
     * Set the icon size.
     * @param width - Icon width.
     * @param height - Icon height.
     * @returns This instance.
     */
    setIconSize(
        width?: number,
        height?: number
    ): this;
    /**
     * Current icon width.
     */
    iconWidth: number;
    /**
     * Current icon height.
     */
    iconHeight: number;

    /**
     * Set the action texture.
     * @param key - Texture key or texture.
     * @param frame - Frame name or index.
     * @returns This instance.
     */
    setActionTexture(
        key: string | Phaser.Textures.Texture,
        frame?: string | number
    ): this;
    /**
     * Current action texture.
     */
    readonly actionTexture: Phaser.Textures.Texture | Phaser.Textures.CanvasTexture;
    /**
     * Current action frame.
     */
    readonly actionFrame: Phaser.Textures.Frame;

    /**
     * Set the action size.
     * @param width - Action width.
     * @param height - Action height.
     * @returns This instance.
     */
    setActionSize(
        width?: number,
        height?: number
    ): this;
    /**
     * Current action width.
     */
    actionWidth: number;
    /**
     * Current action height.
     */
    actionHeight: number;

    /**
     * Reset display content using a config or text string.
     * @param config - Text content or reset config.
     * @returns This instance.
     */
    resetDisplayContent(
        config?: string | LabelBase.IResetDisplayContentConfig
    ): this;

}
