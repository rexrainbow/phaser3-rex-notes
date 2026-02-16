import BaseSizer from '../basesizer/BaseSizer';
import Sizer from '../sizer/Sizer';
import RoundRectangle from '../roundrectangle/RoundRectangle';
import CreateBackground from '../utils/build/CreateBackground';
import SimpleLabel from '../simplelabel/SimpleLabel';
import Buttons from '../buttons/Buttons';
import FixWidthButtons from '../fixwidthbuttons/FixWidthButtons';
import Pages from '../pages/Pages';
import SplitPanels from '../splitpanels/SplitPanels';
import InputText from '../canvasinput/CanvasInput';
import InputTextArea from '../textareainput/TextAreaInput';
import Checkbox from '../checkbox/Checkbox';
import ToggleSwitch from '../toggleswitch/ToggleSwitch';
import ColorInput from '../colorinput/colorinput/ColorInput';
import GridTable from '../gridtable/GridTable';

export default Tweaker;

declare namespace Tweaker {
    /**
     * Configuration options for interactive round-rectangle background.
     */
    interface IInteractiveRoundRectangleConfig extends RoundRectangle.IConfig {
        /** Fill color when the control is active. */
        'active.color'?: number,
        /** Fill alpha when the control is active. */
        'active.alpha'?: number,

        /** Stroke color when the control is active. */
        'active.strokeColor'?: number,
        /** Stroke alpha when the control is active. */
        'active.strokeAlpha'?: number,
        /** Stroke width when the control is active. */
        'active.strokeWidth'?: number,
    }

    /**
     * Label config with interactive background support.
     */
    interface IInteractiveLabelConfig extends SimpleLabel.IConfig {
        /** Interactive background style of the label. */
        background?: IInteractiveRoundRectangleConfig,
    }

    /**
     * Button style configuration.
     */
    interface IButtonConfig extends IInteractiveLabelConfig {
        /** Set to true to expand button size in layout. */
        expand?: boolean,
    }

    /**
     * Increment/decrement control configuration.
     */
    interface IIncDecConfig {
        /** Style for the increment button. */
        incButton?: SimpleLabel.IConfig,
        /** Style for the decrement button. */
        decButton?: SimpleLabel.IConfig,
        /** Index of input text element in the inc/dec row. */
        inputTextIndex?: 0 | 1 | 2
    }

    /**
     * Folder title style configuration.
     */
    interface IFolderTitleConfig extends SimpleLabel.IConfig {
        /** Expanded-state icon style for folder titles. */
        expandedIcon?: {
            /** Fill color of the expanded icon. */
            color?: number,
            /** Fill alpha of the expanded icon. */
            alpha?: number,

            /** Stroke color of the expanded icon. */
            strokeColor?: number,
            /** Stroke alpha of the expanded icon. */
            strokeAlpha?: number,
            /** Stroke width of the expanded icon. */
            strokeWidth?: number,
            /** Set to true to render only the arrow glyph. */
            arrowOnly?: boolean,

            /** Tween duration for expand/collapse icon transition. */
            easeDuration?: number,
        }
    }

    /**
     * Input row style configuration.
     */
    interface IInputRowStyle {
        /** Fixed width of the input row. */
        width?: number,
        /** Fixed height of the input row. */
        height?: number,

        /**
         * Row layout orientation.
         */
        orientation?: 0 | 1 | 'x' | 'y',

        /** True to enable right-to-left layout. */
        rtl?: boolean,

        /**
         * Spacing configuration for the input row.
         */
        space?: {
            /** Left space. */
            left?: number,
            /** Right space. */
            right?: number,
            /** Top space. */
            top?: number,
            /** Bottom space. */
            bottom?: number,
            /** Space between title and input field. */
            title?: number,
            /** Space between items. */
            item?: number,
        },

        /** Background style of each input row. */
        background?: CreateBackground.IConfig,

        /** Title label style of each input row. */
        title?: SimpleLabel.IConfig,

        /** Single-line text input style. */
        inputText?: InputText.IConfig,
        /** Alias of inputText for numeric inputs. */
        inputNumber?: InputText.IConfig,

        /** Multi-line text input style. */
        inputTextArea?: InputTextArea.IConfig,

        /** Slider style used by range-like inputs. */
        slider?: {
            /** Slider track style. */
            track: RoundRectangle.IConfig,
            /** Slider indicator style. */
            indicator: RoundRectangle.IConfig,
            /** Slider thumb style. */
            thumb: RoundRectangle.IConfig,
        },

        /** List selector style. */
        list?: {
            /** List label style. */
            label?: SimpleLabel.IConfig,

            /** List item button style. */
            button?: IInteractiveLabelConfig,
        },

        /** Action button style. */
        button?: IButtonConfig,

        /** Checkbox style. */
        checkbox?: Checkbox.IConfig,

        /** Toggle switch style. */
        toggleSwitch?: ToggleSwitch.IConfig,

        /** Color input style. */
        colorInput?: ColorInput.IConfig,

        /** Increment/decrement control style. */
        incDec?: IIncDecConfig,

        /** Proportion settings for row sections. */
        proportion?: {
            /** Proportion of title section. */
            title?: number,
            /** Proportion of input field section. */
            inputField?: number,
            /** Proportion settings inside range section. */
            range?: {
                /** Proportion of slider inside range section. */
                slider?: number,
                /** Proportion of input text inside range section. */
                inputText?: number,
            }
        }
    }

    /**
     * Option item configuration for list-like inputs.
     */
    interface IOptionConfig extends SimpleLabel.IResetDisplayContentConfig {
        /** Backing value represented by this option. */
        value: any
    }

    /**
     * Root style configuration of tweaker.
     */
    interface IStyle {
        /** Default width of each item row. */
        itemWidth?: number,
        /** Default height of each item row. */
        itemHeight?: number,

        /** Root background style. */
        background?: CreateBackground.IConfig,

        /** Shared style for input rows. */
        inputRow?: IInputRowStyle,

        /** Folder container style. */
        folder?: {
            /** Folder title style. */
            title?: SimpleLabel.IConfig,

            /** Folder background style. */
            background?: CreateBackground.IConfig,

            /** Spacing around folder content. */
            space?: {
                left?: number,
                right?: number,
                top?: number,
                bottom?: number,
                item?: number
            },
        },

        /** Tab container style. */
        tab?: {
            /** Style of each tab button. */
            tab?: IInteractiveLabelConfig,

            /** Set to true to wrap tabs across lines. */
            wrapTabs?: boolean,
            /** Tabs button group style. */
            tabs?: Buttons.IConfig | FixWidthButtons.IConfig,
            /** Tab pages style. */
            pages?: Pages.IConfig,
        },

        /** Columns container style. */
        columns?: {
            /** Optional columns title style. */
            title?: SimpleLabel.IConfig,

            /** Columns background style. */
            background?: CreateBackground.IConfig,

            /** Spacing around columns layout. */
            space?: {
                left?: number,
                right?: number,
                top?: number,
                bottom?: number,
                column?: number,
                title?: number,
            }
        },

        /** Split panels container style. */
        '2columns'?: {
            /** Optional title style. */
            title?: SimpleLabel.IConfig,

            /** Split panels background style. */
            background?: CreateBackground.IConfig,

            /** Splitter style. */
            splitter?: CreateBackground.IConfig,

            /** Spacing configuration for split panels. */
            space?: SplitPanels.IConfig['space'],
        },

        /** Wrap container style. */
        wrap?: {
            /** Default item width in wrap container. */
            itemWidth?: number,

            /** Optional wrap title style. */
            title?: SimpleLabel.IConfig,

            /** Wrap background style per section or shared. */
            background?: CreateBackground.IConfig | CreateBackground.IConfig[],

            /** Spacing around wrap layout. */
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

        /** Scrollable container style. */
        scrollable?: {
            /** Optional scrollable title style. */
            title?: SimpleLabel.IConfig,

            /** Scrollable background style. */
            background?: CreateBackground.IConfig,

            /** Vertical slider style of scrollable container. */
            slider?: {
                /** Track game object configuration. */
                track: CreateBackground.IConfig,
                /** Thumb game object configuration. */
                thumb: CreateBackground.IConfig,

                /** Set to true to hide slider when content is not scrollable. */
                hideUnscrollableSlider?: boolean,
                /** Set to true to disable dragging when content is not scrollable. */
                disableUnscrollableDrag?: boolean,
                /** Set to true to adapt thumb size to current content size. */
                adaptThumbSize?: boolean,
                /** Minimum size of the slider thumb. */
                minThumbSize?: number,
            },

            /** Additional spacing for scrollable panel. */
            space?: {
                panel?: number
            },
        },

        /** Array table container style. */
        arrayTable?: {
            /** Optional array table title style. */
            title?: SimpleLabel.IConfig,

            /** Array table background style. */
            background?: CreateBackground.IConfig,

            /** Vertical slider style of array-table container. */
            slider?: {
                /** Track game object configuration. */
                track: CreateBackground.IConfig,
                /** Thumb game object configuration. */
                thumb: CreateBackground.IConfig,

                /** Set to true to hide slider when content is not scrollable. */
                hideUnscrollableSlider?: boolean,
                /** Set to true to disable dragging when content is not scrollable. */
                disableUnscrollableDrag?: boolean,
                /** Set to true to adapt thumb size to current content size. */
                adaptThumbSize?: boolean,
                /** Minimum size of the slider thumb. */
                minThumbSize?: number,
            },

            /** Space configuration for array table. */
            space?: GridTable.IConfig['space'] & {
                cell?: {
                    left?: number,
                    right?: number,
                    top?: number,
                    bottom?: number,
                    index?: number,
                    tweaker?: number,
                    delete?: number,
                }
                button?: number,
            },

            /** Style for index label in each cell. */
            index?: SimpleLabel.IConfig,

            /** Style for add button in footer. */
            add?: SimpleLabel.IConfig,

            /** Style for clear button in footer. */
            clear?: SimpleLabel.IConfig,

            /** Style for delete button in each cell. */
            delete?: SimpleLabel.IConfig,

            /** Style for cell background. */
            cellBackground?: CreateBackground.IConfig,
        },

        /** Separator style between rows. */
        separator?: RoundRectangle.IConfig,

        /** Root container spacing. */
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
        /** Preferred style field. */
        styles: IStyle,
        /** Legacy style field. */
        style: IStyle,
    }

    /**
     * Base configuration for adding an input row.
     */
    interface TweakerCustomInputConfig { }
    interface IAddInputConfig extends TweakerCustomInputConfig {
        /** Object that owns the edited property. */
        bindingTarget?: Object,
        /** Property name on binding target. */
        bindingKey?: string,
        /** Set to true to refresh value automatically. */
        autoUpdate?: boolean,

        /**
         * Callback used to read value from binding target.
         */
        onGetValue?: (
            /** Object from which the current value is read. */
            bindingTarget: Object
        ) => unknown,
        /**
         * Callback used to write value to binding target.
         */
        onSetValue?: (
            /** Object to which the value is written. */
            bindingTarget: Object,
            /** Value to write into the binding target. */
            value: undefined
        ) => void,

        /** Input view type name. */
        view?: string,

        /** Texture key of the row icon. */
        icon?: string,
        /** Frame name of the row icon. */
        iconFrame?: string,
        /** Display size of the row icon. */
        iconSize?: number,

        /** Text shown on the row title. */
        title?: string,

        /** Orientation used by this row layout. */
        orientation?: Sizer.OrientationTypes,

        // range, incdec
        /** Minimum value for numeric inputs. */
        min?: number,
        /** Maximum value for numeric inputs. */
        max?: number,
        /** Step size for numeric inputs. */
        step?: number,

        // list, buttons
        /** Candidate options for list-like inputs. */
        options?: IOptionConfig[],

        /**
         * Callback used to format value text.
         */
        format: (
            /** Value to format for display. */
            value?: any
        ) => string,

        /** Set to true to make input text read-only. */
        inputTextReadOnly?: boolean,

        /** Set to true to monitor value changes. */
        monitor?: boolean,

        /** Optional row key for lookup. */
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
        /** Object passed to button callback. */
        bindingTarget?: Object,

        /** Texture key of the row icon. */
        icon?: string,
        /** Frame name of the row icon. */
        iconFrame?: string,
        /** Display size of the row icon. */
        iconSize?: number,

        /** Row title text. */
        title: string,

        /** Button label content. */
        label: string | SimpleLabel.IResetDisplayContentConfig,
        /**
         * Callback invoked when button is clicked.
         */
        callback: (
            /** Object passed to the callback. */
            bindingTarget: Object
        ) => void,

        /** Optional row key for lookup. */
        key?: string,
    }

    /**
     * Configuration for adding a row containing multiple action buttons.
     */
    interface IAddButtonsConfig {
        /** Object passed to each button callback. */
        bindingTarget?: Object,

        /** Texture key of the row icon. */
        icon?: string,
        /** Frame name of the row icon. */
        iconFrame?: string,
        /** Display size of the row icon. */
        iconSize?: number,

        /** Row title text. */
        title: string,

        /** Button definitions rendered in this row. */
        buttons: {
            /** Button label content. */
            label: string | SimpleLabel.IResetDisplayContentConfig,
            /**
             * Callback invoked when button is clicked.
             */
            callback: (
                /** Object passed to the callback. */
                bindingTarget: Object
            ) => void,
        }[],

        /** Set to true to wrap buttons into multiple lines. */
        wrap?: boolean,

        /** Optional row key for lookup. */
        key?: string,
    }

    /**
     * Configuration for adding tab pages.
     */
    interface IAddTabConfig {
        /** Tab page descriptors. */
        pages: {
            /** Title shown on the tab header. */
            title: string,
            /** Set to true to show this page initially. */
            show?: boolean,

            /** Optional page key for lookup. */
            key?: string,
        }[]
    }

    /**
     * Configuration for adding a collapsible folder row.
     */
    interface IAddFolderConfig {
        /** Folder title text. */
        title: string,
        /** Set to true to start expanded. */
        expanded?: boolean,

        /** Optional folder key for lookup. */
        key?: string,
    }

    /**
     * Configuration for adding a multi-column container.
     */
    interface IAddColumnsConfig {
        /** Optional title shown above columns. */
        title?: string,

        /** Column descriptors. */
        columns?: {
            /** Fixed width of the column. */
            width?: number,
            /** Set to true to allow column expansion. */
            expand?: boolean,

            /** Optional column key for lookup. */
            key?: string,
        }[]
    }

    /**
     * Configuration for adding a wrap container.
     */
    interface IAddWrapConfig {
        /** Wrap section title text. */
        title: string,
        /** Width of each wrapped item. */
        itemWidth?: number,
        /** Height of each wrapped item. */
        itemHeight?: number,

        /** Optional wrap key for lookup. */
        key?: string,
    }


    /**
     * Configuration for adding a scrollable container.
     */
    interface IAddScrollableConfig {
        /** Optional scrollable section title text. */
        title?: string,
        /** Height of the scrollable section. */
        height?: string,

        /** Optional scrollable key for lookup. */
        key?: string,
    }

    /**
     * Configuration for adding an array table.
     */
    interface IAddArrayTableConfig {
        /** Optional title shown above the array table. */
        title?: string,
        /** Optional icon texture key shown in title. */
        icon?: string,
        /** Optional icon frame name. */
        iconFrame?: string,
        /** Optional icon display size. */
        iconSize?: number,

        /** Binding target object for the array items. */
        bindingTarget?: Object,
        /** Key path to the array field on the binding target. */
        bindingKey?: string,

        /** Property descriptors for each item. */
        $properties?: RowsPropertyType[],

        /** Set to true to monitor input values. */
        monitor?: boolean,

        /** Height of array table. */
        height?: number,

        /** Background configuration of array table. */
        background?: CreateBackground.IConfig,

        /** Table configuration. */
        table?: GridTable.IConfig['table'],

        /** Slider configuration. */
        slider?: {
            track?: CreateBackground.IConfig,
            thumb?: CreateBackground.IConfig,

            hideUnscrollableSlider?: boolean,
            disableUnscrollableDrag?: boolean,
            adaptThumbSize?: boolean,
            minThumbSize?: number,
        },

        /** Space configuration. */
        space?: GridTable.IConfig['space'] & {
            cell?: {
                left?: number,
                right?: number,
                top?: number,
                bottom?: number,
                index?: number,
                tweaker?: number,
                delete?: number,
                button?: number,
            }
        },

        /**
         * Index label template or formatter.
         * Use `%1` for index and `%2` for total-count in template string.
         */
        indexLabel?: string | ((index: number, item: unknown, items: unknown[]) => string | Record<string, any>),

        /** Label content for delete button in each cell. */
        deleteLabel?: string | SimpleLabel.IResetDisplayContentConfig,

        /**
         * Label content for add button in footer.
         * Set `createDefaultItem` to null/false to hide add button.
         */
        addLabel?: string | SimpleLabel.IResetDisplayContentConfig,

        /** Label content for clear button in footer. */
        clearLabel?: string | SimpleLabel.IResetDisplayContentConfig,

        /** Set to false to hide clear button. */
        clearItems?: boolean,

        /**
         * Create a default item when adding.
         */
        createDefaultItem?: (() => unknown) | false | null,

        /**
         * Lookup key when adding to children map.
         */
        key?: string,
    }

    /**
     * Backward-compatible alias.
     */
    type IAddArrayConfig = IAddArrayTableConfig;

    /**
     * Config for single-argument addArrayTable(config).
     */
    interface IAddArrayTableBoundConfig extends IAddArrayTableConfig {
        bindingTarget: Object,
        bindingKey: string,
    }

    /**
     * Configuration for a split panel section.
     */
    interface ISplitPanelConfig {
        /** Optional panel key for lookup. */
        key?: string,
        /** Child rows inside this panel. */
        $properties?: RowsPropertyType[]
    }

    /**
     * Row configuration for split panels.
     */
    interface ISplitPanelRowConfig extends ISplitPanelConfig {
        /** Child rows inside this panel. */
        $properties: RowsPropertyType[]
    }

    /**
     * Configuration for adding a split panels container.
     */
    interface IAddSplitConfig {
        /** Optional title shown above panels. */
        title?: string,
        /** Left panel configuration. */
        left?: ISplitPanelConfig,
        /** Right panel configuration. */
        right?: ISplitPanelConfig,

        /** Split ratio between panels. */
        splitRatio?: number,
        /** Minimum width for left panel. */
        minLeftPanelWidth?: number,
        /** Minimum width for right panel. */
        minRightPanelWidth?: number,

        /** Split panels space configuration. */
        space?: SplitPanels.IConfig['space'],

        /** Background game object or config. */
        background?: Phaser.GameObjects.GameObject | CreateBackground.IConfig,
        /** Splitter game object or config. */
        splitter?: Phaser.GameObjects.GameObject | CreateBackground.IConfig,
    }

    /**
     * Result of add2Columns().
     */
    interface ISplitPanelsResult {
        left: Tweaker,
        right: Tweaker
    }

    /**
     * Declarative property row for a standard input control.
     */
    interface IAddInputRowProperty extends IAddInputConfig {
        /** Property key in declarative row definitions. */
        $key: string
    }

    /**
     * Declarative property row for a nested folder.
     */
    interface IAddFolderRowProperty extends IAddFolderConfig {
        /** Row type discriminator. */
        $type: 'folder',
        /** Optional folder-level binding target. */
        $target?: Object,
        /** Child rows inside this folder. */
        $properties: RowsPropertyType[]
    }

    /**
     * Declarative property row for tab pages.
     */
    interface IAddTabRowProperty extends IAddTabConfig {
        /** Row type discriminator. */
        $type: 'tab',
        /** Optional tab-level binding target. */
        $target?: Object,
        pages: {
            title: string,
            show?: boolean,

            key?: string,

            /** Child rows inside this tab page. */
            $properties: RowsPropertyType[]
        }[]
    }

    /**
     * Declarative property row for columns layout.
     */
    interface IAddColumnsRowProperty extends IAddColumnsConfig {
        /** Row type discriminator. */
        $type: 'columns',
        /** Optional columns-level binding target. */
        $target?: Object,
        columns: {
            width?: number,

            expand?: boolean,

            key?: string,

            /** Child rows inside this column. */
            $properties: RowsPropertyType[]
        }[]
    }

    /**
     * Declarative property row for split panels layout.
     */
    interface IAdd2ColumnsRowProperty extends IAddSplitConfig {
        /** Row type discriminator. */
        $type: '2columns',
        /** Optional split-level binding target. */
        $target?: Object,
        /** Left panel configuration. */
        left?: ISplitPanelRowConfig,
        /** Right panel configuration. */
        right?: ISplitPanelRowConfig,
    }

    /**
     * Declarative property row for wrap layout.
     */
    interface IAddWrapRowProperty extends IAddWrapConfig {
        /** Row type discriminator. */
        $type: 'wrap',
        /** Optional wrap-level binding target. */
        $target?: Object,
        /** Child rows inside this wrap container. */
        $properties: RowsPropertyType[]
    }

    /**
     * Declarative property row for scrollable layout.
     */
    interface IAddScrollableRowProperty extends IAddScrollableConfig {
        /** Row type discriminator. */
        $type: 'scrollable',
        /** Optional scrollable-level binding target. */
        $target?: Object,
        /** Child rows inside this scrollable container. */
        $properties: RowsPropertyType[]
    }

    /**
     * Declarative property row for array-table layout.
     */
    interface IAddArrayTableRowProperty extends IAddArrayTableConfig {
        /** Row type discriminator. */
        $type: 'arrayTable',
        /** Optional array-table-level binding target. */
        $target?: Object,
        /** Binding key path of array field. */
        $key: string,
    }

    /**
     * Declarative property row for a separator.
     */
    interface IAddSeparatorRowProperty {
        /** Row type discriminator. */
        $type: 'separator',
    }

    /**
     * Declarative property row for a single action button.
     */
    interface IAddButtonRowProperty extends IAddButtonConfig {
        /** Row type discriminator. */
        $type: 'button',
    }

    /**
     * Declarative property row for multiple action buttons.
     */
    interface IAddButtonsRowProperty extends IAddButtonsConfig {
        /** Row type discriminator. */
        $type: 'buttons',
    }

    /**
     * Union of all declarative row property variants.
     */
    type RowsPropertyType = IAddInputRowProperty |
        IAddFolderRowProperty | IAddTabRowProperty | IAddColumnsRowProperty | IAdd2ColumnsRowProperty | IAddWrapRowProperty | IAddScrollableRowProperty |
        IAddArrayTableRowProperty |
        IAddSeparatorRowProperty | IAddButtonRowProperty | IAddButtonsRowProperty;

    /**
     * Input config with a concrete value used by handler acceptance checks.
     */
    interface IAcceptConfig extends IAddInputConfig {
        /** Candidate input value. */
        value: unknown
    }

    /**
     * Registration config for custom input handlers.
     */
    interface IInputHandlerConfig {
        /** Name of this handler. */
        name?: string,

        /** Base UI class expected by this handler. */
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
     * True if this tweaker is the root instance.
     */
    readonly isRoot: boolean;

    /**
     * Enable or disable automatic alignment of input-row title width.
     *
     * @param enable - Set to true to align titles to the maximum title width.
     * @returns This tweaker instance.
     */
    setAlignInputRowTitleEnable(enable?: boolean): this;

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
     * @param target - Binding target object.
     * @param bindingKey - Binding key.
     * @param config - Optional input configuration.
     * @returns This tweaker instance.
     */
    addInput(
        target: Object,
        bindingKey: string,
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
     * Add 2-columns split panels and return left/right tweakers.
     *
     * @param config - Split panels configuration.
     * @returns Left/right tweaker instances.
     */
    add2Columns(
        config: Tweaker.IAddSplitConfig
    ): Tweaker.ISplitPanelsResult;

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
     * Add an array table for editing list items.
     *
     * @param target - Binding target object.
     * @param bindingKey - Binding key path.
     * @param config - Optional array table configuration.
     * @returns This tweaker instance.
     */
    addArrayTable(
        target: Object,
        bindingKey: string,
        config?: Tweaker.IAddArrayTableConfig
    ): this;

    /**
     * Add an array table for editing list items.
     *
     * @param config - Array table configuration.
     * @returns This tweaker instance.
     */
    addArrayTable(
        config: Tweaker.IAddArrayTableBoundConfig
    ): this;

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
