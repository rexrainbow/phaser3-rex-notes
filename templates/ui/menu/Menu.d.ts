// import * as Phaser from 'phaser';
import Buttons from '../buttons/Buttons';


export default Menu;

declare namespace Menu {

    /**
     * Configuration of menu show/hide easing.
     */
    type EaseConfigTypes = number | {
        /**
         * Ease duration in milliseconds.
         */
        duration?: number,
        /**
         * Ease orientation.
         */
        orientation?: 0 | 1 | 'x' | 'y' | 'h' | 'v',
        /**
         * Ease function name.
         */
        ease?: string
    };

    /**
     * Events that can trigger submenu expansion.
     */
    type ExpandEventTypes = 'button.click' | 'button.over';

    /**
     * Preferred side for placing submenus.
     */
    type SubMenuSideTypes = 0 | 1 | 2 | 3 | 'right' | 'down' | 'left' | 'up';

    /**
     * Callback used to create menu background object.
     */
    type CreateBackgroundCallbackType = (
        /**
         * Item list used to build this menu.
         */
        items: any[]
    ) => Phaser.GameObjects.GameObject;

    /**
     * Callback used to create menu buttons.
     */
    type CreateButtonCallbackType = (
        /**
         * Current item data.
         */
        item: any,
        /**
         * Zero-based item index.
         */
        index: number,
        /**
         * Full item list.
         */
        items: any[]
    ) => Phaser.GameObjects.GameObject;

    /**
     * Configuration options for creating a menu.
     */
    interface IConfig extends Buttons.IConfig {
        /**
         * Set to true to show menu as popup.
         */
        popUp?: boolean,

        /**
         * Source item list for building menu entries.
         */
        items: any[],

        /**
         * Callback used to create menu background.
         */
        createBackgroundCallback?: CreateBackgroundCallbackType,

        /**
         * Scope used when invoking background callback.
         */
        createBackgroundCallbackScope?: object,

        /**
         * Callback used to create each menu button.
         */
        createButtonCallback?: CreateButtonCallbackType,

        /**
         * Scope used when invoking button callback.
         */
        createButtonCallbackScope?: object,

        /**
         * Ease configuration used when menu expands.
         */
        easeIn?: EaseConfigTypes,
        /**
         * Ease configuration used when menu collapses.
         */
        easeOut?: EaseConfigTypes,

        /**
         * Event used to expand submenus.
         */
        expandEvent?: ExpandEventTypes,

        /**
         * Preferred side of submenus.
         */
        subMenuSide?: SubMenuSideTypes,
    }
}

/**
 * Hierarchical menu component built on top of `Buttons`.
 */
declare class Menu extends Buttons {
    /**
     * Create a menu component.
     *
     * @param scene - Scene that owns this component.
     * @param config - Optional menu configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: Menu.IConfig
    );

    /**
     * Collapse this menu.
     *
     * @returns This component instance.
     */
    collapse(): this;

    /**
     * Collapse active submenu.
     *
     * @returns This component instance.
     */
    collapseSubMenu(): this;
}
