import ButtonBehavior from '../../../../plugins/input/button/Button';

/**
 * Callback used to apply selected state to a button object.
 */
export type SetValueCallback = (
    /**
     * The button game object being updated.
     */
    button: Phaser.GameObjects.GameObject,
    /**
     * The next selected state.
     */
    value: boolean,
    /**
     * The previous selected state.
     */
    previousValue: boolean
) => void;

/**
 * Callback used when iterating all buttons in the group.
 */
export type ForEachButtonCallback = (
    /**
     * The current button game object.
     */
    button: Phaser.GameObjects.GameObject,
    /**
     * Index of the current button.
     */
    index: number,
    /**
     * Full button list at iteration time.
     */
    buttons: Phaser.GameObjects.GameObject[]
) => void;

/**
 * Configuration for creating and controlling a button group.
 */
export interface IConfig {
    /** Click behavior configuration applied to each button. */
    click?: ButtonBehavior.IConfig,

    /** Optional logical group name for emitted events. */
    groupName?: string,

    /** Event emitter used by the button group. */
    eventEmitter?: Phaser.GameObjects.GameObject,

    /** Selection mode of the button group. */
    type?: 'checkboxes' | 'radio',
    /** Alias of type for backward compatibility. */
    buttonsType?: 'checkboxes' | 'radio',

    /** Callback invoked when a button value changes. */
    setValueCallback?: SetValueCallback,

    /** Scope bound when invoking setValueCallback. */
    setValueCallbackScope?: object
}

/**
 * Common button-group methods and state fields.
 */
export interface IButtons {
    /**
     * Get a button by index.
     *
     * @param index - Index of the button.
     * @returns The matched button game object.
     */
    getButton(index: number): Phaser.GameObjects.GameObject;
    /**
     * Get a button by name.
     *
     * @param name - Name of the button.
     * @returns The matched button game object.
     */
    getButton(name: string): Phaser.GameObjects.GameObject;
    /**
     * Resolve a button object from itself.
     *
     * @param button - Button game object.
     * @returns The same button game object.
     */
    getButton(button: Phaser.GameObjects.GameObject): Phaser.GameObjects.GameObject;

    /**
     * Get all buttons in this group.
     *
     * @returns Current button list.
     */
    getButtons(): Phaser.GameObjects.GameObject[];
    /**
     * Check whether the group has any button.
     *
     * @returns True if there is at least one button.
     */
    hasAnyButton(): boolean;

    /**
     * Emit a button-click event.
     *
     * @param index - Button index or button object.
     * @returns This button group instance.
     */
    emitButtonClick(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    /**
     * Emit a button-over event.
     *
     * @param index - Button index or button object.
     * @returns This button group instance.
     */
    emitButtonOver(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    /**
     * Set enabled state of one button or all buttons.
     *
     * @param index - Button index, button object, or boolean as shorthand for all buttons.
     * @param enable - Enabled state to apply.
     * @returns This button group instance.
     */
    setButtonEnable(
        index?: number | Phaser.GameObjects.GameObject | boolean,
        enable?: boolean
    ): this;

    /**
     * Toggle enabled state of one button or all buttons.
     *
     * @param index - Optional button index or button object.
     * @returns This button group instance.
     */
    toggleButtonEnable(
        index?: number | Phaser.GameObjects.GameObject
    ): this;

    /**
     * Get enabled state of a button.
     *
     * @param index - Button index or button object.
     * @returns True if the button is enabled.
     */
    getButtonEnable(
        index: number | Phaser.GameObjects.GameObject
    ): boolean;

    /**
     * Add a button to the group.
     *
     * @param gameObject - Button game object to add.
     * @returns This button group instance.
     */
    addButton(
        gameObject: Phaser.GameObjects.GameObject
    ): this;

    /**
     * Remove a button from the group.
     *
     * @param gameObject - Button game object to remove.
     * @param destroyChild - Set to true to destroy the button after removal.
     * @returns This button group instance.
     */
    removeButton(
        gameObject: Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    /**
     * Remove all buttons from the group.
     *
     * @param destroyChild - Set to true to destroy removed buttons.
     * @returns This button group instance.
     */
    clearButtons(
        destroyChild?: boolean
    ): this;

    /**
     * Show a button.
     *
     * @param index - Button index or button object.
     * @returns This button group instance.
     */
    showButton(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    /**
     * Hide a button.
     *
     * @param index - Button index or button object.
     * @returns This button group instance.
     */
    hideButton(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    /**
     * Iterate each button in the group.
     *
     * @param callback - Callback invoked for each button.
     * @param scop - Scope bound when invoking callback.
     * @returns This button group instance.
     */
    forEachButtton(
        callback: ForEachButtonCallback,
        scop?: unknown
    ): this;

    /** Current button-group selection mode. */
    buttonsType: string;
    /** Current selected value representation. */
    value: unknown;

    /**
     * Select a button by name.
     *
     * @param name - Name of the button to select.
     * @returns This button group instance.
     */
    setSelectedButtonName(
        name: string
    ): this;

    /**
     * Get selected button name.
     *
     * @returns Name of the selected button.
     */
    getSelectedButtonName(): string;

    /**
     * Set button checked state by name.
     *
     * @param name - Name of the target button.
     * @param state - Checked state to apply.
     * @returns This button group instance.
     */
    setButtonState(
        name: string,
        state?: boolean
    ): this;

    /**
     * Clear selected state from all buttons.
     *
     * @returns This button group instance.
     */
    clearAllButtonsState(): this;

    /**
     * Get checked state of a button by name.
     *
     * @param name - Name of the target button.
     * @returns True if the button is checked.
     */
    getButtonState(
        name: string
    ): boolean;


}
