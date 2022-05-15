import Label from '../label/Label';

export default DropDownList;

declare namespace DropDownList {
    type CreateButtonCallbackType = (
        this: DropDownList,
        scene: Phaser.Scene,
        option: any,
        index: number,
        optionss: any[]
    ) => Phaser.GameObjects.GameObject;

    type CreateBackgroundCallbackType = (
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
        button: Phaser.GameObjects.GameObject,
        index: number,
        pointer: Phaser.Input.Pointer,
        event: Phaser.Types.Input.EventData
    ) => void;

    type OnButtonOutCallbackType = (
        button: Phaser.GameObjects.GameObject,
        index: number,
        pointer: Phaser.Input.Pointer,
        event: Phaser.Types.Input.EventData
    ) => void;

    type AlignParentType = 'text' | 'icon';

    type SetValueCallbackType = (
        dropDownList: DropDownList,
        value?: any,
        previousValue?: any,
    ) => void;


    interface IConfig extends Label.IConfig {
        options?: any[],
        list?: {
            createBackgroundCallback?: CreateBackgroundCallbackType;
            createButtonCallback?: CreateButtonCallbackType;

            onButtonClick?: OnButtonClickCallbackType;
            onButtonOver?: OnButtonOverCallbackType;
            onButtonOut?: OnButtonOutCallbackType;

            wrap?: boolean;
            width?: number, height?: number;
            alignParent?: AlignParentType;
            bounds?: Phaser.Geom.Rectangle;
        },

        setValueCallback?: SetValueCallbackType
        setValueCallbackScope?: object,
        value?: any;
    }
}

declare class DropDownList extends Label {
    constructor(
        scene: Phaser.Scene,
        config?: DropDownList.IConfig
    );

    setOptions(options: any[]): this;

    openListPanel(): this;
    closeListPanel(): this;
    toggleListPanel(): this;

    setValue(value?: any): this;
    value: any;

    setCreateButtonCallback(callback?: DropDownList.CreateBackgroundCallbackType): this;
    setCreateBackgroundCallback(callback?: DropDownList.CreateBackgroundCallbackType): this;

    setButtonClickCallback(callback?: DropDownList.OnButtonClickCallbackType): this;
    setButtonOverCallback(callback?: DropDownList.OnButtonOverCallbackType): this;
    setButtonOutCallback(callback?: DropDownList.OnButtonOutCallbackType): this;

    setWrapEnable(enable?: boolean): this;
    setListWidth(width?: number): this;
    setListHeight(height?: number): this;
    setListSize(
        width?: number,
        height?: number
    ): this;

    setListAlignmentMode(mode?: DropDownList.AlignParentType): this;
    setListBounds(bounds: Phaser.Geom.Rectangle): this;

    setListEaseInDuration(duration?: number): this;
    setListEaseOutDuration(duration?: number): this;

}