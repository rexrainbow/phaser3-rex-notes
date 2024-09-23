// import * as Phaser from 'phaser';
import ContainerLite from '../../../plugins/containerlite.js';
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

    type PaddingTypes = number |
    {
        left?: number,
        right?: number,
        top?: number,
        bottom?: number
    };

    interface IConfig {
        space?: {
            left?: number, right?: number, top?: number, bottom?: number,
        },

        anchor?: Anchor.IConfig,

        origin?: number, originX?: number, originY?: number,

        name?: string,

        enableLayer?: boolean,

        draggable?: boolean | string | Phaser.GameObjects.GameObject,

        sizerEvents?: boolean,
    }

    type PrevState = {
        x: number,
        y: number,
        width: number, height: number,
        displayWidth: number, displayHeight: number,
        scaleX: number, scaleY: number
    }

    type OnModalCloseCallbackType = (
        data: Object
    ) => void;

}

declare class BaseSizer extends ContainerLite {
    isRexSizer: true;

    space: { [name: string]: number };

    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        minWidth?: number, minHeight?: number,
        config?: BaseSizer.IConfig
    );

    setMinSize(minWidth: number, minHeight: number): this;

    setMinWidth(minWidth: number): this;

    setMinHeight(minHeight: number): this;

    minWidth: number;
    minHeight: number;

    setDirty(dirty?: boolean): this;

    setSizerEventsEnable(enable?: boolean): this;
    sizerEventsEnable: boolean;

    left: number;

    alignLeft(value: number): this;

    right: number;

    alignRight(value: number): this;

    centerX: number;

    alignCenterX(value: number): this;

    top: number;

    alignTop(value: number): this;

    bottom: number;

    alignBottom(value: number): this;

    centerY: number;

    alignCenterY(value: number): this;

    pushIntoBounds(
        bounds?: Phaser.Geom.Rectangle | { left?: number, right?: number, top?: number, bottom?: number }
    ): this;

    readonly innerLeft: number;

    readonly innerRight: number;

    readonly innerTop: number;

    readonly innerBottom: number;

    readonly innerWidth: number;

    readonly innerHeight: number;

    readonly minInnerWidth: number;

    readonly minInnerHeight: number;

    addBackground(
        gameObject: Phaser.GameObjects.GameObject,
        padding?: BaseSizer.PaddingTypes,
        childKey?: string
    ): this;

    isBackground(
        gameObject: Phaser.GameObjects.GameObject
    ): boolean;

    layout(): this;

    enableLayoutWarn(enable?: boolean): this;

    drawBounds(
        graphics: Phaser.GameObjects.Graphics,
        color?: number
    ): this;

    drawBounds(
        graphics: Phaser.GameObjects.Graphics,
        config?: {
            color?: number,
            lineWidth?: number,
            name?: boolean |
            {
                createTextCallback: (scene: Phaser.Scene) => Phaser.GameObjects.GameObject,
                createTextCallbackScope?: object,
                align?: BaseSizer.AlignTypes
            }
        }
    ): this;

    childrenMap: { [key: string]: Phaser.GameObjects.GameObject };

    addChildrenMap(
        key: string,
        gameObject: Phaser.GameObjects.GameObject
    ): this;

    addChildrenMap(
        config: { [key: string]: Phaser.GameObjects.GameObject }
    ): this;

    removeFromParentSizer(): this;

    removeBackground(
        gameObject: Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    removeAllBackgrounds(destroyChild?: boolean): this;

    removeChildCallback(
        gameObject: Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    removeChildrenMap(key: string): this;
    removeChildrenMap(gameObject: Phaser.GameObjects.GameObject): this;

    getElement(
        name: string,
        recursive?: boolean
    ): Phaser.GameObjects.GameObject |
        Phaser.GameObjects.GameObject[] |
        { [name: string]: Phaser.GameObjects.GameObject } |
        null;

    getChildIndex(
        child: Phaser.GameObjects.GameObject
    ): number | string | null;

    getParentSizer(
        name?: string
    ): BaseSizer | null;

    getParentSizer(
        gameObject?: Phaser.GameObjects.GameObject,
        name?: string
    ): BaseSizer | null;

    getTopmostSizer(
        gameObject?: Phaser.GameObjects.GameObject
    ): BaseSizer | null;

    hasParentSizer(
        parentGameObject: Phaser.GameObjects.GameObject,
        gameObject?: Phaser.GameObjects.GameObject
    ): boolean;

    hasChild(
        childGameObject: Phaser.GameObjects.GameObject,
        gameObject?: Phaser.GameObjects.GameObject
    ): boolean;

    getSizerConfig(
        gameObject?: Phaser.GameObjects.GameObject
    ): { [name: string]: any };

    getChildPrevState(
        gameObject: Phaser.GameObjects.GameObject
    ): BaseSizer.PrevState;

    isInTouching(): boolean;

    isInTouching(
        pointer: Phaser.Input.Pointer,
        gameObject?: Phaser.GameObjects.GameObject | string
    ): boolean;

    isInTouching(
        gameObject?: Phaser.GameObjects.GameObject | string
    ): boolean;


    moveFrom(
        duration: number,
        x: number,
        y: number,
        ease?: string
    ): this;

    moveFrom(
        config: {
            x: number,
            y: number,
            speed?: number,
            duration?: number,
            ease?: string,
        }
    ): this;

    moveFromPromise(
        duration: number,
        x: number,
        y: number,
        ease?: string
    ): Promise<any>;

    moveFromPromise(
        config: {
            x: number,
            y: number,
            speed?: number,
            duration?: number,
            ease?: string,
        }
    ): Promise<any>;

    moveFromDestroy(
        duration: number,
        x: number,
        y: number,
        ease?: string
    ): this;

    moveFromDestroy(
        config: {
            x: number,
            y: number,
            speed?: number,
            duration?: number,
            ease?: string,
        }
    ): this;

    moveFromDestroyPromise(
        duration: number,
        x: number,
        y: number,
        ease?: string
    ): Promise<any>;

    moveFromDestroyPromise(
        config: {
            x: number,
            y: number,
            speed?: number,
            duration?: number,
            ease?: string,
        }
    ): Promise<any>;

    isRunningMoveFrom(): boolean;

    moveTo(
        duration: number,
        x: number,
        y: number,
        ease?: string
    ): this;

    moveTo(
        config: {
            x: number,
            y: number,
            speed?: number,
            duration?: number,
            ease?: string,
        }
    ): this;

    moveToPromise(
        duration: number,
        x: number,
        y: number,
        ease?: string
    ): Promise<any>;

    moveToPromise(
        config: {
            x: number,
            y: number,
            speed?: number,
            duration?: number,
            ease?: string,
        }
    ): Promise<any>;

    moveToDestroy(
        duration: number,
        x: number,
        y: number,
        ease?: string
    ): this;

    moveToDestroy(
        config: {
            x: number,
            y: number,
            speed?: number,
            duration?: number,
            ease?: string,
        }
    ): this;

    moveToDestroyPromise(
        duration: number,
        x: number,
        y: number,
        ease?: string
    ): Promise<any>;

    moveToDestroyPromise(
        config: {
            x: number,
            y: number,
            speed?: number,
            duration?: number,
            ease?: string,
        }
    ): Promise<any>;

    isRunningMoveTo(): boolean;

    isRunningEaseMove(): boolean;

    moveStop(toEnd?: boolean): this;

    fadeIn(
        duration: number,
        alpha?: number
    ): this;

    fadeInPromise(
        duration: number,
        alpha?: number
    ): Promise<any>;

    isRunningFadeIn(): boolean;

    fadeOutDestroy(
        duration: number
    ): this;

    fadeOutDestroyPromise(
        duration: number
    ): Promise<any>;

    fadeOut(
        duration: number
    ): this;

    fadeOutPromise(
        duration: number
    ): Promise<any>;

    isRunningFadeOut(): boolean;

    isRunningEaseFade(): boolean;

    popUp(
        duration: number,
        orientation?: 0 | 1 | 'x' | 'y',
        ease?: string
    ): this;

    popUpPromise(
        duration: number,
        orientation?: 0 | 1 | 'x' | 'y',
        ease?: string
    ): Promise<any>;

    isRunningPopUp(): boolean;

    scaleDownDestroy(
        duration: number,
        orientation?: 0 | 1 | 'x' | 'y',
        ease?: string
    ): this;

    scaleDownDestroyPromise(
        duration: number,
        orientation?: 0 | 1 | 'x' | 'y',
        ease?: string
    ): Promise<any>;

    scaleDown(
        duration: number,
        orientation?: 0 | 1 | 'x' | 'y',
        ease?: string
    ): this;

    scaleDownPromise(
        duration: number,
        orientation?: 0 | 1 | 'x' | 'y',
        ease?: string
    ): Promise<any>;

    isRunningScaleDown(): boolean;

    scaleYoyo(
        duration: number,
        peakValue?: number,
        repeat?: number,
        orientation?: 0 | 1 | 'x' | 'y',
        ease?: string
    ): this;

    scaleYoyoPromise(
        duration: number,
        peakValue?: number,
        repeat?: number,
        orientation?: 0 | 1 | 'x' | 'y',
        ease?: string
    ): Promise<any>;

    isRunningScaleYoyo(): boolean;

    isRunningEaseScale(): boolean;

    shake(
        duration?: number,
        magnitude?: number,
        magnitudeMode?: 0 | 1 | 'constant' | 'decay'
    ): this;

    shakePromise(
        duration?: number,
        magnitude?: number,
        magnitudeMode?: 0 | 1 | 'constant' | 'decay'
    ): Promise<any>;

    easeDataTo(
        key: string,
        value: number,
        duration?: number,
        ease?: string
    ): this;

    easeDataTo(
        config: {
            key: string,
            value: number,
            duration?: number,
            ease?: string,
            speed?: number
        }
    ): this;

    easeDataToPromise(
        key: string,
        value: number,
        duration?: number,
        ease?: string
    ): Promise<any>;

    easeDataToPromise(
        config: {
            key: string,
            value: number,
            duration?: number,
            ease?: string,
            speed?: number
        }
    ): Promise<any>;

    stopEaseData(
        key: string,
        toEnd?: boolean
    ): this;

    stopAllEaseData(
        toEnd?: boolean
    ): this;

    delayCall(
        delay: number,
        callback: Function,
        scope?: object,
    ): this;

    setAnchor(config: {
        left?: string, right?: string, centerX?: string, x?: string,
        top?: string, bottom?: string, centerY?: string, y?: string
    }): this;

    setDraggable(
        sensor?: boolean | string | Phaser.GameObjects.GameObject,
        draggable?: boolean,
        target?: Phaser.GameObjects.GameObject
    ): this;

    setDraggable(
        config: {
            sensor?: boolean | string | Phaser.GameObjects.GameObject,
            target?: Phaser.GameObjects.GameObject,
            draggable?: boolean,
        }
    ): this;

    onClick(
        callback: (
            click: Click,
            gameObject: Phaser.GameObjects.GameObject,
            pointer: Phaser.Input.Pointer,
            event: Phaser.Types.Input.EventData
        ) => void,
        scope?: object,
        config?: Click.IConfig
    ): this;


    onClick(
        gameObject: Phaser.GameObjects.GameObject,
        callback: (
            click: Click,
            gameObject: Phaser.GameObjects.GameObject,
            pointer: Phaser.Input.Pointer,
            event: Phaser.Types.Input.EventData
        ) => void,
        scope?: object,
        config?: Click.IConfig
    ): this;

    offClick(
        callback: Function,
        scope?: object
    ): this;

    offClick(
        gameObject: Phaser.GameObjects.GameObject,
        callback: Function,
        scope?: object
    ): this;

    enableClick(enabled?: boolean): this;

    enableClick(
        gameObject: Phaser.GameObjects.GameObject,
        enabled?: boolean
    ): this;

    disableClick(): this;

    disableClick(gameObject: Phaser.GameObjects.GameObject): this;

    onClickOutside(
        callback: (
            clickOutside: ClickOutside,
            gameObject: Phaser.GameObjects.GameObject,
            pointer: Phaser.Input.Pointer
        ) => void,
        scope?: object,
        config?: ClickOutside.IConfig
    ): this;

    onClickOutside(
        gameObject: Phaser.GameObjects.GameObject,
        callback: (
            clickOutside: ClickOutside,
            gameObject: Phaser.GameObjects.GameObject,
            pointer: Phaser.Input.Pointer
        ) => void,
        scope?: object,
        config?: ClickOutside.IConfig
    ): this;

    offClickOutside(
        callback: Function,
        scope?: object
    ): this;

    offClickOutside(
        gameObject: Phaser.GameObjects.GameObject,
        callback: Function,
        scope?: object
    ): this;


    enableClickOutside(enabled?: boolean): this;

    enableClickOutside(
        gameObject: Phaser.GameObjects.GameObject,
        enabled?: boolean
    ): this;

    disableClickOutside(): this;

    disableClickOutside(gameObject: Phaser.GameObjects.GameObject): this;

    isPointerInBounds(): boolean;
    isPointerInBounds(gameObject: Phaser.GameObjects.GameObject): boolean;
    isPointerInBounds(name: string): boolean;

    onTouching(
        callback: (
            inTouch: InTouching,
            gameObject: Phaser.GameObjects.GameObject,
            pointer: Phaser.Input.Pointer,
        ) => void,
        scope?: object,
        config?: InTouching.IConfig
    ): this;

    onTouching(
        gameObject: Phaser.GameObjects.GameObject,
        callback: (
            inTouch: InTouching,
            gameObject: Phaser.GameObjects.GameObject,
            pointer: Phaser.Input.Pointer,
        ) => void,
        scope?: object,
        config?: InTouching.IConfig
    ): this;

    offTouching(
        callback: Function,
        scope?: object
    ): this;

    offTouching(
        gameObject: Phaser.GameObjects.GameObject,
        callback: Function,
        scope?: object
    ): this;

    onTouchingEnd(
        callback: (
            inTouch: InTouching,
            gameObject: Phaser.GameObjects.GameObject,
            pointer: Phaser.Input.Pointer,
        ) => void,
        scope?: object,
        config?: InTouching.IConfig
    ): this;

    onTouchingEnd(
        gameObject: Phaser.GameObjects.GameObject,
        callback: (
            inTouch: InTouching,
            gameObject: Phaser.GameObjects.GameObject,
            pointer: Phaser.Input.Pointer,
        ) => void,
        scope?: object,
        config?: InTouching.IConfig
    ): this;

    offTouchingEnd(
        callback: Function,
        scope?: object
    ): this;

    offTouchingEnd(
        gameObject: Phaser.GameObjects.GameObject,
        callback: Function,
        scope?: object
    ): this;

    enableTouching(enable?: boolean): this;

    enableTouching(
        gameObject: Phaser.GameObjects.GameObject,
        enable?: boolean
    ): this;

    disableTouching(): this;

    disableTouching(gameObject: Phaser.GameObjects.GameObject): this;

    onOver(
        callback: (
            pointer: Phaser.Input.Pointer,
            localX: number,
            localY: number,
            event: Phaser.Types.Input.EventData
        ) => void,
        scope?: object,
    ): this;

    onOver(
        gameObject: Phaser.GameObjects.GameObject,
        callback: (
            pointer: Phaser.Input.Pointer,
            localX: number,
            localY: number,
            event: Phaser.Types.Input.EventData
        ) => void,
        scope?: object,
    ): this;

    onOut(
        callback: (
            pointer: Phaser.Input.Pointer,
            event: Phaser.Types.Input.EventData
        ) => void,
        scope?: object,
    ): this;

    onOut(
        gameObject: Phaser.GameObjects.GameObject,
        callback: (
            pointer: Phaser.Input.Pointer,
            event: Phaser.Types.Input.EventData
        ) => void,
        scope?: object,
    ): this;

    setChildrenInteractive(
        config: SetChildrenInteractive.IConfig
    ): this;

    show(
        gameObject?: Phaser.GameObjects.GameObject
    ): this;

    hide(
        gameObject?: Phaser.GameObjects.GameObject
    ): this;

    isShow(
        gameObject: Phaser.GameObjects.GameObject
    ): boolean;

    onCreateModalBehavior: (self: this) => void;

    modal(
        config?: ModalBehavoir.IConfig,
        onClose?: BaseSizer.OnModalCloseCallbackType
    ): this;

    modal(
        onClose?: BaseSizer.OnModalCloseCallbackType
    ): this;

    modalPromise(
        config?: ModalBehavoir.IConfig
    ): Promise<Object>;

    modalClose(closeEventData?: Object): this;

    broadcastEvent(
        event: string,
        ...args: any[]
    ): this;

    bindEvent(
        eventEmitter: Phaser.Events.EventEmitter,
        eventName: string,
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    bindEvent(
        gameObject: Phaser.GameObjects.GameObject,
        eventEmitter: Phaser.Events.EventEmitter,
        eventName: string,
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    bindScenePreupdateEvent(
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    bindScenePreupdateEvent(
        gameObject: Phaser.GameObjects.GameObject,
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    bindSceneUpdateEvent(
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    bindSceneUpdateEvent(
        gameObject: Phaser.GameObjects.GameObject,
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    bindScenePostupdateEvent(
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    bindScenePostupdateEvent(
        gameObject: Phaser.GameObjects.GameObject,
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    bindSceneRenderEvent(
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    bindSceneRenderEvent(
        gameObject: Phaser.GameObjects.GameObject,
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    bindScenePauseEvent(
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    bindScenePauseEvent(
        gameObject: Phaser.GameObjects.GameObject,
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    bindSceneResumeEvent(
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    bindSceneResumeEvent(
        gameObject: Phaser.GameObjects.GameObject,
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    bindSceneSleepEvent(
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    bindSceneSleepEvent(
        gameObject: Phaser.GameObjects.GameObject,
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    bindSceneWakeEvent(
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    bindSceneWakeEvent(
        gameObject: Phaser.GameObjects.GameObject,
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    bindSceneShutdownEvent(
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    bindSceneShutdownEvent(
        gameObject: Phaser.GameObjects.GameObject,
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    bindSceneResizeEvent(
        callback: Function,
        scope?: unknown,
        once?: boolean,
    ): this;

    getShownChildren(
        out?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject[];

    getAllShownChildren(
        out?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject[];

    getInnerPadding(
        key?: string
    ): number | { left: number, right: number, top: number, bottom: number };

    setInnerPadding(
        key: string,
        value?: number
    ): this;

    setInnerPadding(
        padding: number | { left?: number, right?: number, top?: number, bottom?: number },
    ): this;

    getOutterPadding(
        key?: string
    ): number | { left: number, right: number, top: number, bottom: number };

    setOuterPadding(
        key: string,
        value?: number
    ): this;

    setOuterPadding(
        padding: number | { left?: number, right?: number, top?: number, bottom?: number },
    ): this;

    getChildOutterPadding(
        child: string | Phaser.GameObjects.GameObject,
        key?: string
    ): number | { left: number, right: number, top: number, bottom: number };

    setChildOuterPadding(
        child: string | Phaser.GameObjects.GameObject,
        key: string,
        value?: number
    ): this;

    setChildOuterPadding(
        child: string | Phaser.GameObjects.GameObject,
        padding: number | { left?: number, right?: number, top?: number, bottom?: number },
    ): this;

    pointToChild(
        x: number,
        y: number,
        preTest?: (gameObject: Phaser.GameObjects.GameObject, x: number, y: number) => boolean,
        postTest?: (gameObject: Phaser.GameObjects.GameObject, x: number, y: number) => boolean,
        children?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject;
}