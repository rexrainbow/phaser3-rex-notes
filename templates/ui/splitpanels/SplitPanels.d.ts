// import * as Phaser from 'phaser';
import Sizer from '../sizer/Sizer';

export default SplitPanels;

declare namespace SplitPanels {

    /**
     * Configuration options for creating a SplitPanels container.
     */
    interface IConfig extends Sizer.IConfig {
        /**
         * Spacing configuration for the layout.
         */
        space?: {
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
            /**
             * Spacing between items.
             */
            item?: number

            /**
             * Extra top spacing for the left panel.
             */
            leftPanelTop?: number,
            /**
             * Extra bottom spacing for the left panel.
             */
            leftPanelBottom?: number,
            /**
             * Extra left spacing for the left panel.
             */
            leftPanelLeft?: number,
            /**
             * Extra right spacing for the left panel.
             */
            leftPanelRight?: number,
            /**
             * Extra top spacing for the right panel.
             */
            rightPanelTop?: number,
            /**
             * Extra bottom spacing for the right panel.
             */
            rightPanelBottom?: number,
            /**
             * Extra left spacing for the right panel.
             */
            rightPanelLeft?: number,
            /**
             * Extra right spacing for the right panel.
             */
            rightPanelRight?: number,

            /**
             * Extra top spacing for the top panel.
             */
            topPanelTop?: number,
            /**
             * Extra bottom spacing for the top panel.
             */
            topPanelBottom?: number,
            /**
             * Extra left spacing for the top panel.
             */
            topPanelLeft?: number,
            /**
             * Extra right spacing for the top panel.
             */
            topPanelRight?: number,
            /**
             * Extra top spacing for the bottom panel.
             */
            bottomPanelTop?: number,
            /**
             * Extra bottom spacing for the bottom panel.
             */
            bottomPanelBottom?: number,
            /**
             * Extra left spacing for the bottom panel.
             */
            bottomPanelLeft?: number,
            /**
             * Extra right spacing for the bottom panel.
             */
            bottomPanelRight?: number,

            /**
             * Extra top spacing for the splitter.
             */
            splitterTop?: number,
            /**
             * Extra bottom spacing for the splitter.
             */
            splitterBottom?: number,
            /**
             * Extra left spacing for the splitter.
             */
            splitterLeft?: number,
            /**
             * Extra right spacing for the splitter.
             */
            splitterRight?: number,
        },

        /**
         * Background game object.
         */
        background?: Phaser.GameObjects.GameObject,

        /**
         * Left panel game object.
         */
        leftPanel?: Phaser.GameObjects.GameObject,
        /**
         * Top panel game object.
         */
        topPanel?: Phaser.GameObjects.GameObject,

        /**
         * Right panel game object.
         */
        rightPanel?: Phaser.GameObjects.GameObject,
        /**
         * Bottom panel game object.
         */
        bottomPanel?: Phaser.GameObjects.GameObject,

        /**
         * Splitter game object.
         */
        splitter?: Phaser.GameObjects.GameObject,

        /**
         * Minimum width for the left panel.
         */
        minLeftPanelWidth?: number,
        /**
         * Minimum width for the right panel.
         */
        minRightPanelWidth?: number,

        /**
         * Minimum height for the top panel.
         */
        minTopPanelHeight?: number,
        /**
         * Minimum height for the bottom panel.
         */
        minBottomPanelHeight?: number,

        /**
         * Initial split ratio.
         */
        splitRatio?: number,
    }

}

/**
 * A resizable split panel container.
 */
declare class SplitPanels extends Sizer {
    /**
     * Create a SplitPanels container.
     *
     * @param scene - The Phaser.Scene that owns this SplitPanels container.
     * @param config - Configuration options for the SplitPanels container.
     */
    constructor(
        scene: Phaser.Scene,
        config?: SplitPanels.IConfig
    );

    /**
     * Enable or disable the splitter.
     *
     * @param enable - Whether the splitter is enabled.
     * @returns This SplitPanels instance.
     */
    setSplitterEnable(enable?: boolean): this;
    /**
     * Whether the splitter is enabled.
     */
    splitterEnable: boolean;

    /**
     * Set the minimum width for the left panel.
     *
     * @param value - The minimum width.
     * @returns This SplitPanels instance.
     */
    setMinLeftPanelWidth(value: number): this;
    /**
     * Minimum width for the left panel.
     */
    minLeftPanelWidth: number;
    /**
     * Set the minimum width for the right panel.
     *
     * @param value - The minimum width.
     * @returns This SplitPanels instance.
     */
    setMinRightPanelWidth(value: number): this;
    /**
     * Minimum width for the right panel.
     */
    minRightPanelWidth: number;

    /**
     * Set the minimum height for the top panel.
     *
     * @param value - The minimum height.
     * @returns This SplitPanels instance.
     */
    setMinTopPanelHeight(value: number): this;
    /**
     * Minimum height for the top panel.
     */
    minTopPanelHeight: number;
    /**
     * Set the minimum height for the bottom panel.
     *
     * @param value - The minimum height.
     * @returns This SplitPanels instance.
     */
    setMinBottomPanelHeight(value: number): this;
    /**
     * Minimum height for the bottom panel.
     */
    minBottomPanelHeight: number;

    /**
     * Set the split ratio between panels.
     *
     * @param value - The split ratio value.
     * @returns This SplitPanels instance.
     */
    setSplitRatio(value: number): this;
    /**
     * Current split ratio between panels.
     */
    splitRatio: number;
}
