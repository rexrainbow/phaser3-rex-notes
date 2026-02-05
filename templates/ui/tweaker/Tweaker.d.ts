import BaseSizer from '../basesizer/BaseSizer';
import Sizer from '../sizer/Sizer';
import RoundRectangle from '../roundrectangle/RoundRectangle';
import CreateBackground from '../utils/build/CreateBackground';
import SimpleLabel from '../simplelabel/SimpleLabel';
import Buttons from '../buttons/Buttons';
import FixWidthButtons from '../fixwidthbuttons/FixWidthButtons';
import Pages from '../pages/Pages';
import InputText from '../canvasinput/CanvasInput';
import InputTextArea from '../textareainput/TextAreaInput';
import Checkbox from '../checkbox/Checkbox';
import ToggleSwitch from '../toggleswitch/ToggleSwitch';
import ColorInput from '../colorinput/colorinput/ColorInput';

export default Tweaker;

declare namespace Tweaker {
    /**
     * Configuration options for interactive round-rectangle background.
     */
    interface IInteractiveRoundRectangleConfig extends RoundRectangle.IConfig {
        'active.color'?: number,
        'active.alpha'?: number,

        'active.strokeColor'?: number,
        'active.strokeAlpha'?: number,
        'active.strokeWidth'?: number,
    }

    /**
     * Label config with interactive background support.
     */
    interface IInteractiveLabelConfig extends SimpleLabel.IConfig {
        background?: IInteractiveRoundRectangleConfig,
    }

    /**
     * Button style configuration.
     */
    interface IButtonConfig extends IInteractiveLabelConfig {
        expand?: boolean,
    }

    /**
     * Increment/decrement control configuration.
     */
    interface IIncDecConfig {
        incButton?: SimpleLabel.IConfig,
        decButton?: SimpleLabel.IConfig,
        inputTextIndex?: 0 | 1 | 2
    }

    /**
     * Folder title style configuration.
     */
    interface IFolderTitleConfig extends SimpleLabel.IConfig {
        expandedIcon?: {
            color?: number,
            alpha?: number,

            strokeColor?: number,
            strokeAlpha?: number,
            strokeWidth?: number,
            arrowOnly?: boolean,

            easeDuration?: number,
        }
    }

    /**
     * Input row style configuration.
     */
    interface IInputRowStyle {
        background?: CreateBackground.IConfig,

        title?: SimpleLabel.IConfig,

        inputText?: InputText.IConfig,

        inputTextArea?: InputTextArea.IConfig,

        slider?: {
            track: RoundRectangle.IConfig,
            indicator: RoundRectangle.IConfig,
            thumb: RoundRectangle.IConfig,
        },

        list?: {
            label?: SimpleLabel.IConfig,

            button?: IInteractiveLabelConfig,
        },

        button?: IButtonConfig,

        checkbox?: Checkbox.IConfig,

        toggleSwitch?: ToggleSwitch.IConfig,

        colorInput?: ColorInput.IConfig,

        incDec?: IIncDecConfig,

        proportion?: {
            title?: number,
            inputField?: number,
            range?: {
                slider?: number,
                inputText?: number,
            }
        }
    }

    /**
     * Option item configuration for list-like inputs.
     */
    interface IOptionConfig extends SimpleLabel.IResetDisplayContentConfig {
        value: any
    }

    /**
     * Root style configuration of tweaker.
     */
    interface IStyle {
        itemWidth?: number,
        itemHeight?: number,

        background?: CreateBackground.IConfig,

        inputRow?: IInputRowStyle,

        folder?: {
            title?: SimpleLabel.IConfig,

            background?: CreateBackground.IConfig,

            space?: {
                left?: number,
                right?: number,
                top?: number,
                bottom?: number,
                item?: number
            },
        },

        tab?: {
            tab?: IInteractiveLabelConfig,

            wrapTabs?: boolean,
            tabs?: Buttons.IConfig | FixWidthButtons.IConfig,
            pages?: Pages.IConfig,
        },

        columns?: {
            title?: SimpleLabel.IConfig,

            background?: CreateBackground.IConfig | CreateBackground.IConfig[],

            space?: {
                left?: number,
                right?: number,
                top?: number,
                bottom?: number,
                column?: number,
                title?: number,
            }
        },

        wrap?: {
            itemWidth?: number,

            title?: SimpleLabel.IConfig,

            background?: CreateBackground.IConfig | CreateBackground.IConfig[],

            space?: {
                left?: number,
                right?: number,
                top?: number,
                bottom?: number,
                item?: number,
                line?: number,
                title?: number,
            }
        },

        scrollable?: {
            title?: SimpleLabel.IConfig,

            background?: CreateBackground.IConfig,

            slider?: {
                track: CreateBackground.IConfig,
                thumb: CreateBackground.IConfig,

                hideUnscrollableSlider?: boolean,
                disableUnscrollableDrag?: boolean,
                adaptThumbSize?: boolean,
                minThumbSize?: number,
            },

            space?: {
                panel?: number
            },
        },

        separator?: RoundRectangle.IConfig,

        space?: {
            left?: number,
            right?: number,
            top?: number,
            bottom?: number,
            item?: number
        }
    }

    /**
     * Tweaker construction options.
     */
    interface IConfig extends Sizer.IConfig {
        styles: IStyle,
        style: IStyle,
    }

    /**
     * Base configuration for adding an input row.
     */
    interface IAddInputConfig {
        bindingTarget?: Object,
        bindingKey?: string,
        autoUpdate?: boolean,

        /**
         * Callback used to read value from binding target.
         */
        onGetValue?: (
            bindingTarget: Object
        ) => unknown,
        /**
         * Callback used to write value to binding target.
         */
        onSetValue?: (
            bindingTarget: Object,
            value: undefined
        ) => void,

        view?: string,

        icon?: string,
        iconFrame?: string,
        iconSize?: number,

        title?: string,

        orientation?: Sizer.OrientationTypes,

        // range, incdec
        min?: number,
        max?: number,
        step?: number,

        // list, buttons
        options?: IOptionConfig[],

        /**
         * Callback used to format value text.
         */
        format: (
            value?: any
        ) => string,

        inputTextReadOnly?: boolean,

        monitor?: boolean,

        key?: string,

        onValidate?: (
            /**
             * New candidate value.
             */
            newValue: any,
            /**
             * Previous value.
             */
            oldValue: any,
            /**
             * Binding target object.
             */
            bindingTarget: Object,
            /**
             * Binding key.
             */
            bindingKey: string
        ) => boolean;

        onValueChange?: (
            /**
             * New value.
             */
            newValue: any,
            /**
             * Previous value.
             */
            oldValue: any,
            /**
             * Binding target object.
             */
            bindingTarget: Object,
            /**
             * Binding key.
             */
            bindingKey: string
        ) => void,
    }

    /**
     * Configuration for adding a single action button row.
     */
    interface IAddButtonConfig {
        bindingTarget?: Object,

        icon?: string,
        iconFrame?: string,
        iconSize?: number,

        title: string,

        label: string | SimpleLabel.IResetDisplayContentConfig,
        /**
         * Callback invoked when button is clicked.
         */
        callback: (
            bindingTarget: Object
        ) => void,

        key?: string,
    }

    interface IAddButtonsConfig {
        bindingTarget?: Object,

        icon?: string,
        iconFrame?: string,
        iconSize?: number,

        title: string,

        buttons: {
            label: string | SimpleLabel.IResetDisplayContentConfig,
            /**
             * Callback invoked when button is clicked.
             */
            callback: (
                bindingTarget: Object
            ) => void,
        }[],

        wrap?: boolean,

        key?: string,
    }

    interface IAddTabConfig {
        pages: {
            title: string,
            show?: boolean,

            key?: string,
        }[]
    }

    interface IAddFolderConfig {
        title: string,
        expanded?: boolean,

        key?: string,
    }

    interface IAddColumnsConfig {
        title?: string,

        columns?: {
            width?: number,
            expand?: boolean,

            key?: string,
        }[]
    }

    interface IAddWrapConfig {
        title: string,
        itemWidth?: number,
        itemHeight?: number,

        key?: string,
    }


    interface IAddScrollableConfig {
        title?: string,
        height?: string,

        key?: string,
    }

    interface IAddInputRowProperty extends IAddInputConfig {
        $key: string
    }

    interface IAddFolderRowProperty extends IAddFolderConfig {
        $type: 'folder',
        $target?: Object,
        $properties: RowsPropertyType[]
    }

    interface IAddTabRowProperty extends IAddTabConfig {
        $type: 'tab',
        $target?: Object,
        pages: {
            title: string,
            show?: boolean,

            key?: string,

            $properties: RowsPropertyType[]
        }[]
    }

    interface IAddColumnsRowProperty extends IAddColumnsConfig {
        $type: 'columns',
        $target?: Object,
        columns: {
            width?: number,

            expand?: boolean,

            key?: string,

            $properties: RowsPropertyType[]
        }[]
    }

    interface IAddWrapRowProperty extends IAddWrapConfig {
        $type: 'wrap',
        $target?: Object,
        $properties: RowsPropertyType[]
    }

    interface IAddScrollableRowProperty extends IAddScrollableConfig {
        $type: 'scrollable',
        $target?: Object,
        $properties: RowsPropertyType[]
    }

    interface IAddSeparatorRowProperty {
        $type: 'separator',
    }

    interface IAddButtonRowProperty extends IAddButtonConfig {
        $type: 'button',
    }

    interface IAddButtonsRowProperty extends IAddButtonsConfig {
        $type: 'buttons',
    }

    type RowsPropertyType = IAddInputRowProperty |
        IAddFolderRowProperty | IAddTabRowProperty | IAddColumnsRowProperty | IAddScrollableRowProperty |
        IAddSeparatorRowProperty | IAddButtonRowProperty | IAddButtonsRowProperty;

    interface IAcceptConfig extends IAddInputConfig {
        value: unknown
    }

    interface IInputHandlerConfig {
        name?: string,

        baseClass?: BaseSizer,

        /**
         * Return true if this handler accepts input config.
         */
        accept: (
            config: IAcceptConfig
        ) => boolean,

        /**
         * Build UI objects for this input handler.
         */
        build: (
            gameObject: BaseSizer,
            style: IInputRowStyle
        ) => void,

        /**
         * Setup created UI objects with input config values.
         */
        setup?: (
            gameObject: BaseSizer,
            config: IAddInputConfig,
            setDefaults: boolean
        ) => void,

        /**
         * Display value on created UI objects.
         */
        displayValue?: (
            gameObject: BaseSizer,
            value: unknown
        ) => void,

    }

}

/**
 * Dynamic form builder for editing bound object properties.
 */
declare class Tweaker extends Sizer {
    /**
     * Create a tweaker component.
     *
     * @param scene - Scene that owns this component.
     * @param config - Optional tweaker configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: Tweaker.IConfig
    );

    /**
     * Register an input handler.
     *
     * @param config - Input handler configuration.
     * @returns This tweaker instance.
     */
    registerInputHandler(
        config: Tweaker.IInputHandlerConfig
    ): this;

    /**
     * Remove an input handler by name.
     *
     * @param name - Handler name.
     * @returns This tweaker instance.
     */
    removeInputHandler(
        name: string
    ): this;

    /**
     * Add an input row bound to a target object key.
     *
     * @param object - Binding target object.
     * @param key - Binding key.
     * @param config - Optional input configuration.
     * @returns This tweaker instance.
     */
    addInput(
        object: Object,
        key: string,
        config?: Tweaker.IAddInputConfig
    ): this;

    /**
     * Add an input row from configuration.
     *
     * @param config - Optional input configuration.
     * @returns This tweaker instance.
     */
    addInput(
        config?: Tweaker.IAddInputConfig
    ): this;

    /**
     * Add a single action button row.
     *
     * @param config - Button row configuration.
     * @returns This tweaker instance.
     */
    addButton(
        config: Tweaker.IAddButtonConfig
    ): this;

    /**
     * Add a multi-buttons action row.
     *
     * @param config - Buttons row configuration.
     * @returns This tweaker instance.
     */
    addButtons(
        config: Tweaker.IAddButtonsConfig
    ): this;

    /**
     * Add a separator row.
     *
     * @returns This tweaker instance.
     */
    addSeparator(): this;

    /**
     * Add a folder row and return nested tweaker.
     *
     * @param config - Folder configuration.
     * @returns Nested tweaker instance.
     */
    addFolder(
        config: Tweaker.IAddFolderConfig
    ): Tweaker;

    /**
     * Add tab rows and return tab tweaker pages.
     *
     * @param config - Tab configuration.
     * @returns Array of tab tweaker instances.
     */
    addTab(
        config: Tweaker.IAddTabConfig
    ): Tweaker[];

    /**
     * Add columns and return column tweakers.
     *
     * @param config - Column count or columns configuration.
     * @returns Array of column tweaker instances.
     */
    addColumns(
        config: number | Tweaker.IAddColumnsConfig
    ): Tweaker[];

    /**
     * Add wrap container and return nested tweaker.
     *
     * @param config - Wrap configuration.
     * @returns Nested tweaker instance.
     */
    addWrap(
        config: Tweaker.IAddWrapConfig
    ): Tweaker;

    /**
     * Add scrollable container and return nested tweaker.
     *
     * @param config - Scrollable configuration.
     * @returns Nested tweaker instance.
     */
    addScrollable(
        config: Tweaker.IAddScrollableConfig
    ): Tweaker;

    /**
     * Add rows from declarative properties with optional target and monitor.
     *
     * @param properties - Row properties list.
     * @param target - Optional shared binding target.
     * @param monitor - Set to true to monitor target changes.
     * @returns This tweaker instance.
     */
    addRows(
        properties: Tweaker.RowsPropertyType[],
        target?: Object,
        monitor?: boolean
    ): this;

    /**
     * Add rows from declarative properties with optional monitor.
     *
     * @param properties - Row properties list.
     * @param monitor - Set to true to monitor target changes.
     * @returns This tweaker instance.
     */
    addRows(
        properties: Tweaker.RowsPropertyType[],
        monitor?: boolean
    ): this;

    /**
     * Set default binding target for subsequent rows.
     *
     * @param object - Binding target object.
     * @returns This tweaker instance.
     */
    setBindingTarget(
        object: Object
    ): this;
}
