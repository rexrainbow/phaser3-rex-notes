// import * as Phaser from 'phaser';
import Canvas from '../../canvas/canvas/Canvas';
import Background from './bob/background/Background';
import InnerBounds from './bob/innerbounds/InnerBounds';
import { IConfigTextStyle as IConfigTextStyleBase } from './bob/char/TextStyle';
import BobBaseClass from './bob/Base';
import CharBobClass from './bob/char/CharData';
import ImageBobClass from './bob/image/ImageData';
import DrawBobClass from './bob/drawer/Drawer';
import CommandBobClass from './bob/command/Command';


export default DynamicText;

declare namespace DynamicText {

    /**
     * Padding configuration.
     */
    type PaddingTypes = number |
    {
        /**
         * Left padding.
         */
        left?: number,
        /**
         * Right padding.
         */
        right?: number,
        /**
         * Top padding.
         */
        top?: number,
        /**
         * Bottom padding.
         */
        bottom?: number
    };

    /**
     * Corner radius configuration.
     */
    type RadiusType = number | { x?: number, y?: number };

    interface IRadiusConfig {
        /**
         * Top-left radius.
         */
        tl?: RadiusType,
        /**
         * Top-right radius.
         */
        tr?: RadiusType,
        /**
         * Bottom-left radius.
         */
        bl?: RadiusType,
        /**
         * Bottom-right radius.
         */
        br?: RadiusType
    }

    interface IConfigBackground {
        /**
         * Background color.
         */
        color?: string | number | null,
        /**
         * Secondary background color.
         */
        color2?: string | number | null,
        /**
         * True for horizontal gradient.
         */
        horizontalGradient?: boolean,

        /**
         * Stroke color.
         */
        stroke?: string | number | null,
        /**
         * Stroke thickness.
         */
        strokeThickness?: number,

        /**
         * Corner radius configuration.
         */
        cornerRadius?: RadiusType | IRadiusConfig,
        /**
         * Corner iteration value.
         */
        cornerIteration?: number
    }

    interface IConfigInnerBounds {
        /**
         * Inner bounds color.
         */
        color?: string | number | null,
        /**
         * Secondary inner bounds color.
         */
        color2?: string | number | null,
        /**
         * True for horizontal gradient.
         */
        horizontalGradient?: boolean,

        /**
         * Stroke color.
         */
        stroke?: string | number | null,
        /**
         * Stroke thickness.
         */
        strokeThickness?: number,
    }

    interface IConfigTextStyle extends IConfigTextStyleBase {
    }

    interface IConfigImage {
        /**
         * Image width.
         */
        width?: number,
        /**
         * Image height.
         */
        height?: number,
        /**
         * Scale x.
         */
        scaleX?: number,
        /**
         * Scale y.
         */
        scaleY?: number,
    }

    /**
     * Horizontal alignment values.
     */
    type HAlignTypes = 0 | 'left' | 1 | 'center' | 2 | 'right' | 3 | 'justify' | 'justify-left' | 4 | 'justify-center' | 5 | 'justify-right';
    /**
     * Vertical alignment values.
     */
    type VAlignTypes = 0 | 'top' | 1 | 'center' | 2 | 'bottom';

    interface IConfigWrapBase {
        /**
         * Wrap callback or callback name.
         */
        callback?: string | Function,
        /**
         * Horizontal alignment.
         */
        hAlign?: HAlignTypes,
        /**
         * Vertical alignment.
         */
        vAlign?: VAlignTypes,
        /**
         * Justify percentage.
         */
        justifyPercentage?: number,
    }

    interface IConfigWordWrap extends IConfigWrapBase {
        padding?: {
            /**
             * Top padding.
             */
            top?: number,
            /**
             * Left padding.
             */
            left?: number,
            /**
             * Right padding.
             */
            right?: number,
            /**
             * Bottom padding.
             */
            bottom?: number,
        },
        /**
         * Ascent override.
         */
        ascent?: number,
        /**
         * Line height override.
         */
        lineHeight?: number,
        /**
         * True to use default text height.
         */
        useDefaultTextHeight?: boolean,
        /**
         * Maximum lines count.
         */
        maxLines?: number,
        /**
         * Wrap width.
         */
        wrapWidth?: number,
        /**
         * Letter spacing.
         */
        letterSpacing?: number,
        /**
         * Wrap mode.
         */
        wrapMode?: 1 | 2 | 3 | 'word' | 'char' | 'character' | 'mix',
        /**
         * True to enable character wrapping.
         */
        charWrap?: boolean
    }

    interface IConfigVerticalWrap extends IConfigWrapBase {
        padding?: {
            /**
             * Top padding.
             */
            top?: number,
            /**
             * Left padding.
             */
            left?: number,
            /**
             * Right padding.
             */
            right?: number,
            /**
             * Bottom padding.
             */
            bottom?: number,
        },
        /**
         * Line width.
         */
        lineWidth?: number,
        /**
         * Maximum lines count.
         */
        maxLines?: number,
        /**
         * Fixed child height.
         */
        fixedChildHeight?: number,
        /**
         * Characters per line.
         */
        charPerLine?: number,
        /**
         * Wrap height.
         */
        wrapHeight?: number,
        /**
         * Letter spacing.
         */
        letterSpacing?: number,
        /**
         * True to enable RTL layout.
         */
        rtl?: boolean,
    }

    type BobBase = BobBaseClass;
    type CharBob = CharBobClass;
    type ImageBob = ImageBobClass;
    type DrawBob = DrawBobClass;
    type CommandBob = CommandBobClass;
    type RenderChildTypes = CharBob | ImageBob | DrawBob;

    interface IWrapResult {
        // Common properties
        /**
         * Wrapped children.
         */
        children: BobBase[],
        lines: ({
            /**
             * Line children.
             */
            children: BobBase[],
            /**
             * Line width.
             */
            width: number,
            /**
             * Line height.
             */
            height: number
        })[],
        /**
         * True if this is the last page.
         */
        isLastPage: boolean,
        /**
         * Max lines count.
         */
        maxLines: number,
        /**
         * Padding used for wrapping.
         */
        padding: { top: number, left: number, right: number, bottom: number },
        /**
         * Letter spacing used for wrapping.
         */
        letterSpacing: number,
        /**
         * Horizontal alignment used.
         */
        hAlign: number,
        /**
         * Vertical alignment used.
         */
        vAlign: number,

        // WordWrap
        /**
         * Max line width for word wrap.
         */
        maxLineWidth: number,
        /**
         * Total lines height.
         */
        linesHeight: number,
        /**
         * Line height.
         */
        lineHeight: number,

        // VerticalWrap
        /**
         * Max line height for vertical wrap.
         */
        maxLineHeight: number,
        /**
         * Total lines width.
         */
        linesWidth: number,
        /**
         * Line width.
         */
        lineWidth: number,
    }

    interface IConfig {
        /**
         * Initial x position.
         */
        x?: number,
        /**
         * Initial y position.
         */
        y?: number,
        /**
         * Initial width.
         */
        width?: number,
        /**
         * Initial height.
         */
        height?: number,
        /**
         * Render resolution.
         */
        resolution?: number,

        /**
         * Padding configuration.
         */
        padding?: PaddingTypes,

        /**
         * Background configuration.
         */
        background?: IConfigBackground,

        /**
         * Inner bounds configuration.
         */
        innerBounds?: IConfigInnerBounds,

        /**
         * Text style configuration.
         */
        style?: IConfigTextStyle,

        /**
         * Initial text content.
         */
        text?: string,

        /**
         * Wrap configuration.
         */
        wrap?: IConfigWordWrap | IConfigVerticalWrap,

        /**
         * Test string for measurement.
         */
        testString?: string,

        /**
         * True to enable child interaction.
         */
        childrenInteractive?: boolean,
    }

}

/**
 * Dynamic text renderer with rich child elements and wrapping.
 */
declare class DynamicText extends Canvas {
    /**
     * Create a dynamic text object.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position.
     * @param y - The y position.
     * @param fixedWidth - Fixed width.
     * @param fixedHeight - Fixed height.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        fixedWidth?: number, fixedHeight?: number,
        config?: DynamicText.IConfig
    );
    /**
     * Create a dynamic text object.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position.
     * @param y - The y position.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        config?: DynamicText.IConfig
    );
    /**
     * Create a dynamic text object from config.
     * @param scene - The Scene to which this object belongs.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        config?: DynamicText.IConfig
    );

    /**
     * Background render object.
     */
    background: Background;
    /**
     * Inner bounds render object.
     */
    innerBounds: InnerBounds;
    /**
     * All child bobs.
     */
    children: DynamicText.BobBase[];
    /**
     * Last appended child list.
     */
    lastAppendedChildren: DynamicText.BobBase[];

    /**
     * Clear all content.
     * @returns This instance.
     */
    clearContent(): this;

    /**
     * Create a character child.
     * @param text - Character text.
     * @param style - Text style.
     * @returns The created char bob.
     */
    createCharChild(
        text: string,
        style?: DynamicText.IConfigTextStyle
    ): DynamicText.CharBob;
    /**
     * Create character children for a string.
     * @param text - Text content.
     * @param style - Text style.
     * @returns The created char bobs.
     */
    createCharChildren(
        text: string,
        style?: DynamicText.IConfigTextStyle
    ): DynamicText.CharBob[];
    /**
     * Set text content.
     * @param text - Text content.
     * @param style - Text style.
     * @returns This instance.
     */
    setText(
        text: string,
        style?: DynamicText.IConfigTextStyle
    ): this;
    /**
     * Append text content.
     * @param text - Text content.
     * @param style - Text style.
     * @returns This instance.
     */
    appendText(
        text: string,
        style?: DynamicText.IConfigTextStyle
    ): this;
    /**
     * Insert text content at index.
     * @param index - Insert index.
     * @param text - Text content.
     * @param style - Text style.
     * @returns This instance.
     */
    insertText(
        index: number,
        text: string,
        style?: DynamicText.IConfigTextStyle
    ): this;
    /**
     * Get text content.
     * @param activeOnly - True to use active children only.
     * @returns Text content.
     */
    getText(activeOnly?: boolean): string;
    /**
     * Reset text style to defaults.
     * @returns This instance.
     */
    resetTextStyle(): this;
    /**
     * Modify current text style.
     * @param style - Style overrides.
     * @returns This instance.
     */
    modifyTextStyle(style: DynamicText.IConfigTextStyle): this;
    /**
     * Modify default text style.
     * @param style - Style overrides.
     * @returns This instance.
     */
    modifyDefaultTextStyle(style: DynamicText.IConfigTextStyle): this;
    /**
     * Current text content.
     */
    text: string;

    /**
     * Set text offset X.
     * @param ox - Offset x.
     * @returns This instance.
     */
    setTextOX(ox: number): this;
    /**
     * Set text offset Y.
     * @param oy - Offset y.
     * @returns This instance.
     */
    setTextOY(oy: number): this;
    /**
     * Set text offsets.
     * @param ox - Offset x.
     * @param oy - Offset y.
     * @returns This instance.
     */
    setTextOXY(ox: number, oy: number): this;
    /**
     * Add to text offset X.
     * @param incX - Delta x.
     * @returns This instance.
     */
    addTextOX(incX: number): this;
    /**
     * Add to text offset Y.
     * @param incY - Delta y.
     * @returns This instance.
     */
    addTextOY(incY: number): this;
    /**
     * Add to text offsets.
     * @param incX - Delta x.
     * @param incY - Delta y.
     * @returns This instance.
     */
    addTextOXY(incX: number, incY: number): this;
    /**
     * Current text offset X.
     */
    textOX: number;
    /**
     * Current text offset Y.
     */
    textOY: number;

    /**
     * Set test string for measurements.
     * @param testString - Test string.
     * @returns This instance.
     */
    setTestString(testString: string): this;
    /**
     * Current test string.
     */
    testString: string;

    /**
     * Get a character child by index.
     * @param charIndex - Character index.
     * @param activeOnly - True to use active children only.
     * @returns The character child.
     */
    getCharChild(
        charIndex: number,
        activeOnly?: boolean
    ): DynamicText.CharBob;
    /**
     * Get a character child index.
     * @param charIndex - Character index.
     * @param activeOnly - True to use active children only.
     * @returns The character child.
     */
    getCharChildIndex(
        charIndex: number,
        activeOnly?: boolean
    ): DynamicText.CharBob;
    /**
     * Get character children.
     * @param activeOnly - True to use active children only.
     * @param out - Optional output array.
     * @returns The character children array.
     */
    getCharChildren(
        activeOnly?: boolean,
        out?: DynamicText.CharBob[]
    ): DynamicText.CharBob[]

    /**
     * Create an image child.
     * @param key - Texture key.
     * @param frame - Frame name.
     * @param config - Image configuration.
     * @returns The created image bob.
     */
    createImageChild(
        key: string, frame?: string | null,
        config?: DynamicText.IConfigImage
    ): DynamicText.ImageBob;
    /**
     * Append an image child.
     * @param key - Texture key.
     * @param frame - Frame name.
     * @param config - Image configuration.
     * @returns This instance.
     */
    appendImage(
        key: string, frame?: string | null,
        config?: DynamicText.IConfigImage
    ): this;

    /**
     * Create a drawer child.
     * @param renderCallback - Render callback.
     * @param width - Drawer width.
     * @param height - Drawer height.
     * @returns The created drawer bob.
     */
    createDrawerChild(
        renderCallback: (this: DynamicText.DrawBob) => void,
        width?: number,
        height?: number
    ): DynamicText.DrawBob;
    /**
     * Append a drawer child.
     * @param renderCallback - Render callback.
     * @param width - Drawer width.
     * @param height - Drawer height.
     * @returns This instance.
     */
    appendDrawer(
        renderCallback: (this: DynamicText.DrawBob) => void,
        width?: number,
        height?: number
    ): this;

    /**
     * Create a command child.
     * @param name - Command name.
     * @param callback - Command callback.
     * @param param - Command parameter.
     * @param scope - Callback scope.
     * @returns The created command bob.
     */
    createCommandChild(
        name: string,
        callback: (param: unknown, name: string) => any,
        param: unknown,
        scope?: Object
    ): DynamicText.CommandBob;
    /**
     * Append a command child.
     * @param name - Command name.
     * @param callback - Command callback.
     * @param param - Command parameter.
     * @param scope - Callback scope.
     * @returns This instance.
     */
    appendCommand(
        name: string,
        callback: (param: unknown, name: string) => any,
        param: unknown,
        scope?: Object
    ): this;

    /**
     * Remove a child.
     * @param child - Child to remove.
     * @returns This instance.
     */
    removeChild(child: DynamicText.BobBase): this;
    /**
     * Remove all children.
     * @returns This instance.
     */
    removeChildren(): this;
    /**
     * Remove text content by range.
     * @param index - Start index.
     * @param length - Length to remove.
     * @returns This instance.
     */
    removeText(index: number, length?: number): this;

    /**
     * Pop a child without destroying.
     * @param child - Child to pop.
     * @returns This instance.
     */
    popChild(child: DynamicText.BobBase): this;

    /**
     * Move a child to first position.
     * @param child - Child to move.
     * @returns This instance.
     */
    moveChildToFist(child: DynamicText.BobBase): this;
    /**
     * Move a child to last position.
     * @param child - Child to move.
     * @returns This instance.
     */
    moveChildToLast(child: DynamicText.BobBase): this;
    /**
     * Move a child up by one.
     * @param child - Child to move.
     * @returns This instance.
     */
    movechildUp(child: DynamicText.BobBase): this;
    /**
     * Move a child down by one.
     * @param child - Child to move.
     * @returns This instance.
     */
    movechildDown(child: DynamicText.BobBase): this;
    /**
     * Move a child above another.
     * @param child - Child to move.
     * @param baseChild - Reference child.
     * @returns This instance.
     */
    movechildAbove(
        child: DynamicText.BobBase,
        baseChild: DynamicText.BobBase
    ): this;
    /**
     * Move a child below another.
     * @param child - Child to move.
     * @param baseChild - Reference child.
     * @returns This instance.
     */
    movechildBelow(
        child: DynamicText.BobBase,
        baseChild: DynamicText.BobBase
    ): this;

    /**
     * Run word wrap.
     * @param config - Word wrap config.
     * @returns Wrap result.
     */
    runWordWrap(
        config?: DynamicText.IConfigWordWrap
    ): DynamicText.IWrapResult;

    /**
     * Run vertical wrap.
     * @param config - Vertical wrap config.
     * @returns Wrap result.
     */
    runVerticalWrap(
        config?: DynamicText.IConfigVerticalWrap
    ): DynamicText.IWrapResult;

    /**
     * Run wrapping with a config.
     * @param config - Wrap config.
     * @returns Wrap result.
     */
    runWrap(
        config?: DynamicText.IConfigWordWrap | DynamicText.IConfigVerticalWrap | DynamicText.IConfigWrapBase
    ): DynamicText.IWrapResult;

    /**
     * Set vertical alignment.
     * @param align - Vertical alignment.
     * @returns This instance.
     */
    setVAlign(align: DynamicText.VAlignTypes): this;
    /**
     * Set horizontal alignment.
     * @param align - Horizontal alignment.
     * @returns This instance.
     */
    setHAlign(align: DynamicText.HAlignTypes): this;

    /**
     * Get all children.
     * @returns Children array.
     */
    getChildren(): DynamicText.BobBase[];
    /**
     * Get last appended children.
     * @returns Children array.
     */
    getLastAppendedChildren(): DynamicText.BobBase[];
    /**
     * Get active children.
     * @returns Children array.
     */
    getActiveChildren(): DynamicText.BobBase[];

    /**
     * Set background colors and gradient.
     * @param color - Primary color.
     * @param color2 - Secondary color.
     * @param horizontalGradient - True for horizontal gradient.
     * @returns This instance.
     */
    setBackgroundColor(
        color?: string | number | null,
        color2?: string | number | null,
        horizontalGradient?: boolean
    ): this;
    /**
     * Set background stroke.
     * @param stroke - Stroke color.
     * @param strokeThickness - Stroke thickness.
     * @returns This instance.
     */
    setBackgroundStroke(
        stroke?: string | number | null,
        strokeThickness?: number,
    ): this;
    /**
     * Set background corner radius.
     * @param cornerRadius - Corner radius config.
     * @param cornerIteration - Corner iteration value.
     * @returns This instance.
     */
    setBackgroundCornerRadius(
        cornerRadius?: number |
            ({ x?: number, y?: number }) |
            DynamicText.IRadiusConfig,
        cornerIteration?: number
    ): this;

    /**
     * Set inner bounds colors and gradient.
     * @param color - Primary color.
     * @param color2 - Secondary color.
     * @param horizontalGradient - True for horizontal gradient.
     * @returns This instance.
     */
    setInnerBoundsColor(
        color?: string | number | null,
        color2?: string | number | null,
        horizontalGradient?: boolean
    ): this;
    /**
     * Set inner bounds stroke.
     * @param stroke - Stroke color.
     * @param strokeThickness - Stroke thickness.
     * @returns This instance.
     */
    setInnerBoundsStroke(
        stroke?: string | number | null,
        strokeThickness?: number,
    ): this;

    /**
     * Get nearest child to a point.
     * @param localX - Local x.
     * @param localY - Local y.
     * @returns The nearest child.
     */
    getNearestChild(
        localX: number,
        localY: number
    ): DynamicText.BobBase;

    /**
     * Get a character world position.
     * @param child - Child bob.
     * @param offsetX - Local x offset.
     * @param offsetY - Local y offset.
     * @param out - Optional output object.
     * @returns World position.
     */
    getCharWorldPosition(
        child: DynamicText.BobBase,
        offsetX?: number,
        offsetY?: number,
        out?: {
            /**
             * Output x.
             */
            x?: number,
            /**
             * Output y.
             */
            y?: number
        }
    ): { x: number, y: number };

    /**
     * Get a character world position.
     * @param child - Child bob.
     * @param out - Optional output object.
     * @returns World position.
     */
    getCharWorldPosition(
        child: DynamicText.BobBase,
        out?: {
            /**
             * Output x.
             */
            x?: number,
            /**
             * Output y.
             */
            y?: number
        }
    ): { x: number, y: number };

    /**
     * Get a character world position by index.
     * @param childIndex - Child index.
     * @param offsetX - Local x offset.
     * @param offsetY - Local y offset.
     * @param out - Optional output object.
     * @returns World position.
     */
    getCharWorldPosition(
        childIndex: number,
        offsetX?: number,
        offsetY?: number,
        out?: {
            /**
             * Output x.
             */
            x?: number,
            /**
             * Output y.
             */
            y?: number
        }
    ): { x: number, y: number };

    /**
     * Get a character world position by index.
     * @param childIndex - Child index.
     * @param out - Optional output object.
     * @returns World position.
     */
    getCharWorldPosition(
        childIndex: number,
        out?: {
            /**
             * Output x.
             */
            x?: number,
            /**
             * Output y.
             */
            y?: number
        }
    ): { x: number, y: number };

}
