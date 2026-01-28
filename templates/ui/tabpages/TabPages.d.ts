// import * as Phaser from 'phaser';
import Sizer from '../sizer/Sizer';
import Buttons from '../buttons/Buttons';
import FixWidthButtons from '../fixwidthbuttons/FixWidthButtons';
import Pages from '../pages/Pages';


export default TabPages;

declare namespace TabPages {
    /**
     * Position values for the tabs area.
     */
    type TabsPositionType = 'top' | 'bottom' | 'left' | 'right';

    /**
     * Configuration options for creating a TabPages container.
     */
    interface IConfig extends Sizer.IConfig {
        /**
         * Background game object.
         */
        background?: Phaser.GameObjects.GameObject,

        /**
         * Position of the tabs area.
         */
        tabPosition?: TabsPositionType,
        /**
         * Alias of tabPosition.
         */
        tabsPosition?: TabsPositionType,

        /**
         * Wrap tabs when they exceed the available space.
         */
        wrapTabs?: boolean,
        /**
         * Tabs configuration.
         */
        tabs?: Buttons.IConfig | FixWidthButtons.IConfig,
        /**
         * Pages configuration.
         */
        pages?: Pages.IConfig,

        /**
         * Expand options.
         */
        expand?: {
            /**
             * Expand the tabs area.
             */
            tabs?: boolean
        },

        /**
         * Alignment options.
         */
        align?: {
            /**
             * Tabs alignment.
             */
            tabs?: 'top' | 'bottom' | 'left' | 'right' | 'center'
        }


    }

    /**
     * Configuration for adding a page with tab and content.
     */
    interface IAddPageConfig {
        /**
         * The page key.
         */
        key?: string,
        /**
         * The tab game object.
         */
        tab: Phaser.GameObjects.GameObject,
        /**
         * The page game object.
         */
        page: Phaser.GameObjects.GameObject
    }

}

/**
 * A tabbed pages container that manages tabs and pages.
 */
declare class TabPages extends Sizer {
    /**
     * Create a TabPages container.
     *
     * @param scene - The Phaser.Scene that owns this TabPages container.
     * @param config - Configuration options for the TabPages container.
     */
    constructor(
        scene: Phaser.Scene,
        config?: TabPages.IConfig
    );

    /**
     * Get the page key by index.
     *
     * @param index - The page index.
     * @returns The page key.
     */
    getPageKey(index: number): string;
    /**
     * Get the page index by key.
     *
     * @param key - The page key.
     * @returns The page index.
     */
    getPageIndex(key: string): number;

    /**
     * Add a page with explicit key, tab, and page objects.
     *
     * @param key - The page key.
     * @param tabGameObject - The tab game object.
     * @param pageGameObject - The page game object.
     * @returns This TabPages instance.
     */
    addPage(
        key: string,
        tabGameObject: Phaser.GameObjects.GameObject,
        pageGameObject: Phaser.GameObjects.GameObject
    ): this;

    /**
     * Add a page using a configuration object.
     *
     * @param config - Page configuration.
     * @returns This TabPages instance.
     */
    addPage(config: TabPages.IAddPageConfig): this;

    /**
     * Remove a page by key.
     *
     * @param key - The page key.
     * @param destroyChild - Whether to destroy child game objects.
     * @returns This TabPages instance.
     */
    removePage(
        key: string,
        destroyChild?: boolean
    ): this;
    /**
     * Remove all pages.
     *
     * @param destroyChild - Whether to destroy child game objects.
     * @returns This TabPages instance.
     */
    removeAllPages(destroyChild?: boolean): this;

    /**
     * Swap to the page with the given key.
     *
     * @param key - The page key to activate.
     * @param fadeInDuration - Fade-in duration in milliseconds.
     * @returns This TabPages instance.
     */
    swapPage(
        key: string,
        fadeInDuration?: number
    ): this;
    /**
     * Swap to the first page.
     *
     * @param fadeInDuration - Fade-in duration in milliseconds.
     * @returns This TabPages instance.
     */
    swapFirstPage(fadeInDuration?: number): this;
    /**
     * Swap to the last page.
     *
     * @param fadeInDuration - Fade-in duration in milliseconds.
     * @returns This TabPages instance.
     */
    swapLastPage(fadeInDuration?: number): this;

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

    /**
     * Set the tabs position.
     *
     * @param position - The tabs position.
     * @returns This TabPages instance.
     */
    setTabPosition(position: TabPages.TabsPositionType): this;
    /**
     * Current tabs position.
     */
    readonly tabsPosition: TabPages.TabsPositionType;

    /**
     * Set padding for tabs by key.
     *
     * @param key - The padding key.
     * @param value - The padding value.
     * @returns This TabPages instance.
     */
    setTabsPadding(
        key: string,
        value?: number
    ): this;

    /**
     * Set padding for all tabs.
     *
     * @param padding - Padding value or object.
     * @returns This TabPages instance.
     */
    setTabsPadding(
        padding: number | {
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
            bottom?: number
        },
    ): this;

    /**
     * Get padding for tabs.
     *
     * @param key - The padding key.
     * @returns The padding value or object.
     */
    getTabsPadding(
        key?: string
    ): number | { left: number, right: number, top: number, bottom: number };

}
