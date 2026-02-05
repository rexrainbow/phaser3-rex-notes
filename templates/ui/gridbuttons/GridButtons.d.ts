// import * as Phaser from 'phaser';
import GridSizer from '../gridsizer/GridSizer';
import { IConfig as IConfigButtons } from '../utils/buttongroup/Buttons';


export default GridButtons;

declare namespace GridButtons {
    /**
     * Configuration of a generated grid cell container.
     */
    interface ICellConfig {
        /**
         * Target column index.
         */
        column?: number,
        /**
         * Target row index.
         */
        row?: number,
        /**
         * Alignment inside the cell.
         */
        align?: GridSizer.AlignTypes,
        /**
         * Cell padding settings.
         */
        padding?: GridSizer.PaddingTypes,
        /**
         * Set to true to expand item in the cell.
         */
        expand?: boolean,
        /**
         * Optional key of the cell item.
         */
        key?: string
    }

    /**
     * Callback used to create a container game object for each grid cell.
     */
    type CreateCellContainerCallbackType = (
        /**
         * Scene that owns the generated object.
         */
        scene: Phaser.Scene,
        /**
         * Cell center x position.
         */
        x: number,
        /**
         * Cell center y position.
         */
        y: number,
        /**
         * Cell configuration.
         */
        config: ICellConfig
    ) => Phaser.GameObjects.GameObject;

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
     * Configuration options for creating a grid buttons container.
     */
    interface IConfig extends GridSizer.IConfig, IConfigButtons {
        /**
         * Optional background game object.
         */
        background?: Phaser.GameObjects.GameObject,

        /**
         * Initial two-dimensional button array.
         */
        buttons?: Phaser.GameObjects.GameObject[][],
        /**
         * Callback for creating per-cell containers.
         */
        createCellContainerCallback?: CreateCellContainerCallbackType
    }
}

/**
 * Grid sizer that manages a group of clickable buttons.
 */
declare class GridButtons extends GridSizer {
    /**
     * Create a grid buttons component.
     *
     * @param scene - Scene that owns this component.
     * @param config - Optional component configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: GridButtons.IConfig
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
        callback: GridButtons.EachButtonCallbackType,
        scop?: unknown
    ): this;

    /**
     * Current flattened button list.
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
}
