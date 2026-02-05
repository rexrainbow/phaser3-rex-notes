// import * as Phaser from 'phaser';
import Sizer from '../sizer/Sizer';
import { IConfig as IConfigButtons } from '../utils/buttongroup/Buttons';

export default Buttons;

declare namespace Buttons {

    /**
     * Alignment options for button layout in the sizer.
     */
    type AlignTypes = 'left' | 'top' | 'right' | 'bottom' | 'center';

    /**
     * Callback invoked for each button in the collection.
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
         * Full button list.
         */
        buttons: Phaser.GameObjects.GameObject[]
    ) => void;

    /**
     * Configuration options of the buttons UI component.
     */
    interface IConfig extends Sizer.IConfig, IConfigButtons {
        /**
         * Optional background game object.
         */
        background?: Phaser.GameObjects.GameObject,

        /**
         * Initial buttons to add.
         */
        buttons?: Phaser.GameObjects.GameObject[],

        /**
         * Set to true to expand buttons in layout direction.
         */
        expand?: boolean,

        /**
         * Alignment of buttons within available space.
         */
        align?: AlignTypes,
    }
}

/**
 * UI container that manages a group of clickable buttons.
 */
declare class Buttons extends Sizer {
    /**
     * Create a buttons UI component.
     *
     * @param scene - Scene that owns this component.
     * @param config - Optional component configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: Buttons.IConfig
    );

    /**
     * Emit a button-click event for a button index or object.
     *
     * @param index - Button index or button game object.
     * @returns This component instance.
     */
    emitButtonClick(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    /**
     * Enable or disable a button, or all buttons.
     *
     * @param index - Button index, button game object, or boolean shortcut.
     * @param enable - Target enabled state.
     * @returns This component instance.
     */
    setButtonEnable(
        index?: number | Phaser.GameObjects.GameObject | boolean,
        enable?: boolean
    ): this;

    /**
     * Toggle enabled state of a button.
     *
     * @param index - Button index or button game object.
     * @returns This component instance.
     */
    toggleButtonEnable(
        index?: number | Phaser.GameObjects.GameObject
    ): this;

    /**
     * Get enabled state of a button.
     *
     * @param index - Button index or button game object.
     * @returns True if enabled.
     */
    getButtonEnable(
        index: number | Phaser.GameObjects.GameObject
    ): boolean;

    /**
     * Get a button by index.
     *
     * @param index - Zero-based button index.
     * @returns Button game object or null if not found.
     */
    getButton(
        index: number
    ): Phaser.GameObjects.GameObject | null;

    /**
     * Add a button.
     *
     * @param gameObject - Button game object to add.
     * @returns This component instance.
     */
    addButton(
        gameObject: Phaser.GameObjects.GameObject
    ): this;

    /**
     * Remove a button.
     *
     * @param gameObject - Button game object to remove.
     * @param destroyChild - Set to true to destroy removed button.
     * @returns This component instance.
     */
    removeButton(
        gameObject: Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    /**
     * Remove all buttons.
     *
     * @param destroyChild - Set to true to destroy removed buttons.
     * @returns This component instance.
     */
    clearButtons(
        destroyChild?: boolean
    ): this;

    /**
     * Show a button.
     *
     * @param index - Button index or button game object.
     * @returns This component instance.
     */
    showButton(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    /**
     * Hide a button.
     *
     * @param index - Button index or button game object.
     * @returns This component instance.
     */
    hideButton(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    /**
     * Iterate all buttons.
     *
     * @param callback - Callback invoked per button.
     * @param scop - Optional callback execution scope.
     * @returns This component instance.
     */
    forEachButtton(
        callback: Buttons.EachButtonCallbackType,
        scop?: unknown
    ): this;

    /**
     * Current button list.
     */
    readonly buttons: Phaser.GameObjects.GameObject[];

    /**
     * Current component value.
     */
    value: unknown;

    /**
     * Set selected button by name.
     *
     * @param name - Button name.
     * @returns This component instance.
     */
    setSelectedButtonName(
        name: string
    ): this;

    /**
     * Get selected button name.
     *
     * @returns Selected button name.
     */
    getSelectedButtonName(): string;

    /**
     * Set state of a named button.
     *
     * @param name - Button name.
     * @param state - Target state.
     * @returns This component instance.
     */
    setButtonState(
        name: string,
        state?: boolean
    ): this;

    /**
     * Get state of a named button.
     *
     * @param name - Button name.
     * @returns Button state.
     */
    getButtonState(
        name: string
    ): boolean;

    /**
     * Get states of all named buttons.
     *
     * @returns Mapping from button names to boolean states.
     */
    getAllButtonsState(): Record<string, boolean>;;
}
