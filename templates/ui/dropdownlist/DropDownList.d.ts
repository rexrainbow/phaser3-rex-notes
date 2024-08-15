import Label from '../label/Label';
import Buttons from '../buttons/Buttons';
import FixWidthButtons from '../fixwidthbuttons/FixWidthButtons';
import Scrollable from '../utils/scrollable/Scrollable';

export default DropDownList;

declare namespace DropDownList {
    type CreateButtonCallbackType = (
        this: DropDownList,
        scene: Phaser.Scene,
        option: any,
        index: number,
        options: any[]
    ) => Phaser.GameObjects.GameObject;

    type CreateGeneralGameObjectCallbackType = (
        this: DropDownList,
        scene: Phaser.Scene,
    ) => Phaser.GameObjects.GameObject;

    type OnButtonClickCallbackType = (
        this: DropDownList,
        button: Phaser.GameObjects.GameObject,
        index: number,
        pointer: Phaser.Input.Pointer,
        event: Phaser.Types.Input.EventData
    ) => void;

    type OnButtonOverCallbackType = (
        this: DropDownList,
        button: Phaser.GameObjects.GameObject,
        index: number,
        pointer: Phaser.Input.Pointer,
        event: Phaser.Types.Input.EventData
    ) => void;

    type OnButtonOutCallbackType = (
        this: DropDownList,
        button: Phaser.GameObjects.GameObject,
        index: number,
        pointer: Phaser.Input.Pointer,
        event: Phaser.Types.Input.EventData
    ) => void;

    type AlignParentType = 'text' | 'icon' | 'label';

    type ExpandDirectionType = 0 | 1 | 'down' | 'up';

    type SetValueCallbackType = (
        dropDownList: DropDownList,
        value?: any,
        previousValue?: any,
    ) => void;

    interface IListSpace {
        left?: number, right?: number, top?: number, bottom?: number, item?: number
    }

    interface IWrapListSpace {
        left?: number, right?: number, top?: number, bottom?: number, item?: number, line?: number
    }

    interface IScrollableListSpace extends IListSpace {
        panel?: number
    }

    interface IScrollableWrapListSpace extends IWrapListSpace {
        panel?: number
    }

    type SpaceType = IListSpace | IWrapListSpace | IScrollableListSpace | IScrollableWrapListSpace;

    interface IConfig extends Label.IConfig {
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

declare class DropDownList extends Label {
    constructor(
        scene: Phaser.Scene,
        config?: DropDownList.IConfig
    );

    readonly isOpened: boolean;

    listPanel: undefined | Buttons | FixWidthButtons;

    setOptions(options: any[]): this;
    options: any[];

    openListPanel(): this;
    closeListPanel(): this;
    toggleListPanel(): this;

    setValue(value?: any): this;
    value: any;

    setCreateButtonCallback(callback?: DropDownList.CreateButtonCallbackType): this;
    setCreateBackgroundCallback(callback?: DropDownList.CreateGeneralGameObjectCallbackType): this;
    setCreateListSliderTrackCallback(callback?: DropDownList.CreateGeneralGameObjectCallbackType): this;
    setCreateListSliderThumbCallback(callback?: DropDownList.CreateGeneralGameObjectCallbackType): this;

    setButtonClickCallback(callback?: DropDownList.OnButtonClickCallbackType): this;
    setButtonOverCallback(callback?: DropDownList.OnButtonOverCallbackType): this;
    setButtonOutCallback(callback?: DropDownList.OnButtonOutCallbackType): this;

    setListEaseInDuration(duration?: number): this;
    setListEaseOutDuration(duration?: number): this;

    setWrapEnable(enable?: boolean): this;
    setListWidth(width?: number): this;
    setListHeight(height?: number): this;
    setListSize(width?: number, height?: number): this;

    setListAlignmentMode(mode?: DropDownList.AlignParentType): this;
    setListAlignmentSide(side?: string): this;
    setListBounds(bounds: Phaser.Geom.Rectangle): this;

    setListSpace(space?: DropDownList.SpaceType): this;

    setListDraggable(enable?: boolean): this;

    emitButtonClick(index: number): this;

    emitButtonOver(index: number): this;
    currentOverIndex: number;

    focusNextButton(): this;
    focusPrevButton(): this;

}