import Label from '../label/Label';
import Buttons from '../buttons/Buttons';
import FixWidthButtons from '../fixwidthbuttons/FixWidthButtons';
import Scrollable from '../utils/scrollable/Scrollable';

export default DropDownList;

declare namespace DropDownList {
    /**
     * Callback used to create each option button.
     */
    type CreateButtonCallbackType = (
        /**
         * Dropdown list instance.
         */
        this: DropDownList,
        /**
         * Scene that owns the created button.
         */
        scene: Phaser.Scene,
        /**
         * Current option data.
         */
        option: any,
        /**
         * Zero-based option index.
         */
        index: number,
        /**
         * Full option list.
         */
        options: any[]
    ) => Phaser.GameObjects.GameObject;

    /**
     * Callback used to create general list sub-objects.
     */
    type CreateGeneralGameObjectCallbackType = (
        /**
         * Dropdown list instance.
         */
        this: DropDownList,
        /**
         * Scene that owns the created object.
         */
        scene: Phaser.Scene,
    ) => Phaser.GameObjects.GameObject;

    /**
     * Callback fired when an option button is clicked.
     */
    type OnButtonClickCallbackType = (
        /**
         * Dropdown list instance.
         */
        this: DropDownList,
        /**
         * Clicked button.
         */
        button: Phaser.GameObjects.GameObject,
        /**
         * Button index.
         */
        index: number,
        /**
         * Pointer that triggered the event.
         */
        pointer: Phaser.Input.Pointer,
        /**
         * Native input event data.
         */
        event: Phaser.Types.Input.EventData
    ) => void;

    /**
     * Callback fired when pointer enters an option button.
     */
    type OnButtonOverCallbackType = (
        /**
         * Dropdown list instance.
         */
        this: DropDownList,
        /**
         * Target button.
         */
        button: Phaser.GameObjects.GameObject,
        /**
         * Button index.
         */
        index: number,
        /**
         * Pointer that triggered the event.
         */
        pointer: Phaser.Input.Pointer,
        /**
         * Native input event data.
         */
        event: Phaser.Types.Input.EventData
    ) => void;

    /**
     * Callback fired when pointer leaves an option button.
     */
    type OnButtonOutCallbackType = (
        /**
         * Dropdown list instance.
         */
        this: DropDownList,
        /**
         * Target button.
         */
        button: Phaser.GameObjects.GameObject,
        /**
         * Button index.
         */
        index: number,
        /**
         * Pointer that triggered the event.
         */
        pointer: Phaser.Input.Pointer,
        /**
         * Native input event data.
         */
        event: Phaser.Types.Input.EventData
    ) => void;

    /**
     * Anchor target used to align list panel.
     */
    type AlignParentType = 'text' | 'icon' | 'label';

    /**
     * Expand direction of list panel.
     */
    type ExpandDirectionType = 0 | 1 | 'down' | 'up';

    /**
     * Callback used to apply value to label content.
     */
    type SetValueCallbackType = (
        /**
         * Dropdown list instance.
         */
        dropDownList: DropDownList,
        /**
         * New value.
         */
        value?: any,
        /**
         * Previous value.
         */
        previousValue?: any,
    ) => void;

    /**
     * Spacing config of simple list panel.
     */
    interface IListSpace {
        left?: number,
        right?: number,
        top?: number,
        bottom?: number,
        item?: number
    }

    /**
     * Spacing config of wrapped list panel.
     */
    interface IWrapListSpace {
        left?: number,
        right?: number,
        top?: number,
        bottom?: number,
        item?: number,
        line?: number
    }

    /**
     * Spacing config of scrollable list panel.
     */
    interface IScrollableListSpace extends IListSpace {
        panel?: number
    }

    /**
     * Spacing config of scrollable wrapped list panel.
     */
    interface IScrollableWrapListSpace extends IWrapListSpace {
        panel?: number
    }

    /**
     * Supported spacing config variants.
     */
    type SpaceType = IListSpace | IWrapListSpace | IScrollableListSpace | IScrollableWrapListSpace;

    /**
     * Configuration options for creating a dropdown list.
     */
    interface IConfig extends Label.IConfig {
        /**
         * Option data list.
         */
        options?: any[],
        list?: {
            createBackgroundCallback?: CreateGeneralGameObjectCallbackType;
            createButtonCallback?: CreateButtonCallbackType;

            createTrackCallback?: CreateGeneralGameObjectCallbackType;
            createThumbCallback?: CreateGeneralGameObjectCallbackType;
            scroller?: Scrollable.IScrollerConfig;
            mouseWheelScroller?: Scrollable.IMouseWheelScroller;
            sliderAdaptThumbSize?: boolean;

            onButtonClick?: OnButtonClickCallbackType;
            onButtonOver?: OnButtonOverCallbackType;
            onButtonOut?: OnButtonOutCallbackType;

            easeIn?: number;
            easeOut?: number;

            wrap?: boolean;
            maxHeight?: number;
            width?: number;
            height?: number;
            alignParent?: AlignParentType;
            alignSide?: string;
            expandDirection?: ExpandDirectionType;
            bounds?: Phaser.Geom.Rectangle;

            space?: SpaceType;

            draggable?: boolean;
        },

        setValueCallback?: SetValueCallbackType;
        setValueCallbackScope?: object;
        value?: any;
    }
}

/**
 * Label-based dropdown selector with popup list panel.
 */
declare class DropDownList extends Label {
    /**
     * Create a dropdown list component.
     *
     * @param scene - Scene that owns this component.
     * @param config - Optional component configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: DropDownList.IConfig
    );

    /**
     * True when list panel is currently opened.
     */
    readonly isOpened: boolean;

    /**
     * Current list panel instance.
     */
    listPanel: undefined | Buttons | FixWidthButtons;

    /**
     * Set option data list.
     *
     * @param options - New option list.
     * @returns This component instance.
     */
    setOptions(options: any[]): this;
    /**
     * Current option data list.
     */
    options: any[];

    /**
     * Open list panel.
     *
     * @returns This component instance.
     */
    openListPanel(): this;
    /**
     * Close list panel.
     *
     * @returns This component instance.
     */
    closeListPanel(): this;
    /**
     * Toggle list panel open state.
     *
     * @returns This component instance.
     */
    toggleListPanel(): this;

    /**
     * Set selected value.
     *
     * @param value - Value to assign.
     * @returns This component instance.
     */
    setValue(value?: any): this;
    /**
     * Current selected value.
     */
    value: any;

    /**
     * Set callback used to create option buttons.
     *
     * @param callback - Button creation callback.
     * @returns This component instance.
     */
    setCreateButtonCallback(callback?: DropDownList.CreateButtonCallbackType): this;
    /**
     * Set callback used to create list background.
     *
     * @param callback - Background creation callback.
     * @returns This component instance.
     */
    setCreateBackgroundCallback(callback?: DropDownList.CreateGeneralGameObjectCallbackType): this;
    /**
     * Set callback used to create slider track.
     *
     * @param callback - Slider track creation callback.
     * @returns This component instance.
     */
    setCreateListSliderTrackCallback(callback?: DropDownList.CreateGeneralGameObjectCallbackType): this;
    /**
     * Set callback used to create slider thumb.
     *
     * @param callback - Slider thumb creation callback.
     * @returns This component instance.
     */
    setCreateListSliderThumbCallback(callback?: DropDownList.CreateGeneralGameObjectCallbackType): this;

    /**
     * Set button-click callback.
     *
     * @param callback - Click callback.
     * @returns This component instance.
     */
    setButtonClickCallback(callback?: DropDownList.OnButtonClickCallbackType): this;
    /**
     * Set button-over callback.
     *
     * @param callback - Over callback.
     * @returns This component instance.
     */
    setButtonOverCallback(callback?: DropDownList.OnButtonOverCallbackType): this;
    /**
     * Set button-out callback.
     *
     * @param callback - Out callback.
     * @returns This component instance.
     */
    setButtonOutCallback(callback?: DropDownList.OnButtonOutCallbackType): this;

    /**
     * Set list ease-in duration.
     *
     * @param duration - Duration in milliseconds.
     * @returns This component instance.
     */
    setListEaseInDuration(duration?: number): this;
    /**
     * Set list ease-out duration.
     *
     * @param duration - Duration in milliseconds.
     * @returns This component instance.
     */
    setListEaseOutDuration(duration?: number): this;

    /**
     * Enable or disable wrapped layout.
     *
     * @param enable - True to enable wrap layout.
     * @returns This component instance.
     */
    setWrapEnable(enable?: boolean): this;
    /**
     * Set list panel width.
     *
     * @param width - Width value.
     * @returns This component instance.
     */
    setListWidth(width?: number): this;
    /**
     * Set list panel height.
     *
     * @param height - Height value.
     * @returns This component instance.
     */
    setListHeight(height?: number): this;
    /**
     * Set list panel size.
     *
     * @param width - Width value.
     * @param height - Height value.
     * @returns This component instance.
     */
    setListSize(
        width?: number,
        height?: number
    ): this;

    /**
     * Set list alignment parent mode.
     *
     * @param mode - Alignment parent mode.
     * @returns This component instance.
     */
    setListAlignmentMode(mode?: DropDownList.AlignParentType): this;
    /**
     * Set list alignment side.
     *
     * @param side - Alignment side name.
     * @returns This component instance.
     */
    setListAlignmentSide(side?: string): this;
    /**
     * Set list placement bounds.
     *
     * @param bounds - Bounds rectangle.
     * @returns This component instance.
     */
    setListBounds(bounds: Phaser.Geom.Rectangle): this;

    /**
     * Set list spacing configuration.
     *
     * @param space - Spacing config.
     * @returns This component instance.
     */
    setListSpace(space?: DropDownList.SpaceType): this;

    /**
     * Enable or disable dragging list panel.
     *
     * @param enable - True to enable dragging.
     * @returns This component instance.
     */
    setListDraggable(enable?: boolean): this;

    /**
     * Emit button-click by index.
     *
     * @param index - Button index.
     * @returns This component instance.
     */
    emitButtonClick(index: number): this;

    /**
     * Emit button-over by index.
     *
     * @param index - Button index.
     * @returns This component instance.
     */
    emitButtonOver(index: number): this;
    /**
     * Current hovered button index.
     */
    currentOverIndex: number;

    /**
     * Focus next button.
     *
     * @returns This component instance.
     */
    focusNextButton(): this;
    /**
     * Focus previous button.
     *
     * @returns This component instance.
     */
    focusPrevButton(): this;

}
