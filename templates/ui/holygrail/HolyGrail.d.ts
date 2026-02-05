// import * as Phaser from 'phaser';
import Sizer from '../sizer/Sizer';

export default HolyGrail;

declare namespace HolyGrail {

    /**
     * Horizontal alignment options.
     */
    type HAlignTypes = number | 'left' | 'center' | 'right';
    /**
     * Vertical alignment options.
     */
    type VAlignTypes = number | 'top' | 'center' | 'bottom';
    /**
     * Layout mode presets of holy-grail arrangement.
     */
    type LayoutModeTypes = 0 | 1 | 2 | 3 | 'FFF' | 'LFF' | 'FFR' | 'LFR';

    /**
     * Build configuration for holy-grail sections.
     */
    interface IBuildConfig {
        /**
         * Layout mode preset.
         */
        layoutMode?: LayoutModeTypes,

        /**
         * Optional background game object.
         */
        background?: Phaser.GameObjects.GameObject,

        /**
         * Header game object.
         */
        header?: Phaser.GameObjects.GameObject,

        /**
         * Left-side game object.
         */
        leftSide?: Phaser.GameObjects.GameObject,

        /**
         * Content game object.
         */
        content?: Phaser.GameObjects.GameObject,

        /**
         * Right-side game object.
         */
        rightSide?: Phaser.GameObjects.GameObject,

        /**
         * Footer game object.
         */
        footer?: Phaser.GameObjects.GameObject,

        proportion?: {
            header?: number,
            leftSide?: number,
            content?: number,
            rightSide?: number,
            footer?: number,
        },

        expand?: {
            header?: boolean,
            leftSide?: boolean,
            content?: boolean,
            rightSide?: boolean,
            footer?: boolean,
        },

        align?: {
            header?: HAlignTypes,
            leftSide?: VAlignTypes,
            content?: HAlignTypes | VAlignTypes,
            rightSide?: VAlignTypes,
            footer?: HAlignTypes,
        },
    }

    /**
     * Full configuration for creating a holy-grail layout.
     */
    interface IConfig extends Sizer.IConfig, IBuildConfig {
        space?: {
            left?: number,
            right?: number,
            top?: number,
            bottom?: number,

            header?: number | {
                left?: number,
                right?: number,
                top?: number,
                bottom?: number
            },
            leftSide?: number | {
                left?: number,
                right?: number,
                top?: number,
                bottom?: number
            },
            content?: {
                left?: number,
                right?: number,
                top?: number,
                bottom?: number
            },
            rightSide?: number | {
                left?: number,
                right?: number,
                top?: number,
                bottom?: number
            },
            footer?: number | {
                left?: number,
                right?: number,
                top?: number,
                bottom?: number
            },
        };
    }

}

/**
 * Composite sizer implementing a holy-grail page layout.
 */
declare class HolyGrail extends Sizer {
    /**
     * Create a holy-grail layout component.
     *
     * @param scene - Scene that owns this component.
     * @param config - Optional layout configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: HolyGrail.IConfig
    );

    /**
     * Build or rebuild layout sections.
     *
     * @param config - Optional build configuration.
     * @returns This component instance.
     */
    build(config?: HolyGrail.IBuildConfig): this;

}
