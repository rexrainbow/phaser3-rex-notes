// import * as Phaser from 'phaser';
import Scrollable from '../utils/scrollable/Scrollable';


export default ScrollablePanel;

declare namespace ScrollablePanel {

    type MaskConfig = {
        /**
         * Mask padding.
         */
        padding?: number | {
            /**
             * Left padding.
             */
            left?: number,
            /**
             * Right padding.
             */
            right?: number,
            /**
             * Top padding.
             */
            top?: number,
            /**
             * Bottom padding.
             */
            bottom?: number,
        },
        /**
         * Mask update mode.
         */
        updateMode?: 0 | 1 | 'update' | 'everyTick'
    }

    interface IConfig extends Scrollable.IConfig {
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
             * Panel padding or spacing.
             */
            panel?: number | {
                /**
                 * Left panel padding.
                 */
                left?: number,
                /**
                 * Right panel padding.
                 */
                right?: number,
                /**
                 * Top panel padding.
                 */
                top?: number,
                /**
                 * Bottom panel padding.
                 */
                bottom?: number,
            },

            /**
             * Horizontal slider spacing.
             */
            sliderX?: number,
            /**
             * Vertical slider spacing.
             */
            sliderY?: number,
            /**
             * Header spacing.
             */
            header?: number,
            /**
             * Footer spacing.
             */
            footer?: number,
        },

        /**
         * Panel configuration.
         */
        panel: {
            /**
             * Panel child game object.
             */
            child: Phaser.GameObjects.GameObject,
            /**
             * Mask configuration or true to enable.
             */
            mask?: MaskConfig | boolean,
            /**
             * True to keep original child origin.
             */
            childOrigin0?: boolean,
        },

        /**
         * Alignment configuration.
         */
        align?: {
            /**
             * Header alignment.
             */
            header?: Scrollable.AlignTypes,
            /**
             * Footer alignment.
             */
            footer?: Scrollable.AlignTypes,
            /**
             * Panel alignment.
             */
            panel?: Scrollable.AlignTypes,
        },

        /**
         * Expand settings.
         */
        expand?: {
            /**
             * True to expand header.
             */
            header?: boolean,
            /**
             * True to expand footer.
             */
            footer?: boolean,
            /**
             * True to expand panel.
             */
            panel?: boolean,
        },
    }
}

/**
 * Scrollable panel that hosts a single child with optional mask.
 */
declare class ScrollablePanel extends Scrollable {
    /**
     * Create a scrollable panel.
     * @param scene - The Scene to which this object belongs.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        config?: ScrollablePanel.IConfig
    );

    /**
     * Scroll to make a child visible.
     * @param child - Child to scroll to.
     * @param align - Alignment within the viewport.
     * @param duration - Tween duration in ms.
     * @param ease - Easing name.
     * @returns This instance.
     */
    scrollToChild(
        child: Phaser.GameObjects.GameObject,
        align?: 'top' | 'bottom' | 'centerY' | 'left' | 'right' | 'centerX' | 'center',
        duration?: number,
        ease?: string
    ): this;

}
