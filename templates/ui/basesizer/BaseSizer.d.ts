// import * as Phaser from 'phaser';
import Container from '../container/Container'; // ContainerLite
import GetBoundsConfig from '../../../plugins/utils/bounds/GetBoundsConfig';
import Anchor from '../anchor/Anchor';
import Click from '../click/Click';
import ClickOutside from '../clickoutside/ClickOutside';
import InTouching from '../intouching/InTouching';
import SetChildrenInteractive from '../utils/setchildreninteractive/SetChildrenInteractive';
import { ModalBehavoir } from '../modal/Modal';

export default BaseSizer;

declare namespace BaseSizer {
    type AlignTypes = number | 'center' | 'left' | 'right' | 'top' | 'bottom' |
        'left-top' | 'left-center' | 'left-bottom' |
        'center-top' | 'center-center' | 'center-bottom' |
        'right-top' | 'right-center' | 'right-bottom';

    type PaddingTypes = GetBoundsConfig.PaddingConfigType;

    interface IConfig {
        space?: {
            /**
             * Left space.
             */
            left?: number,
            /**
             * Right space.
             */
            right?: number,
            /**
             * Top space.
             */
            top?: number,
            /**
             * Bottom space.
             */
            bottom?: number,
        },

        /**
         * Anchor configuration.
         */
        anchor?: Anchor.IConfig,

        /**
         * Origin applied to both axes.
         */
        origin?: number,
        /**
         * Origin x value.
         */
        originX?: number,
        /**
         * Origin y value.
         */
        originY?: number,

        /**
         * Optional name for this sizer.
         */
        name?: string,

        /**
         * True to enable layer support.
         */
        enableLayer?: boolean,

        /**
         * Draggable config or target key/object.
         */
        draggable?: boolean | string | Phaser.GameObjects.GameObject,

        /**
         * True to emit sizer events.
         */
        sizerEvents?: boolean,
    }

    type PrevState = {
        /**
         * Previous x position.
         */
        x: number,
        /**
         * Previous y position.
         */
        y: number,
        /**
         * Previous width.
         */
        width: number,
        /**
         * Previous height.
         */
        height: number,
        /**
         * Previous display width.
         */
        displayWidth: number,
        /**
         * Previous display height.
         */
        displayHeight: number,
        /**
         * Previous scale x.
         */
        scaleX: number,
        /**
         * Previous scale y.
         */
        scaleY: number
    }

    interface IDrawBoundsConfig {
        /**
        * Line color.
        */
        color?: number,
        /**
         * Line width.
         */
        lineWidth?: number,
        /**
         * Name label config or enabled flag.
         */
        name?: boolean |
        {
            /**
             * Create label text object.
             */
            createTextCallback: (scene: Phaser.Scene) => Phaser.GameObjects.GameObject,
            /**
             * Callback scope for createTextCallback.
             */
            createTextCallbackScope?: object,
            /**
             * Label alignment.
             */
            align?: BaseSizer.AlignTypes
        }
    }

    interface IAnchorConfig {
        /**
         * Left anchor target.
         */
        left?: string,
        /**
         * Right anchor target.
         */
        right?: string,
        /**
         * Center X anchor target.
         */
        centerX?: string,
        /**
         * X anchor target.
         */
        x?: string,
        /**
         * Top anchor target.
         */
        top?: string,
        /**
         * Bottom anchor target.
         */
        bottom?: string,
        /**
         * Center Y anchor target.
         */
        centerY?: string,
        /**
         * Y anchor target.
         */
        y?: string
    }

    interface IDraggableConfig {
        /**
         * Sensor object, key, or boolean to enable sensor.
         */
        sensor?: boolean | string | Phaser.GameObjects.GameObject,
        /**
         * Target game object to drag.
         */
        target?: Phaser.GameObjects.GameObject,
        /**
         * True to enable dragging.
         */
        draggable?: boolean,
    }

    interface IPadding {
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
    }

    /**
     * Click callback signature.
     * @param click - Click component instance.
     * @param gameObject - Target game object.
     * @param pointer - Input pointer.
     * @param event - Input event data.
     */
    type OnClickCallbackType = (
        click: Click,
        gameObject: Phaser.GameObjects.GameObject,
        pointer: Phaser.Input.Pointer,
        event: Phaser.Types.Input.EventData
    ) => void

    /**
     * Click-outside callback signature.
     * @param clickOutside - ClickOutside component instance.
     * @param gameObject - Target game object.
     * @param pointer - Input pointer.
     */
    type OnClickOutsideCallbackType = (
        clickOutside: ClickOutside,
        gameObject: Phaser.GameObjects.GameObject,
        pointer: Phaser.Input.Pointer
    ) => void;

    /**
     * Touching callback signature.
     * @param inTouch - InTouching component instance.
     * @param gameObject - Target game object.
     * @param pointer - Input pointer.
     */
    type OnTouchingCallbackType = (
        inTouch: InTouching,
        gameObject: Phaser.GameObjects.GameObject,
        pointer: Phaser.Input.Pointer,
    ) => void;

    /**
     * Touching end callback signature.
     * @param inTouch - InTouching component instance.
     * @param gameObject - Target game object.
     * @param pointer - Input pointer.
     */
    type OnTouchingEndCallbackType = (
        inTouch: InTouching,
        gameObject: Phaser.GameObjects.GameObject,
        pointer: Phaser.Input.Pointer,
    ) => void;

    /**
     * Pointer over callback signature.
     * @param pointer - Input pointer.
     * @param localX - Local x position.
     * @param localY - Local y position.
     * @param event - Input event data.
     */
    type OnOverCallbackType = (
        pointer: Phaser.Input.Pointer,
        localX: number,
        localY: number,
        event: Phaser.Types.Input.EventData
    ) => void;

    /**
     * Pointer out callback signature.
     * @param pointer - Input pointer.
     * @param event - Input event data.
     */
    type OnOutCallbackType = (
        pointer: Phaser.Input.Pointer,
        event: Phaser.Types.Input.EventData
    ) => void

    /**
     * Modal close callback signature.
     * @param data - Close event payload.
     */
    type OnModalCloseCallbackType = (
        data: Object
    ) => void;

}

/**
 * Base class for rexUI sizers with layout and interaction helpers.
 * @remarks Provides layout, alignment, and input behaviors for child objects.
 */
declare class BaseSizer extends Container {
    /**
     * Type flag for rex sizers.
     */
    isRexSizer: true;

    /**
     * Named spacing values used by this sizer.
     */
    space: { [name: string]: number };

    /**
     * Create a BaseSizer instance.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position of the sizer.
     * @param y - The y position of the sizer.
     * @param minWidth - Minimum width of the sizer.
     * @param minHeight - Minimum height of the sizer.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        minWidth?: number, minHeight?: number,
        config?: BaseSizer.IConfig
    );

    /**
     * Set minimum width and height.
     * @param minWidth - Minimum width.
     * @param minHeight - Minimum height.
     * @returns This instance.
     */
    setMinSize(minWidth: number, minHeight: number): this;

    /**
     * Set minimum width.
     * @param minWidth - Minimum width.
     * @returns This instance.
     */
    setMinWidth(minWidth: number): this;

    /**
     * Set minimum height.
     * @param minHeight - Minimum height.
     * @returns This instance.
     */
    setMinHeight(minHeight: number): this;

    /**
     * Minimum width value.
     */
    minWidth: number;
    /**
     * Minimum height value.
     */
    minHeight: number;

    /**
     * Mark this sizer as dirty or clean.
     * @remarks Dirty elements skip layout() and default to true unless changed manually.
     * @param dirty - True to mark dirty, false to mark clean.
     * @returns This instance.
     */
    setDirty(dirty?: boolean): this;

    /**
     * Enable or disable sizer events.
     * @param enable - True to enable.
     * @returns This instance.
     */
    setSizerEventsEnable(enable?: boolean): this;
    /**
     * True if sizer events are enabled.
     */
    sizerEventsEnable: boolean;

    /**
     * Left edge position.
     */
    left: number;

    /**
     * Align left edge to a value.
     * @param value - Target left value.
     * @returns This instance.
     */
    alignLeft(value: number): this;

    /**
     * Right edge position.
     */
    right: number;

    /**
     * Align right edge to a value.
     * @param value - Target right value.
     * @returns This instance.
     */
    alignRight(value: number): this;

    /**
     * Horizontal center position.
     */
    centerX: number;

    /**
     * Align horizontal center to a value.
     * @param value - Target center x value.
     * @returns This instance.
     */
    alignCenterX(value: number): this;

    /**
     * Top edge position.
     */
    top: number;

    /**
     * Align top edge to a value.
     * @param value - Target top value.
     * @returns This instance.
     */
    alignTop(value: number): this;

    /**
     * Bottom edge position.
     */
    bottom: number;

    /**
     * Align bottom edge to a value.
     * @param value - Target bottom value.
     * @returns This instance.
     */
    alignBottom(value: number): this;

    /**
     * Vertical center position.
     */
    centerY: number;

    /**
     * Align vertical center to a value.
     * @param value - Target center y value.
     * @returns This instance.
     */
    alignCenterY(value: number): this;

    /**
     * Clamp the sizer within bounds.
     * @param bounds - The bounds to clamp to.
     * @returns This instance.
     */
    pushIntoBounds(
        bounds?: Phaser.Geom.Rectangle | BaseSizer.IPadding
    ): this;

    /**
     * Inner left edge after padding.
     */
    readonly innerLeft: number;

    /**
     * Inner right edge after padding.
     */
    readonly innerRight: number;

    /**
     * Inner top edge after padding.
     */
    readonly innerTop: number;

    /**
     * Inner bottom edge after padding.
     */
    readonly innerBottom: number;

    /**
     * Inner width after padding.
     */
    readonly innerWidth: number;

    /**
     * Inner height after padding.
     */
    readonly innerHeight: number;

    /**
     * Minimum inner width after padding.
     */
    readonly minInnerWidth: number;

    /**
     * Minimum inner height after padding.
     */
    readonly minInnerHeight: number;

    /**
     * Add a background game object.
     * @param gameObject - Background object to add.
     * @param padding - Padding applied to the background.
     * @param childKey - Optional key to register the background.
     * @returns This instance.
     */
    addBackground(
        gameObject: Phaser.GameObjects.GameObject,
        padding?: BaseSizer.PaddingTypes,
        childKey?: string
    ): this;

    /**
     * Check if a game object is a background.
     * @param gameObject - The game object to check.
     * @returns True if the object is a background.
     */
    isBackground(
        gameObject: Phaser.GameObjects.GameObject
    ): boolean;

    /**
     * Perform layout on this sizer.
     * @returns This instance.
     */
    layout(): this;

    /**
     * Enable or disable layout warnings.
     * @param enable - True to enable warnings.
     * @returns This instance.
     */
    enableLayoutWarn(enable?: boolean): this;

    /**
     * Draw bounds using a Graphics object.
     * @param graphics - The Graphics object to draw to.
     * @param color - Line color.
     * @returns This instance.
     */
    drawBounds(
        graphics: Phaser.GameObjects.Graphics,
        color?: number
    ): this;

    /**
     * Draw bounds using a Graphics object with options.
     * @param graphics - The Graphics object to draw to.
     * @param config - Draw options.
     * @returns This instance.
     */
    drawBounds(
        graphics: Phaser.GameObjects.Graphics,
        config?: BaseSizer.IDrawBoundsConfig
    ): this;

    /**
     * Mapping of named children.
     */
    childrenMap: { [key: string]: Phaser.GameObjects.GameObject };

    /**
     * Add a child to the named map.
     * @param key - Name to register.
     * @param gameObject - The child to register.
     * @returns This instance.
     */
    addChildrenMap(
        key: string,
        gameObject: Phaser.GameObjects.GameObject
    ): this;

    /**
     * Add multiple named children at once.
     * @param config - Key to game object map.
     * @returns This instance.
     */
    addChildrenMap(
        config: { [key: string]: Phaser.GameObjects.GameObject }
    ): this;

    /**
     * Remove this sizer from its parent sizer.
     * @returns This instance.
     */
    removeFromParentSizer(): this;

    /**
     * Remove a background object.
     * @param gameObject - The background to remove.
     * @param destroyChild - True to destroy the background.
     * @returns This instance.
     */
    removeBackground(
        gameObject: Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    /**
     * Remove all background objects.
     * @param destroyChild - True to destroy removed backgrounds.
     * @returns This instance.
     */
    removeAllBackgrounds(destroyChild?: boolean): this;

    /**
     * Callback used when removing a child.
     * @param gameObject - The child being removed.
     * @param destroyChild - True to destroy the child.
     * @returns This instance.
     */
    removeChildCallback(
        gameObject: Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    /**
     * Remove a named child from the map.
     * @param key - Name of the child to remove.
     * @returns This instance.
     */
    removeChildrenMap(key: string): this;
    /**
     * Remove a child from the map by object.
     * @param gameObject - The child to remove.
     * @returns This instance.
     */
    removeChildrenMap(gameObject: Phaser.GameObjects.GameObject): this;

    /**
     * Get a child or children by name.
     * @param name - The name to search for.
     * @param recursive - True to search recursively.
     * @returns The matched child, children array, map, or null.
     */
    getElement(
        name: string,
        recursive?: boolean
    ): Phaser.GameObjects.GameObject |
        Phaser.GameObjects.GameObject[] |
        { [name: string]: Phaser.GameObjects.GameObject } |
        null;

    /**
     * Get a child index or key.
     * @param child - The child to look up.
     * @returns The index, key, or null.
     */
    getChildIndex(
        child: Phaser.GameObjects.GameObject
    ): number | string | null;

    /**
     * Get parent sizer by name.
     * @param name - Optional parent name to match.
     * @returns The matched parent sizer or null.
     */
    getParentSizer(
        name?: string
    ): BaseSizer | null;

    /**
     * Get parent sizer of a game object.
     * @param gameObject - The child game object.
     * @param name - Optional parent name to match.
     * @returns The matched parent sizer or null.
     */
    getParentSizer(
        gameObject?: Phaser.GameObjects.GameObject,
        name?: string
    ): BaseSizer | null;

    /**
     * Get the topmost sizer for a game object.
     * @param gameObject - The child game object.
     * @returns The topmost sizer or null.
     */
    getTopmostSizer(
        gameObject?: Phaser.GameObjects.GameObject
    ): BaseSizer | null;

    /**
     * Check if a game object has a parent sizer.
     * @param parentGameObject - The parent candidate.
     * @param gameObject - The child to check.
     * @returns True if the parent relationship exists.
     */
    hasParentSizer(
        parentGameObject: Phaser.GameObjects.GameObject,
        gameObject?: Phaser.GameObjects.GameObject
    ): boolean;

    /**
     * Check if a game object is a child of another.
     * @param childGameObject - The child candidate.
     * @param gameObject - The parent to check.
     * @returns True if the child relationship exists.
     */
    hasChild(
        childGameObject: Phaser.GameObjects.GameObject,
        gameObject?: Phaser.GameObjects.GameObject
    ): boolean;

    /**
     * Get the sizer configuration for a child.
     * @param gameObject - The child to query.
     * @returns The sizer configuration object.
     */
    getSizerConfig(
        gameObject?: Phaser.GameObjects.GameObject
    ): { [name: string]: any };

    /**
     * Get the previous state for a child.
     * @param gameObject - The child to query.
     * @returns The previous state snapshot.
     */
    getChildPrevState(
        gameObject: Phaser.GameObjects.GameObject
    ): BaseSizer.PrevState;

    /**
     * Check if any touch is active on this sizer.
     * @returns True if in touching state.
     */
    isInTouching(): boolean;

    /**
     * Check if a pointer is touching this sizer or a child.
     * @param pointer - The input pointer.
     * @param gameObject - Optional child or name to test.
     * @returns True if in touching state.
     */
    isInTouching(
        pointer: Phaser.Input.Pointer,
        gameObject?: Phaser.GameObjects.GameObject | string
    ): boolean;

    /**
     * Check if any pointer is touching this sizer or a child.
     * @param gameObject - Optional child or name to test.
     * @returns True if in touching state.
     */
    isInTouching(
        gameObject?: Phaser.GameObjects.GameObject | string
    ): boolean;


    /**
     * Move from a position over time.
     * @param duration - Duration in ms.
     * @param x - Start x.
     * @param y - Start y.
     * @param ease - Easing name.
     * @returns This instance.
     */
    moveFrom(
        duration: number,
        x: number,
        y: number,
        ease?: string
    ): this;

    /**
     * Move from a position using a config object.
     * @param config - Move configuration.
     * @returns This instance.
     */
    moveFrom(
        config: {
            x: number,
            y: number,
            speed?: number,
            duration?: number,
            ease?: string,
        }
    ): this;

    /**
     * Move from a position and return a promise.
     * @param duration - Duration in ms.
     * @param x - Start x.
     * @param y - Start y.
     * @param ease - Easing name.
     * @returns A promise that resolves when complete.
     */
    moveFromPromise(
        duration: number,
        x: number,
        y: number,
        ease?: string
    ): Promise<any>;

    /**
     * Move from a position using a config object and return a promise.
     * @param config - Move configuration.
     * @returns A promise that resolves when complete.
     */
    moveFromPromise(
        config: {
            x: number,
            y: number,
            speed?: number,
            duration?: number,
            ease?: string,
        }
    ): Promise<any>;

    /**
     * Move from a position then destroy on completion.
     * @param duration - Duration in ms.
     * @param x - Start x.
     * @param y - Start y.
     * @param ease - Easing name.
     * @returns This instance.
     */
    moveFromDestroy(
        duration: number,
        x: number,
        y: number,
        ease?: string
    ): this;

    /**
     * Move from a position using config, then destroy on completion.
     * @param config - Move configuration.
     * @returns This instance.
     */
    moveFromDestroy(
        config: {
            x: number,
            y: number,
            speed?: number,
            duration?: number,
            ease?: string,
        }
    ): this;

    /**
     * Move from a position then destroy and return a promise.
     * @param duration - Duration in ms.
     * @param x - Start x.
     * @param y - Start y.
     * @param ease - Easing name.
     * @returns A promise that resolves when complete.
     */
    moveFromDestroyPromise(
        duration: number,
        x: number,
        y: number,
        ease?: string
    ): Promise<any>;

    /**
     * Move from a position using config, then destroy and return a promise.
     * @param config - Move configuration.
     * @returns A promise that resolves when complete.
     */
    moveFromDestroyPromise(
        config: {
            x: number,
            y: number,
            speed?: number,
            duration?: number,
            ease?: string,
        }
    ): Promise<any>;

    /**
     * Check if move-from is running.
     * @returns True if move-from is active.
     */
    isRunningMoveFrom(): boolean;

    /**
     * Move to a position over time.
     * @param duration - Duration in ms.
     * @param x - Target x.
     * @param y - Target y.
     * @param ease - Easing name.
     * @returns This instance.
     */
    moveTo(
        duration: number,
        x: number,
        y: number,
        ease?: string
    ): this;

    /**
     * Move to a position using a config object.
     * @param config - Move configuration.
     * @returns This instance.
     */
    moveTo(
        config: {
            x: number,
            y: number,
            speed?: number,
            duration?: number,
            ease?: string,
        }
    ): this;

    /**
     * Move to a position and return a promise.
     * @param duration - Duration in ms.
     * @param x - Target x.
     * @param y - Target y.
     * @param ease - Easing name.
     * @returns A promise that resolves when complete.
     */
    moveToPromise(
        duration: number,
        x: number,
        y: number,
        ease?: string
    ): Promise<any>;

    /**
     * Move to a position using config and return a promise.
     * @param config - Move configuration.
     * @returns A promise that resolves when complete.
     */
    moveToPromise(
        config: {
            x: number,
            y: number,
            speed?: number,
            duration?: number,
            ease?: string,
        }
    ): Promise<any>;

    /**
     * Move to a position then destroy on completion.
     * @param duration - Duration in ms.
     * @param x - Target x.
     * @param y - Target y.
     * @param ease - Easing name.
     * @returns This instance.
     */
    moveToDestroy(
        duration: number,
        x: number,
        y: number,
        ease?: string
    ): this;

    /**
     * Move to a position using config, then destroy on completion.
     * @param config - Move configuration.
     * @returns This instance.
     */
    moveToDestroy(
        config: {
            x: number,
            y: number,
            speed?: number,
            duration?: number,
            ease?: string,
        }
    ): this;

    /**
     * Move to a position then destroy and return a promise.
     * @param duration - Duration in ms.
     * @param x - Target x.
     * @param y - Target y.
     * @param ease - Easing name.
     * @returns A promise that resolves when complete.
     */
    moveToDestroyPromise(
        duration: number,
        x: number,
        y: number,
        ease?: string
    ): Promise<any>;

    /**
     * Move to a position using config, then destroy and return a promise.
     * @param config - Move configuration.
     * @returns A promise that resolves when complete.
     */
    moveToDestroyPromise(
        config: {
            x: number,
            y: number,
            speed?: number,
            duration?: number,
            ease?: string,
        }
    ): Promise<any>;

    /**
     * Check if move-to is running.
     * @returns True if move-to is active.
     */
    isRunningMoveTo(): boolean;

    /**
     * Check if any move easing is running.
     * @returns True if move easing is active.
     */
    isRunningEaseMove(): boolean;

    /**
     * Stop move easing.
     * @param toEnd - True to jump to the end.
     * @returns This instance.
     */
    moveStop(toEnd?: boolean): this;

    /**
     * Fade in over time.
     * @param duration - Duration in ms.
     * @param alpha - Target alpha.
     * @returns This instance.
     */
    fadeIn(
        duration: number,
        alpha?: number
    ): this;

    /**
     * Fade in and return a promise.
     * @param duration - Duration in ms.
     * @param alpha - Target alpha.
     * @returns A promise that resolves when complete.
     */
    fadeInPromise(
        duration: number,
        alpha?: number
    ): Promise<any>;

    /**
     * Check if fade-in is running.
     * @returns True if fade-in is active.
     */
    isRunningFadeIn(): boolean;

    /**
     * Fade out then destroy.
     * @param duration - Duration in ms.
     * @returns This instance.
     */
    fadeOutDestroy(
        duration: number
    ): this;

    /**
     * Fade out then destroy and return a promise.
     * @param duration - Duration in ms.
     * @returns A promise that resolves when complete.
     */
    fadeOutDestroyPromise(
        duration: number
    ): Promise<any>;

    /**
     * Fade out over time.
     * @param duration - Duration in ms.
     * @returns This instance.
     */
    fadeOut(
        duration: number
    ): this;

    /**
     * Fade out and return a promise.
     * @param duration - Duration in ms.
     * @returns A promise that resolves when complete.
     */
    fadeOutPromise(
        duration: number
    ): Promise<any>;

    /**
     * Check if fade-out is running.
     * @returns True if fade-out is active.
     */
    isRunningFadeOut(): boolean;

    /**
     * Check if any fade easing is running.
     * @returns True if fade easing is active.
     */
    isRunningEaseFade(): boolean;

    /**
     * Pop up with scale animation.
     * @param duration - Duration in ms.
     * @param orientation - Axis or orientation.
     * @param ease - Easing name.
     * @returns This instance.
     */
    popUp(
        duration: number,
        orientation?: 0 | 1 | 'x' | 'y',
        ease?: string
    ): this;

    /**
     * Pop up with scale animation and return a promise.
     * @param duration - Duration in ms.
     * @param orientation - Axis or orientation.
     * @param ease - Easing name.
     * @returns A promise that resolves when complete.
     */
    popUpPromise(
        duration: number,
        orientation?: 0 | 1 | 'x' | 'y',
        ease?: string
    ): Promise<any>;

    /**
     * Check if pop-up is running.
     * @returns True if pop-up is active.
     */
    isRunningPopUp(): boolean;

    /**
     * Scale down then destroy.
     * @param duration - Duration in ms.
     * @param orientation - Axis or orientation.
     * @param ease - Easing name.
     * @returns This instance.
     */
    scaleDownDestroy(
        duration: number,
        orientation?: 0 | 1 | 'x' | 'y',
        ease?: string
    ): this;

    /**
     * Scale down then destroy and return a promise.
     * @param duration - Duration in ms.
     * @param orientation - Axis or orientation.
     * @param ease - Easing name.
     * @returns A promise that resolves when complete.
     */
    scaleDownDestroyPromise(
        duration: number,
        orientation?: 0 | 1 | 'x' | 'y',
        ease?: string
    ): Promise<any>;

    /**
     * Scale down over time.
     * @param duration - Duration in ms.
     * @param orientation - Axis or orientation.
     * @param ease - Easing name.
     * @returns This instance.
     */
    scaleDown(
        duration: number,
        orientation?: 0 | 1 | 'x' | 'y',
        ease?: string
    ): this;

    /**
     * Scale down and return a promise.
     * @param duration - Duration in ms.
     * @param orientation - Axis or orientation.
     * @param ease - Easing name.
     * @returns A promise that resolves when complete.
     */
    scaleDownPromise(
        duration: number,
        orientation?: 0 | 1 | 'x' | 'y',
        ease?: string
    ): Promise<any>;

    /**
     * Check if scale-down is running.
     * @returns True if scale-down is active.
     */
    isRunningScaleDown(): boolean;

    /**
     * Scale up and down repeatedly.
     * @param duration - Duration in ms.
     * @param peakValue - Peak scale value.
     * @param repeat - Repeat count.
     * @param orientation - Axis or orientation.
     * @param ease - Easing name.
     * @returns This instance.
     */
    scaleYoyo(
        duration: number,
        peakValue?: number,
        repeat?: number,
        orientation?: 0 | 1 | 'x' | 'y',
        ease?: string
    ): this;

    /**
     * Scale up and down repeatedly and return a promise.
     * @param duration - Duration in ms.
     * @param peakValue - Peak scale value.
     * @param repeat - Repeat count.
     * @param orientation - Axis or orientation.
     * @param ease - Easing name.
     * @returns A promise that resolves when complete.
     */
    scaleYoyoPromise(
        duration: number,
        peakValue?: number,
        repeat?: number,
        orientation?: 0 | 1 | 'x' | 'y',
        ease?: string
    ): Promise<any>;

    /**
     * Check if scale-yoyo is running.
     * @returns True if scale-yoyo is active.
     */
    isRunningScaleYoyo(): boolean;

    /**
     * Check if any scale easing is running.
     * @returns True if scale easing is active.
     */
    isRunningEaseScale(): boolean;

    /**
     * Shake this sizer.
     * @param duration - Duration in ms.
     * @param magnitude - Shake magnitude.
     * @param magnitudeMode - 0/'constant' or 1/'decay'.
     * @returns This instance.
     */
    shake(
        duration?: number,
        magnitude?: number,
        magnitudeMode?: 0 | 1 | 'constant' | 'decay'
    ): this;

    /**
     * Shake this sizer and return a promise.
     * @param duration - Duration in ms.
     * @param magnitude - Shake magnitude.
     * @param magnitudeMode - 0/'constant' or 1/'decay'.
     * @returns A promise that resolves when complete.
     */
    shakePromise(
        duration?: number,
        magnitude?: number,
        magnitudeMode?: 0 | 1 | 'constant' | 'decay'
    ): Promise<any>;

    /**
     * Ease a data value to a target.
     * @param key - Data key.
     * @param value - Target value.
     * @param duration - Duration in ms.
     * @param ease - Easing name.
     * @returns This instance.
     */
    easeDataTo(
        key: string,
        value: number,
        duration?: number,
        ease?: string
    ): this;

    /**
     * Ease a data value using a config object.
     * @param config - Ease configuration.
     * @returns This instance.
     */
    easeDataTo(
        config: {
            key: string,
            value: number,
            duration?: number,
            ease?: string,
            speed?: number
        }
    ): this;

    /**
     * Ease a data value to a target and return a promise.
     * @param key - Data key.
     * @param value - Target value.
     * @param duration - Duration in ms.
     * @param ease - Easing name.
     * @returns A promise that resolves when complete.
     */
    easeDataToPromise(
        key: string,
        value: number,
        duration?: number,
        ease?: string
    ): Promise<any>;

    /**
     * Ease a data value using a config object and return a promise.
     * @param config - Ease configuration.
     * @returns A promise that resolves when complete.
     */
    easeDataToPromise(
        config: {
            key: string,
            value: number,
            duration?: number,
            ease?: string,
            speed?: number
        }
    ): Promise<any>;

    /**
     * Stop easing a data key.
     * @param key - Data key.
     * @param toEnd - True to jump to the end.
     * @returns This instance.
     */
    stopEaseData(
        key: string,
        toEnd?: boolean
    ): this;

    /**
     * Stop easing all data keys.
     * @param toEnd - True to jump to the end.
     * @returns This instance.
     */
    stopAllEaseData(
        toEnd?: boolean
    ): this;

    /**
     * Delay a callback invocation.
     * @param delay - Delay in ms.
     * @param callback - Callback function.
     * @param scope - Callback scope.
     * @returns This instance.
     */
    delayCall(
        delay: number,
        callback: Function,
        scope?: object,
    ): this;

    /**
     * Set anchor configuration.
     * @param config - Anchor configuration.
     * @returns This instance.
     */
    setAnchor(config: BaseSizer.IAnchorConfig): this;

    /**
     * Enable dragging with optional sensor and target.
     * @param sensor - Sensor object, key, or boolean.
     * @param draggable - True to enable dragging.
     * @param target - Drag target object.
     * @returns This instance.
     */
    setDraggable(
        sensor?: boolean | string | Phaser.GameObjects.GameObject,
        draggable?: boolean,
        target?: Phaser.GameObjects.GameObject
    ): this;

    /**
     * Enable dragging using a config object.
     * @param config - Drag configuration.
     * @returns This instance.
     */
    setDraggable(
        config: BaseSizer.IDraggableConfig
    ): this;

    readonly _click: Click;

    getClickController(config?: Click.IConfig): Click;

    getClickController(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Click.IConfig
    ): Click;

    /**
     * Register a click handler for this sizer.
     * @param callback - Callback invoked on click.
     * @param scope - Callback scope.
     * @param config - Click configuration.
     * @returns This instance.
     */
    onClick(
        callback: BaseSizer.OnClickCallbackType,
        scope?: object,
        config?: Click.IConfig
    ): this;


    /**
     * Register a click handler for a specific child.
     * @param gameObject - Target child.
     * @param callback - Callback invoked on click.
     * @param scope - Callback scope.
     * @param config - Click configuration.
     * @returns This instance.
     */
    onClick(
        gameObject: Phaser.GameObjects.GameObject,
        callback: BaseSizer.OnClickCallbackType,
        scope?: object,
        config?: Click.IConfig
    ): this;

    /**
     * Remove a click handler from this sizer.
     * @param callback - Callback to remove.
     * @param scope - Callback scope.
     * @returns This instance.
     */
    offClick(
        callback: Function,
        scope?: object
    ): this;

    /**
     * Remove a click handler from a specific child.
     * @param gameObject - Target child.
     * @param callback - Callback to remove.
     * @param scope - Callback scope.
     * @returns This instance.
     */
    offClick(
        gameObject: Phaser.GameObjects.GameObject,
        callback: Function,
        scope?: object
    ): this;

    /**
     * Enable or disable click handling on this sizer.
     * @param enabled - True to enable.
     * @returns This instance.
     */
    enableClick(enabled?: boolean): this;

    /**
     * Enable or disable click handling on a child.
     * @param gameObject - Target child.
     * @param enabled - True to enable.
     * @returns This instance.
     */
    enableClick(
        gameObject: Phaser.GameObjects.GameObject,
        enabled?: boolean
    ): this;

    /**
     * Disable click handling on this sizer.
     * @returns This instance.
     */
    disableClick(): this;

    /**
     * Disable click handling on a child.
     * @param gameObject - Target child.
     * @returns This instance.
     */
    disableClick(gameObject: Phaser.GameObjects.GameObject): this;

    readonly _clickOutside: ClickOutside;

    getClickOutsideController(config?: ClickOutside.IConfig): ClickOutside;

    getClickOutsideController(
        gameObject: Phaser.GameObjects.GameObject,
        config?: ClickOutside.IConfig
    ): ClickOutside;

    /**
     * Register a click-outside handler for this sizer.
     * @param callback - Callback invoked on click outside.
     * @param scope - Callback scope.
     * @param config - ClickOutside configuration.
     * @returns This instance.
     */
    onClickOutside(
        callback: BaseSizer.OnClickOutsideCallbackType,
        scope?: object,
        config?: ClickOutside.IConfig
    ): this;

    /**
     * Register a click-outside handler for a child.
     * @param gameObject - Target child.
     * @param callback - Callback invoked on click outside.
     * @param scope - Callback scope.
     * @param config - ClickOutside configuration.
     * @returns This instance.
     */
    onClickOutside(
        gameObject: Phaser.GameObjects.GameObject,
        callback: BaseSizer.OnClickOutsideCallbackType,
        scope?: object,
        config?: ClickOutside.IConfig
    ): this;

    /**
     * Remove a click-outside handler from this sizer.
     * @param callback - Callback to remove.
     * @param scope - Callback scope.
     * @returns This instance.
     */
    offClickOutside(
        callback: Function,
        scope?: object
    ): this;

    /**
     * Remove a click-outside handler from a child.
     * @param gameObject - Target child.
     * @param callback - Callback to remove.
     * @param scope - Callback scope.
     * @returns This instance.
     */
    offClickOutside(
        gameObject: Phaser.GameObjects.GameObject,
        callback: Function,
        scope?: object
    ): this;


    /**
     * Enable or disable click-outside on this sizer.
     * @param enabled - True to enable.
     * @returns This instance.
     */
    enableClickOutside(enabled?: boolean): this;

    /**
     * Enable or disable click-outside on a child.
     * @param gameObject - Target child.
     * @param enabled - True to enable.
     * @returns This instance.
     */
    enableClickOutside(
        gameObject: Phaser.GameObjects.GameObject,
        enabled?: boolean
    ): this;

    /**
     * Disable click-outside on this sizer.
     * @returns This instance.
     */
    disableClickOutside(): this;

    /**
     * Disable click-outside on a child.
     * @param gameObject - Target child.
     * @returns This instance.
     */
    disableClickOutside(gameObject: Phaser.GameObjects.GameObject): this;

    /**
     * Check if pointer is within bounds.
     * @returns True if pointer is in bounds.
     */
    isPointerInBounds(): boolean;
    /**
     * Check if pointer is within bounds of a child.
     * @param gameObject - Target child.
     * @returns True if pointer is in bounds.
     */
    isPointerInBounds(gameObject: Phaser.GameObjects.GameObject): boolean;
    /**
     * Check if pointer is within bounds of a named child.
     * @param name - Target child name.
     * @returns True if pointer is in bounds.
     */
    isPointerInBounds(name: string): boolean;

    readonly _inTouching: InTouching;

    /**
     * Register a touching handler for this sizer.
     * @param callback - Callback invoked on touch.
     * @param scope - Callback scope.
     * @param config - Touch configuration.
     * @returns This instance.
     */
    onTouching(
        callback: BaseSizer.OnTouchingCallbackType,
        scope?: object,
        config?: InTouching.IConfig
    ): this;

    /**
     * Register a touching handler for a child.
     * @param gameObject - Target child.
     * @param callback - Callback invoked on touch.
     * @param scope - Callback scope.
     * @param config - Touch configuration.
     * @returns This instance.
     */
    onTouching(
        gameObject: Phaser.GameObjects.GameObject,
        callback: BaseSizer.OnTouchingCallbackType,
        scope?: object,
        config?: InTouching.IConfig
    ): this;

    /**
     * Remove a touching handler from this sizer.
     * @param callback - Callback to remove.
     * @param scope - Callback scope.
     * @returns This instance.
     */
    offTouching(
        callback: Function,
        scope?: object
    ): this;

    /**
     * Remove a touching handler from a child.
     * @param gameObject - Target child.
     * @param callback - Callback to remove.
     * @param scope - Callback scope.
     * @returns This instance.
     */
    offTouching(
        gameObject: Phaser.GameObjects.GameObject,
        callback: Function,
        scope?: object
    ): this;

    /**
     * Register a touching-end handler for this sizer.
     * @param callback - Callback invoked on touch end.
     * @param scope - Callback scope.
     * @param config - Touch configuration.
     * @returns This instance.
     */
    onTouchingEnd(
        callback: BaseSizer.OnTouchingEndCallbackType,
        scope?: object,
        config?: InTouching.IConfig
    ): this;

    /**
     * Register a touching-end handler for a child.
     * @param gameObject - Target child.
     * @param callback - Callback invoked on touch end.
     * @param scope - Callback scope.
     * @param config - Touch configuration.
     * @returns This instance.
     */
    onTouchingEnd(
        gameObject: Phaser.GameObjects.GameObject,
        callback: BaseSizer.OnTouchingEndCallbackType,
        scope?: object,
        config?: InTouching.IConfig
    ): this;

    /**
     * Remove a touching-end handler from this sizer.
     * @param callback - Callback to remove.
     * @param scope - Callback scope.
     * @returns This instance.
     */
    offTouchingEnd(
        callback: Function,
        scope?: object
    ): this;

    /**
     * Remove a touching-end handler from a child.
     * @param gameObject - Target child.
     * @param callback - Callback to remove.
     * @param scope - Callback scope.
     * @returns This instance.
     */
    offTouchingEnd(
        gameObject: Phaser.GameObjects.GameObject,
        callback: Function,
        scope?: object
    ): this;

    /**
     * Enable or disable touching on this sizer.
     * @param enable - True to enable.
     * @returns This instance.
     */
    enableTouching(enable?: boolean): this;

    /**
     * Enable or disable touching on a child.
     * @param gameObject - Target child.
     * @param enable - True to enable.
     * @returns This instance.
     */
    enableTouching(
        gameObject: Phaser.GameObjects.GameObject,
        enable?: boolean
    ): this;

    /**
     * Disable touching on this sizer.
     * @returns This instance.
     */
    disableTouching(): this;

    /**
     * Disable touching on a child.
     * @param gameObject - Target child.
     * @returns This instance.
     */
    disableTouching(gameObject: Phaser.GameObjects.GameObject): this;

    /**
     * Register a pointer-over handler for this sizer.
     * @param callback - Callback invoked on over.
     * @param scope - Callback scope.
     * @returns This instance.
     */
    onOver(
        callback: BaseSizer.OnOverCallbackType,
        scope?: object,
    ): this;

    /**
     * Register a pointer-over handler for a child.
     * @param gameObject - Target child.
     * @param callback - Callback invoked on over.
     * @param scope - Callback scope.
     * @returns This instance.
     */
    onOver(
        gameObject: Phaser.GameObjects.GameObject,
        callback: BaseSizer.OnOverCallbackType,
        scope?: object,
    ): this;

    /**
     * Register a pointer-out handler for this sizer.
     * @param callback - Callback invoked on out.
     * @param scope - Callback scope.
     * @returns This instance.
     */
    onOut(
        callback: BaseSizer.OnOutCallbackType,
        scope?: object,
    ): this;

    /**
     * Register a pointer-out handler for a child.
     * @param gameObject - Target child.
     * @param callback - Callback invoked on out.
     * @param scope - Callback scope.
     * @returns This instance.
     */
    onOut(
        gameObject: Phaser.GameObjects.GameObject,
        callback: BaseSizer.OnOutCallbackType,
        scope?: object,
    ): this;

    /**
     * Set children interactive using a config.
     * @param config - Interaction configuration.
     * @returns This instance.
     */
    setChildrenInteractive(
        config: SetChildrenInteractive.IConfig
    ): this;

    /**
     * Show this sizer or a child.
     * @param gameObject - Optional child to show.
     * @returns This instance.
     */
    show(
        gameObject?: Phaser.GameObjects.GameObject
    ): this;

    /**
     * Hide this sizer or a child.
     * @param gameObject - Optional child to hide.
     * @returns This instance.
     */
    hide(
        gameObject?: Phaser.GameObjects.GameObject
    ): this;

    /**
     * Check if a child is shown.
     * @param gameObject - The child to check.
     * @returns True if shown.
     */
    isShow(
        gameObject: Phaser.GameObjects.GameObject
    ): boolean;

    /**
     * Hook invoked when modal behavior is created.
     */
    onCreateModalBehavior: (self: this) => void;

    /**
     * Open modal behavior.
     * @param config - Modal configuration.
     * @param onClose - Optional close callback.
     * @returns This instance.
     */
    modal(
        config?: ModalBehavoir.IConfig,
        onClose?: BaseSizer.OnModalCloseCallbackType
    ): this;

    /**
     * Open modal behavior with a close callback.
     * @param onClose - Optional close callback.
     * @returns This instance.
     */
    modal(
        onClose?: BaseSizer.OnModalCloseCallbackType
    ): this;

    /**
     * Open modal behavior and return a promise.
     * @param config - Modal configuration.
     * @returns A promise that resolves on close.
     */
    modalPromise(
        config?: ModalBehavoir.IConfig
    ): Promise<Object>;

    /**
     * Close the modal behavior.
     * @param closeEventData - Optional close payload.
     * @returns This instance.
     */
    modalClose(closeEventData?: Object): this;

    /**
     * Broadcast an event to children.
     * @param event - Event name.
     * @param args - Event arguments.
     * @returns This instance.
     */
    broadcastEvent(
        event: string,
        ...args: any[]
    ): this;

    /**
     * Bind an event to an emitter.
     * @param eventEmitter - Event emitter.
     * @param eventName - Event name.
     * @param callback - Callback function.
     * @param scope - Callback scope.
     * @param once - True to listen once.
     * @returns This instance.
     */
    bindEvent(
        eventEmitter: Phaser.Events.EventEmitter,
        eventName: string,
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    /**
     * Bind an event to an emitter for a game object.
     * @param gameObject - Target game object.
     * @param eventEmitter - Event emitter.
     * @param eventName - Event name.
     * @param callback - Callback function.
     * @param scope - Callback scope.
     * @param once - True to listen once.
     * @returns This instance.
     */
    bindEvent(
        gameObject: Phaser.GameObjects.GameObject,
        eventEmitter: Phaser.Events.EventEmitter,
        eventName: string,
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    /**
     * Bind to the Scene preupdate event.
     * @param callback - Callback function.
     * @param scope - Callback scope.
     * @param once - True to listen once.
     * @returns This instance.
     */
    bindScenePreupdateEvent(
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    /**
     * Bind to the Scene preupdate event for a game object.
     * @param gameObject - Target game object.
     * @param callback - Callback function.
     * @param scope - Callback scope.
     * @param once - True to listen once.
     * @returns This instance.
     */
    bindScenePreupdateEvent(
        gameObject: Phaser.GameObjects.GameObject,
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    /**
     * Bind to the Scene update event.
     * @param callback - Callback function.
     * @param scope - Callback scope.
     * @param once - True to listen once.
     * @returns This instance.
     */
    bindSceneUpdateEvent(
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    /**
     * Bind to the Scene update event for a game object.
     * @param gameObject - Target game object.
     * @param callback - Callback function.
     * @param scope - Callback scope.
     * @param once - True to listen once.
     * @returns This instance.
     */
    bindSceneUpdateEvent(
        gameObject: Phaser.GameObjects.GameObject,
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    /**
     * Bind to the Scene postupdate event.
     * @param callback - Callback function.
     * @param scope - Callback scope.
     * @param once - True to listen once.
     * @returns This instance.
     */
    bindScenePostupdateEvent(
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    /**
     * Bind to the Scene postupdate event for a game object.
     * @param gameObject - Target game object.
     * @param callback - Callback function.
     * @param scope - Callback scope.
     * @param once - True to listen once.
     * @returns This instance.
     */
    bindScenePostupdateEvent(
        gameObject: Phaser.GameObjects.GameObject,
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    /**
     * Bind to the Scene render event.
     * @param callback - Callback function.
     * @param scope - Callback scope.
     * @param once - True to listen once.
     * @returns This instance.
     */
    bindSceneRenderEvent(
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    /**
     * Bind to the Scene render event for a game object.
     * @param gameObject - Target game object.
     * @param callback - Callback function.
     * @param scope - Callback scope.
     * @param once - True to listen once.
     * @returns This instance.
     */
    bindSceneRenderEvent(
        gameObject: Phaser.GameObjects.GameObject,
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    /**
     * Bind to the Scene pause event.
     * @param callback - Callback function.
     * @param scope - Callback scope.
     * @param once - True to listen once.
     * @returns This instance.
     */
    bindScenePauseEvent(
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    /**
     * Bind to the Scene pause event for a game object.
     * @param gameObject - Target game object.
     * @param callback - Callback function.
     * @param scope - Callback scope.
     * @param once - True to listen once.
     * @returns This instance.
     */
    bindScenePauseEvent(
        gameObject: Phaser.GameObjects.GameObject,
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    /**
     * Bind to the Scene resume event.
     * @param callback - Callback function.
     * @param scope - Callback scope.
     * @param once - True to listen once.
     * @returns This instance.
     */
    bindSceneResumeEvent(
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    /**
     * Bind to the Scene resume event for a game object.
     * @param gameObject - Target game object.
     * @param callback - Callback function.
     * @param scope - Callback scope.
     * @param once - True to listen once.
     * @returns This instance.
     */
    bindSceneResumeEvent(
        gameObject: Phaser.GameObjects.GameObject,
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    /**
     * Bind to the Scene sleep event.
     * @param callback - Callback function.
     * @param scope - Callback scope.
     * @param once - True to listen once.
     * @returns This instance.
     */
    bindSceneSleepEvent(
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    /**
     * Bind to the Scene sleep event for a game object.
     * @param gameObject - Target game object.
     * @param callback - Callback function.
     * @param scope - Callback scope.
     * @param once - True to listen once.
     * @returns This instance.
     */
    bindSceneSleepEvent(
        gameObject: Phaser.GameObjects.GameObject,
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    /**
     * Bind to the Scene wake event.
     * @param callback - Callback function.
     * @param scope - Callback scope.
     * @param once - True to listen once.
     * @returns This instance.
     */
    bindSceneWakeEvent(
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    /**
     * Bind to the Scene wake event for a game object.
     * @param gameObject - Target game object.
     * @param callback - Callback function.
     * @param scope - Callback scope.
     * @param once - True to listen once.
     * @returns This instance.
     */
    bindSceneWakeEvent(
        gameObject: Phaser.GameObjects.GameObject,
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    /**
     * Bind to the Scene shutdown event.
     * @param callback - Callback function.
     * @param scope - Callback scope.
     * @param once - True to listen once.
     * @returns This instance.
     */
    bindSceneShutdownEvent(
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    /**
     * Bind to the Scene shutdown event for a game object.
     * @param gameObject - Target game object.
     * @param callback - Callback function.
     * @param scope - Callback scope.
     * @param once - True to listen once.
     * @returns This instance.
     */
    bindSceneShutdownEvent(
        gameObject: Phaser.GameObjects.GameObject,
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    /**
     * Bind to the Scene resize event.
     * @param callback - Callback function.
     * @param scope - Callback scope.
     * @param once - True to listen once.
     * @returns This instance.
     */
    bindSceneResizeEvent(
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    /**
     * Get shown children.
     * @param out - Optional array to store results.
     * @returns Shown children.
     */
    getShownChildren(
        out?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject[];

    /**
     * Get all shown children including nested ones.
     * @param out - Optional array to store results.
     * @returns Shown children.
     */
    getAllShownChildren(
        out?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject[];

    /**
     * Get inner padding.
     * @param key - Optional padding key.
     * @returns Padding value or object.
     */
    getInnerPadding(
        key?: string
    ): number | BaseSizer.IPadding;

    /**
     * Set inner padding by key.
     * @param key - Padding key.
     * @param value - Padding value.
     * @returns This instance.
     */
    setInnerPadding(
        key: string,
        value?: number
    ): this;

    /**
     * Set inner padding for all sides.
     * @param padding - Padding value or object.
     * @returns This instance.
     */
    setInnerPadding(
        padding: number | BaseSizer.IPadding,
    ): this;

    /**
     * Get outer padding.
     * @param key - Optional padding key.
     * @returns Padding value or object.
     */
    getOutterPadding(
        key?: string
    ): number | BaseSizer.IPadding;

    /**
     * Set outer padding by key.
     * @param key - Padding key.
     * @param value - Padding value.
     * @returns This instance.
     */
    setOuterPadding(
        key: string,
        value?: number
    ): this;

    /**
     * Set outer padding for all sides.
     * @param padding - Padding value or object.
     * @returns This instance.
     */
    setOuterPadding(
        padding: number | BaseSizer.IPadding,
    ): this;

    /**
     * Get outer padding for a child.
     * @param child - Child key or game object.
     * @param key - Optional padding key.
     * @returns Padding value or object.
     */
    getChildOutterPadding(
        child: string | Phaser.GameObjects.GameObject,
        key?: string
    ): number | BaseSizer.IPadding;

    /**
     * Set outer padding for a child by key.
     * @param child - Child key or game object.
     * @param key - Padding key.
     * @param value - Padding value.
     * @returns This instance.
     */
    setChildOuterPadding(
        child: string | Phaser.GameObjects.GameObject,
        key: string,
        value?: number
    ): this;

    /**
     * Set outer padding for a child.
     * @param child - Child key or game object.
     * @param padding - Padding value or object.
     * @returns This instance.
     */
    setChildOuterPadding(
        child: string | Phaser.GameObjects.GameObject,
        padding: number | BaseSizer.IPadding,
    ): this;

    /**
     * Find child at a point.
     * @param x - World x.
     * @param y - World y.
     * @param preTest - Optional pre-test filter.
     * @param postTest - Optional post-test filter.
     * @param children - Optional children list to test.
     * @returns The matched child.
     */
    pointToChild(
        x: number,
        y: number,
        preTest?: (gameObject: Phaser.GameObjects.GameObject, x: number, y: number) => boolean,
        postTest?: (gameObject: Phaser.GameObjects.GameObject, x: number, y: number) => boolean,
        children?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject;
}
