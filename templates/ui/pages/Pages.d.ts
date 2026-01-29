// import * as Phaser from 'phaser';
import OverlapSizer from '../overlapsizer/OverlapSizer';
import GetBoundsConfig from '../../../plugins/utils/bounds/GetBoundsConfig';


export default Pages;

declare namespace Pages {

    /**
     * Alignment values for pages and child elements.
     */
    type AlignTypes = number | 'center' | 'left' | 'right' | 'top' | 'bottom' |
        'left-top' | 'left-center' | 'left-bottom' |
        'center-top' | 'center-center' | 'center-bottom' |
        'right-top' | 'right-center' | 'right-bottom';

    /**
     * Padding configuration types.
     */
    type PaddingTypes = GetBoundsConfig.PaddingConfigType;

    /**
     * Configuration options for creating a Pages container.
     */
    interface IConfig extends OverlapSizer.IConfig {
        /**
         * Default fade-in duration for swaps, in milliseconds.
         */
        fadeIn?: number,

        /**
         * Behavior used when swapping pages.
         */
        swapMode?: 0 | 1 | 'invisible' | 'destroy',
    }

}

/**
 * A container that manages multiple pages and swaps between them.
 */
declare class Pages extends OverlapSizer {
    /**
     * Create a Pages container.
     *
     * @param scene - The Phaser.Scene that owns this Pages container.
     * @param config - Configuration options for the Pages container.
     */
    constructor(
        scene: Phaser.Scene,
        config?: Pages.IConfig
    );

    /**
     * Set how the previous page is handled during a swap.
     *
     * @param mode - The swap mode to use.
     * @returns This Pages instance.
     */
    setSwapMode(
        mode: 0 | 1 | 'invisible' | 'destroy'
    ): this;

    /**
     * Add a new page to the container.
     *
     * @param gameObject - The page game object.
     * @param config - Page-specific configuration.
     * @returns This Pages instance.
     */
    addPage(
        gameObject: Phaser.GameObjects.GameObject,
        config?: {
            /**
             * The page key.
             */
            key?: string,

            /**
             * Alignment for the page.
             */
            align?: Pages.AlignTypes,

            /**
             * Padding for the page.
             */
            padding?: Pages.PaddingTypes,

            /**
             * Expand options for the page.
             */
            expand: boolean |
            {
                /**
                 * Expand width.
                 */
                width?: boolean,
                /**
                 * Expand height.
                 */
                height?: boolean,
            },

            /**
             * Minimum width of the page.
             */
            minWidth?: number,

            /**
             * Minimum height of the page.
             */
            minHeight?: number
        }
    ): this;

    /**
     * Swap to the page with the given key.
     *
     * @param key - The page key to activate.
     * @param fadeInDuration - Fade-in duration in milliseconds.
     * @returns This Pages instance.
     */
    swapPage(
        key: string,
        fadeInDuration?: number
    ): this;
    /**
     * Key of the current page.
     */
    currentKey: string;
    /**
     * Key of the previous page.
     */
    readonly previousKey: string;
    /**
     * All page keys in this container.
     */
    keys: string[];

    /**
     * Get a page by key.
     *
     * @param key - The page key.
     * @returns The page game object.
     */
    getPage(key: string): Phaser.GameObjects.GameObject;
    /**
     * Current page game object.
     */
    readonly currentPage: Phaser.GameObjects.GameObject;
    /**
     * Previous page game object.
     */
    readonly previousPage: Phaser.GameObjects.GameObject;
}
