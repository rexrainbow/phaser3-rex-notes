import Label from '../../label/Label';
import Sizer from '../../sizer/Sizer';
import { GeneralCreateGameObjectCallbackType } from './GeneralCreateGameObjectCallbackType';
import CreateBackground from './CreateBackground';
import CreateText from './CreateText';

export default BuildLabelConfig;

declare namespace BuildLabelConfig {
    interface IConfig {
        /**
         * Initial x position.
         */
        x?: number,
        /**
         * Initial y position.
         */
        y?: number,
        /**
         * Initial width.
         */
        width?: number,
        /**
         * Initial height.
         */
        height?: number,
        /**
         * Layout orientation.
         */
        orientation?: Sizer.OrientationTypes,
        /**
         * True to enable right-to-left layout.
         */
        rtl?: boolean,

        /**
         * Background configuration.
         */
        background?: CreateBackground.IConfig,

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
         * Text configuration.
         */
        text?: CreateText.IConfig,
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
         * True to enforce square fitting for the action.
         */
        squareFitAction?: boolean,
        /**
         * True to enable a circular action mask.
         */
        actionMask?: boolean,
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
             * Space between text and action.
             */
            text?: number,
        },

        /**
         * Alignment for label children.
         */
        align?: Label.AlignTypes,
    }

    interface ICreators {
        /**
         * Background creator callback.
         */
        background?: GeneralCreateGameObjectCallbackType,
        /**
         * Text creator callback.
         */
        text?: GeneralCreateGameObjectCallbackType,
        /**
         * Icon creator callback.
         */
        icon?: GeneralCreateGameObjectCallbackType,
        /**
         * Action creator callback.
         */
        action?: GeneralCreateGameObjectCallbackType,
    }
}

/**
 * Build a label configuration by creating missing children.
 * @param scene - The Scene to which this object belongs.
 * @param config - Label build configuration.
 * @param creators - Game object creators for label parts.
 * @returns Label configuration for constructing a Label.
 */
declare function BuildLabelConfig(
    scene: Phaser.Scene,
    config?: BuildLabelConfig.IConfig,
    creators?: BuildLabelConfig.ICreators,
): Label.IConfig
