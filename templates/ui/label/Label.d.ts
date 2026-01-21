// import * as Phaser from 'phaser';
import LabelBase from './Base';
import Sizer from '../sizer/Sizer';

export default Label;

declare namespace Label {

    /**
     * Alignment values for label children.
     */
    type AlignTypes = 'left' | 'top' | 'right' | 'bottom' | 'center';

    interface IConfig extends Sizer.IConfig {
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
             * Space between icon and text/action.
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
             * Space between text and action.
             */
            text?: number,

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
         * Alignment mode for children.
         */
        align?: AlignTypes,
    }

    interface IResetDisplayContentConfig extends LabelBase.IResetDisplayContentConfig {

    }
}

/**
 * Composite label with background, icon, text, and action children.
 * @remarks Supports optional masks, wrap/expand text, and per-part spacing.
 */
declare class Label extends LabelBase {
    /**
     * Create a label.
     * @param scene - The Scene to which this object belongs.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        config?: Label.IConfig
    );
}
