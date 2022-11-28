import Sizer from '../sizer/Sizer';
import Buttons from '../buttons/Buttons';
import FixWidthButtons from '../fixwidthbuttons/FixWidthButtons';
import Pages from '../pages/Pages';
import InputText from '../canvasinput/CanvasInput';
import Checkbox from '../checkbox/Checkbox';
import ColorInput from '../colorinput/colorinput/ColorInput';

export default Tweaker;

declare namespace Tweaker {
    interface IRoundRectangleConfig {
        width?: number,
        height?: number,
        radius?: number | {
            tl?: (number | { x?: number, y?: number }),
            tr?: (number | { x?: number, y?: number }),
            bl?: (number | { x?: number, y?: number }),
            br?: (number | { x?: number, y?: number }),

            x?: number,
            y?: number,
        },

        color?: number,
        alpha?: number,

        strokeColor?: number,
        strokeAlpha?: number,
        strokeWidth?: number,
    }

    interface IInteractiveRoundRectangleConfig extends IRoundRectangleConfig {
        'active.color'?: number,
        'active.alpha'?: number,

        'active.strokeColor'?: number,
        'active.strokeAlpha'?: number,
        'active.strokeWidth'?: number,
    }

    interface ILabelConfig {
        background?: IRoundRectangleConfig,

        text?: Phaser.GameObjects.TextStyle,

        iconMask?: boolean,
        iconSize?: number, iconWidth?: number, iconHeight?: number,
        actionMask?: boolean,
        actionSize?: number, actionWidth?: number, actionHeight?: number,

        space?: {
            left?: number, right?: number, top?: number, bottom?: number,

            icon?: number,
            text?: number,
        },
    }

    interface IInteractiveLabelConfig extends ILabelConfig {
        background?: IInteractiveRoundRectangleConfig,
    }


    interface IConfig extends Sizer.IConfig {
        styles: {
            background?: IRoundRectangleConfig,

            inputRow?: {
                background?: IRoundRectangleConfig,

                title?: ILabelConfig,

                inputText?: InputText.IConfig,

                slider?: {
                    track: IRoundRectangleConfig,
                    indicator: IRoundRectangleConfig,
                    thumb: IRoundRectangleConfig,
                },

                list?: {
                    label?: ILabelConfig,

                    button?: IInteractiveLabelConfig,
                },

                button?: IInteractiveLabelConfig,

                checkbox?: Checkbox.IConfig,

                colorInput?: ColorInput.IConfig,

                proportion?: {
                    title?: number,
                    inputField?: number,
                    range?: {
                        slider?: number,
                        inputText?: number,
                    }
                }
            },

            folder?: {
                title?: ILabelConfig,

                background?: IRoundRectangleConfig,

                space?: {
                    left?: number, right?: number, top?: number, bottom?: number,
                    item?: number
                }
            },

            tab?: {
                tab?: IInteractiveLabelConfig,

                wrapTabs?: boolean,
                tabs?: Buttons.IConfig | FixWidthButtons.IConfig,
                pages?: Pages.IConfig,
            },

            separator?: IRoundRectangleConfig,

            space?: {
                left?: number, right?: number, top?: number, bottom?: number,
                item?: number
            }
        }
    }

    interface IAddInputConfig {
        view?: 'string' | 'number' | 'range' | 'list' | 'buttons' | 'boolean' | 'color',

        icon?: string,
        iconFrame?: string,
        iconSize?: number,

        title?: string,

        min?: number, max?: number,

        options?: {
            text: string,
            value: any
        }[],

        format: (value?: any) => string,

        inputTextReadOnly?: boolean,

        monitor?: boolean,
    }

    interface IAddButtonConfig {
        icon?: string,

        title: string,

        label: string,

        callback: () => void,
    }

    interface IAddTabConfig {
        pages: { title: string }[]
    }

    interface IAddFolderConfig {
        title: string,
        expanded?: boolean,
    }
}

declare class Tweaker extends Sizer {
    constructor(
        scene: Phaser.Scene,
        config?: Tweaker.IConfig
    );

    addInput(
        object: Object,
        key: string,
        config?: Tweaker.IAddInputConfig
    ): this;

    addButton(
        config: Tweaker.IAddButtonConfig
    ): this;

    addSeparator(): this;

    addTab(
        config: Tweaker.IAddTabConfig
    ): Tweaker[];

    addFolder(
        config: Tweaker.IAddFolderConfig
    ): Tweaker;

}