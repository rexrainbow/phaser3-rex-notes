// import * as Phaser from 'phaser';
import GridSizer from '../gridsizer/GridSizer';


export default Tabs;

declare namespace Tabs {
    /**
     * Tab button group names.
     */
    type GroupNameType = 'left' | 'right' | 'top' | 'bottom';

    /**
     * Callback invoked for each button in a group.
     */
    type EachButtonCallbackType = (
        /**
         * Current button game object.
         */
        button: Phaser.GameObjects.GameObject,
        /**
         * Zero-based button index.
         */
        index: number,
        /**
         * Full button list in the group.
         */
        buttons: Phaser.GameObjects.GameObject[]
    ) => void;

    /**
     * Click behavior configuration for tab buttons.
     */
    interface IClickConfig {
        /**
         * Click trigger mode.
         */
        mode: 0 | 1 | 'pointerup' | 'pointerdown' | 'release' | 'press',
        /**
         * Minimum interval between clicks in milliseconds.
         */
        clickInterval?: number
    }

    /**
     * Configuration options for creating tabs container.
     */
    interface IConfig extends GridSizer.IConfig {
        space?: {
            left?: number,
            right?: number,
            top?: number,
            bottom?: number,

            leftButtonsOffset?: number,
            rightButtonsOffset?: number,
            topButtonsOffset?: number,
            bottomButtonsOffset?: number,

            leftButton?: number,
            rightButton?: number,
            topButton?: number,
            bottomButton?: number,
        },

        /**
         * Optional background game object.
         */
        background?: Phaser.GameObjects.GameObject,
        /**
         * Optional panel game object.
         */
        panel?: Phaser.GameObjects.GameObject,

        /**
         * Left button list.
         */
        leftButtons?: Phaser.GameObjects.GameObject[],
        /**
         * Left buttons background.
         */
        leftButtonsBackground?: Phaser.GameObjects.GameObject,

        /**
         * Right button list.
         */
        rightButtons?: Phaser.GameObjects.GameObject[],
        /**
         * Right buttons background.
         */
        rightButtonsBackground?: Phaser.GameObjects.GameObject,

        /**
         * Top button list.
         */
        topButtons?: Phaser.GameObjects.GameObject[],
        /**
         * Top buttons background.
         */
        topButtonsBackground?: Phaser.GameObjects.GameObject,

        /**
         * Bottom button list.
         */
        bottomButtons?: Phaser.GameObjects.GameObject[],
        /**
         * Bottom buttons background.
         */
        bottomButtonsBackground?: Phaser.GameObjects.GameObject,

        expand?: {
            panel?: boolean,
            leftButtons?: boolean,
            rightButtons?: boolean,
            topButtons?: boolean,
            bottomButtons?: boolean
        },

        align?: {
            leftButtons?: 'top' | 'bottom' | 'center',
            rightButtons?: 'top' | 'bottom' | 'center',
            topButtons?: 'left' | 'right' | 'center',
            bottomButtons?: 'left' | 'right' | 'center',
        },

        /**
         * Click behavior configuration.
         */
        click?: IClickConfig,
    }

}

/**
 * Grid-based tabs component with button groups on four sides.
 */
declare class Tabs extends GridSizer {
    /**
     * Create a tabs component.
     *
     * @param scene - Scene that owns this component.
     * @param config - Optional tabs configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: Tabs.IConfig
    );

    /**
     * Emit button-click event on a specific group.
     *
     * @param groupName - Target button group name.
     * @param index - Button index or button game object.
     * @returns This component instance.
     */
    emitButtonClick(
        groupName: Tabs.GroupNameType,
        index: number | Phaser.GameObjects.GameObject
    ): this;
    /**
     * Emit click for left button group.
     *
     * @param index - Button index or button game object.
     * @returns This component instance.
     */
    emitLeftButtonClick(
        index: number | Phaser.GameObjects.GameObject
    ): this;
    /**
     * Emit click for right button group.
     *
     * @param index - Button index or button game object.
     * @returns This component instance.
     */
    emitRightButtonClick(
        index: number | Phaser.GameObjects.GameObject
    ): this;
    /**
     * Emit click for top button group.
     *
     * @param index - Button index or button game object.
     * @returns This component instance.
     */
    emitTopButtonClick(
        index: number | Phaser.GameObjects.GameObject
    ): this;
    /**
     * Emit click for bottom button group.
     *
     * @param index - Button index or button game object.
     * @returns This component instance.
     */
    emitBottomButtonClick(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    /**
     * Enable or disable button in a specific group.
     *
     * @param groupName - Target button group name.
     * @param index - Button index, button object, or boolean shortcut.
     * @param enable - Target enabled state.
     * @returns This component instance.
     */
    setButtonEnable(
        groupName: Tabs.GroupNameType,
        index?: number | Phaser.GameObjects.GameObject | boolean,
        enable?: boolean
    ): this;
    setLeftButtonEnable(
        index: number | Phaser.GameObjects.GameObject
    ): this;
    setRightButtonEnable(
        index: number | Phaser.GameObjects.GameObject
    ): this;
    setTopButtonEnable(
        index: number | Phaser.GameObjects.GameObject
    ): this;
    setBottomButtonEnable(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    /**
     * Toggle button enable state in a specific group.
     *
     * @param groupName - Target button group name.
     * @param index - Button index or button game object.
     * @returns This component instance.
     */
    toggleButtonEnable(
        groupName: Tabs.GroupNameType,
        index?: number | Phaser.GameObjects.GameObject
    ): this;
    toggleLeftButtonEnable(
        index: number | Phaser.GameObjects.GameObject
    ): this;
    toggleRightButtonEnable(
        index: number | Phaser.GameObjects.GameObject
    ): this;
    toggleTopButtonEnable(
        index: number | Phaser.GameObjects.GameObject
    ): this;
    toggleBottomButtonEnable(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    /**
     * Get button enable state in a specific group.
     *
     * @param groupName - Target button group name.
     * @param index - Button index or button game object.
     * @returns True if enabled.
     */
    getButtonEnable(
        groupName: Tabs.GroupNameType,
        index: number | Phaser.GameObjects.GameObject
    ): boolean;
    getLeftButtonEnable(
        index: number | Phaser.GameObjects.GameObject
    ): boolean;
    getRightButtonEnable(
        index: number | Phaser.GameObjects.GameObject
    ): boolean;
    getTopButtonEnable(
        index: number | Phaser.GameObjects.GameObject
    ): boolean;
    getBottomButtonEnable(
        index: number | Phaser.GameObjects.GameObject
    ): boolean;

    /**
     * Get button object from a specific group.
     *
     * @param groupName - Target button group name.
     * @param index - Button index.
     * @returns Button game object or null.
     */
    getButton(
        groupName: Tabs.GroupNameType,
        index: number
    ): Phaser.GameObjects.GameObject | null;
    getLeftButton(
        index: number
    ): Phaser.GameObjects.GameObject | null;
    getRightButton(
        index: number
    ): Phaser.GameObjects.GameObject | null;
    getTopButton(
        index: number
    ): Phaser.GameObjects.GameObject | null;
    getBottomButton(
        index: number
    ): Phaser.GameObjects.GameObject | null;

    /**
     * Add button to a specific group.
     *
     * @param groupName - Target button group name.
     * @param gameObject - Button game object.
     * @returns This component instance.
     */
    addButton(
        groupName: Tabs.GroupNameType,
        gameObject: Phaser.GameObjects.GameObject
    ): this;
    addLeftButton(
        gameObject: Phaser.GameObjects.GameObject
    ): this;
    addRightButton(
        gameObject: Phaser.GameObjects.GameObject
    ): this;
    addTopButton(
        gameObject: Phaser.GameObjects.GameObject
    ): this;
    addBottomButton(
        gameObject: Phaser.GameObjects.GameObject
    ): this;

    /**
     * Remove button from a specific group.
     *
     * @param groupName - Target button group name.
     * @param gameObject - Button game object.
     * @param destroyChild - Set to true to destroy removed button.
     * @returns This component instance.
     */
    removeButton(
        groupName: Tabs.GroupNameType,
        gameObject: Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;
    removeLeftButton(
        gameObject: Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;
    removeRightButton(
        gameObject: Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;
    removeTopButton(
        gameObject: Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;
    removeBottomButton(
        gameObject: Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    /**
     * Clear buttons in a specific group.
     *
     * @param groupName - Target button group name.
     * @param destroyChild - Set to true to destroy removed buttons.
     * @returns This component instance.
     */
    clearButtons(
        groupName: Tabs.GroupNameType,
        destroyChild?: boolean
    ): this;
    clearLeftButtons(
        destroyChild?: boolean
    ): this;
    clearRightButtons(
        destroyChild?: boolean
    ): this;
    clearTopButtons(
        destroyChild?: boolean
    ): this;
    clearBottomButtosn(
        destroyChild?: boolean
    ): this;

    /**
     * Show button in a specific group.
     *
     * @param groupName - Target button group name.
     * @param index - Button index or button game object.
     * @returns This component instance.
     */
    showButton(
        groupName: Tabs.GroupNameType,
        index: number | Phaser.GameObjects.GameObject
    ): this;
    showLeftButton(
        index: number | Phaser.GameObjects.GameObject
    ): this;
    showRightButton(
        index: number | Phaser.GameObjects.GameObject
    ): this;
    showTopButton(
        index: number | Phaser.GameObjects.GameObject
    ): this;
    showBottomButton(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    /**
     * Hide button in a specific group.
     *
     * @param groupName - Target button group name.
     * @param index - Button index or button game object.
     * @returns This component instance.
     */
    hideButton(
        groupName: Tabs.GroupNameType,
        index: number | Phaser.GameObjects.GameObject
    ): this;
    hideLeftButton(
        index: number | Phaser.GameObjects.GameObject
    ): this;
    hideRightButton(
        index: number | Phaser.GameObjects.GameObject
    ): this;
    hideTopButton(
        index: number | Phaser.GameObjects.GameObject
    ): this;
    hideBottomButton(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    /**
     * Iterate buttons in a specific group.
     *
     * @param groupName - Target button group name.
     * @param callback - Callback invoked per button.
     * @param scop - Optional callback execution scope.
     * @returns This component instance.
     */
    forEachButtton(
        groupName: Tabs.GroupNameType,
        callback: Tabs.EachButtonCallbackType,
        scop?: unknown
    ): this;
    /**
     * Iterate left group buttons.
     *
     * @param callback - Callback invoked per button.
     * @param scop - Optional callback execution scope.
     * @returns This component instance.
     */
    forEachLeftButton(
        callback: Tabs.EachButtonCallbackType,
        scop?: unknown
    ): this;
    /**
     * Iterate right group buttons.
     *
     * @param callback - Callback invoked per button.
     * @param scop - Optional callback execution scope.
     * @returns This component instance.
     */
    forEachRightButton(
        callback: Tabs.EachButtonCallbackType,
        scop?: unknown
    ): this;
    /**
     * Iterate top group buttons.
     *
     * @param callback - Callback invoked per button.
     * @param scop - Optional callback execution scope.
     * @returns This component instance.
     */
    forEachTopButton(
        callback: Tabs.EachButtonCallbackType,
        scop?: unknown
    ): this;
    /**
     * Iterate bottom group buttons.
     *
     * @param callback - Callback invoked per button.
     * @param scop - Optional callback execution scope.
     * @returns This component instance.
     */
    forEachBottomButton(
        callback: Tabs.EachButtonCallbackType,
        scop?: unknown
    ): this;
}
