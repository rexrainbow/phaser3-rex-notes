// import * as Phaser from 'phaser';
import LabelBase from '../label/Base';
import Sizer from '../sizer/Sizer';

export default TitleLabel;

declare namespace TitleLabel {

    interface IConfig extends Sizer.IConfig {
        /**
         * Layout mode selection.
         */
        layoutMode?: 0 | 1,

        /**
         * Spacing configuration.
         */
        space?: {
            /**
             * Left space.
             */
            left?: number,
            /**
             * Right space.
             */
            right?: number,
            /**
             * Top space.
             */
            top?: number,
            /**
             * Bottom space.
             */
            bottom?: number,
            /**
             * Item spacing.
             */
            item?: number,

            /**
             * Inner left space.
             */
            innerLeft?: number,
            /**
             * Inner right space.
             */
            innerRight?: number,
            /**
             * Inner top space.
             */
            innerTop?: number,
            /**
             * Inner bottom space.
             */
            innerBottom?: number,

            /**
             * Title spacing.
             */
            title?: number,
            /**
             * Title left space.
             */
            titleLeft?: number,
            /**
             * Title right space.
             */
            titleRight?: number,
            /**
             * Separator spacing.
             */
            separator?: number,
            /**
             * Separator left space.
             */
            separatorLeft?: number,
            /**
             * Separator right space.
             */
            separatorRight?: number,
            /**
             * Text spacing.
             */
            text?: number,
            /**
             * Text left space.
             */
            textLeft?: number,
            /**
             * Text right space.
             */
            textRight?: number,

            /**
             * Icon spacing.
             */
            icon?: number,
            /**
             * Icon top space.
             */
            iconTop?: number,
            /**
             * Icon bottom space.
             */
            iconBottom?: number,
            /**
             * Icon left space.
             */
            iconLeft?: number,
            /**
             * Icon right space.
             */
            iconRight?: number,
            /**
             * Action top space.
             */
            actionTop?: number,
            /**
             * Action bottom space.
             */
            actionBottom?: number,
            /**
             * Action left space.
             */
            actionLeft?: number,
            /**
             * Action right space.
             */
            actionRight?: number,
        },

        /**
         * Background game object.
         */
        background?: Phaser.GameObjects.GameObject,

        /**
         * Inner background game object.
         */
        innerBackground?: Phaser.GameObjects.GameObject,

        /**
         * Title game object.
         */
        title?: Phaser.GameObjects.GameObject,
        /**
         * Wrap mode for title text.
         */
        wrapTitle?: boolean | 0 | 1 | 2 | 'none' | 'word' | 'char' | 'character',
        /**
         * True to auto-adjust title font size.
         */
        adjustTitleFontSize?: boolean,
        /**
         * True to expand title width.
         */
        expandTitleWidth?: boolean,
        /**
         * True to expand title height.
         */
        expandTitleHeight?: boolean,

        /**
         * Separator game object.
         */
        separator?: Phaser.GameObjects.GameObject,

        /**
         * Text game object.
         */
        text?: Phaser.GameObjects.GameObject,
        /**
         * Wrap mode for text.
         */
        wrapText?: boolean | 0 | 1 | 2 | 'none' | 'word' | 'char' | 'character',
        /**
         * True to auto-adjust text font size.
         */
        adjustTextFontSize?: boolean,
        /**
         * True to expand text width.
         */
        expandTextWidth?: boolean,
        /**
         * True to expand text height.
         */
        expandTextHeight?: boolean,

        /**
         * Icon game object.
         */
        icon?: Phaser.GameObjects.GameObject,
        /**
         * True to enable a circular icon mask.
         */
        iconMask?: boolean,
        /**
         * True to enforce square fitting for the icon.
         */
        squareFitIcon?: boolean,
        /**
         * Uniform icon size.
         */
        iconSize?: number,
        /**
         * Icon width override.
         */
        iconWidth?: number,
        /**
         * Icon height override.
         */
        iconHeight?: number,

        /**
         * Action game object.
         */
        action?: Phaser.GameObjects.GameObject,
        /**
         * True to enable a circular action mask.
         */
        actionMask?: boolean,
        /**
         * True to enforce square fitting for the action.
         */
        squareFitAction?: boolean,
        /**
         * Uniform action size.
         */
        actionSize?: number,
        /**
         * Action width override.
         */
        actionWidth?: number,
        /**
         * Action height override.
         */
        actionHeight?: number,

        /**
         * Alignment configuration per part.
         */
        align?: {
            /**
             * Text alignment.
             */
            text?: 'left' | 'right' | 'center' | number,
            /**
             * Title alignment.
             */
            title?: 'left' | 'right' | 'center' | number,
            /**
             * Icon alignment.
             */
            icon?: 'top' | 'bottom' | 'center' | number,
            /**
             * Action alignment.
             */
            action?: 'top' | 'bottom' | 'center' | number,
        },

        /**
         * Proportion configuration.
         */
        proportion?: {
            /**
             * Title proportion.
             */
            title?: number,
            /**
             * Separator proportion.
             */
            separator?: number,
            /**
             * Text proportion.
             */
            text?: number,
        }
    }

    interface IResetDisplayContentConfig extends LabelBase.IResetDisplayContentConfig {
        /**
         * Title text content.
         */
        title?: string,
    }
}

/**
 * Label with title and text parts plus optional icon, action, and separator.
 * @remarks Supports layout modes and wrap/expand behaviors for title and text.
 */
declare class TitleLabel extends LabelBase {
    /**
     * Create a title label.
     * @param scene - The Scene to which this object belongs.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        config?: TitleLabel.IConfig
    );

    /**
     * Current title text.
     */
    title: string;
    /**
     * Set title text.
     * @param text - Title text.
     * @returns This instance.
     */
    setTitle(text: string): this;
    /**
     * Append title text.
     * @param text - Title text to append.
     * @returns This instance.
     */
    appendTitle(text: string): this;

    /**
     * Reset display content using config or text string.
     * @param config - Text content or reset config.
     * @returns This instance.
     */
    resetDisplayContent(
        config?: string | TitleLabel.IResetDisplayContentConfig
    ): this;
}
