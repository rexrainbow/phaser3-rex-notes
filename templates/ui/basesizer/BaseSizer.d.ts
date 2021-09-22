// import * as Phaser from 'phaser';
import ContainerLite from '../../../plugins/containerlite.js';

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

        anchor?: {
            left?: string, right?: string, centerX?: string, x?: string,
            top?: string, bottom?: string, centerY?: string, y?: string
        },

        name?: string

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

    pin(
        gameObject: Phaser.GameObjects.GameObject
    ): this;

    addBackground(
        gameObject: Phaser.GameObjects.GameObject,
        padding?: BaseSizer.PaddingTypes,
        childKey?: string
    ): this;

    isBackground(
        gameObject: Phaser.GameObjects.GameObject
    ): boolean;

    layout(): this;

    drawBounds(
        graphics: Phaser.GameObjects.Graphics,
        config?: number |
        {
            color?: number,
            name?: boolean |
            {
                createTextCallback: (scene: Phaser.Scene) => Phaser.GameObjects.GameObject,
                createTextCallbackScope?: object,
                align?: BaseSizer.AlignTypes
            }
        }
    ): this;

    addChildrenMap(
        key: string,
        gameObject: Phaser.GameObjects.GameObject
    ): this;

    getElement(
        name: string,
        recursive?: boolean
    ): Phaser.GameObjects.GameObject | null;

    getParentSizer(
        gameObject?: Phaser.GameObjects.GameObject
    ): BaseSizer | null;

    getTopmostSizer(
        gameObject?: Phaser.GameObjects.GameObject
    ): BaseSizer | null;

    getChildPrevState(
        gameObject: Phaser.GameObjects.GameObject
    ): BaseSizer.PrevState;

    isInTouching(): boolean;

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

    fadeIn(
        duration: number,
        alpha?: number
    ): this;

    fadeInPromoise(
        duration: number,
        alpha?: number
    ): Promise<any>;

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

    setAnchor(config: {
        left?: string, right?: string, centerX?: string, x?: string,
        top?: string, bottom?: string, centerY?: string, y?: string
    }): this;

    setDraggable(
        senser: boolean | string | Phaser.GameObjects.GameObject,
        draggable?: boolean
    ): this;

    show(
        gameObject: Phaser.GameObjects.GameObject
    ): this;

    hide(
        gameObject: Phaser.GameObjects.GameObject
    ): this;

    isShow(
        gameObject: Phaser.GameObjects.GameObject
    ): boolean;

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
        key: string | number | { left?: number, right?: number, top?: number, bottom?: number },
        value?: number
    ): this;

    getOutterPadding(
        key?: string
    ): number | { left: number, right: number, top: number, bottom: number };

    setOuterPadding(
        key: string | number | { left?: number, right?: number, top?: number, bottom?: number },
        value?: number
    ): this;

    getChildOutterPadding(
        child: string | Phaser.GameObjects.GameObject,
        key?: string
    ): number | { left: number, right: number, top: number, bottom: number };

    setChildOuterPadding(
        child: string | Phaser.GameObjects.GameObject,
        key: string | number | { left?: number, right?: number, top?: number, bottom?: number },
        value?: number
    ): this;

    pointToChild(
        x: number,
        y: number,
        preTest?: (gameObject: Phaser.GameObjects.GameObject, x: number, y: number) => boolean,
        postTest?: (gameObject: Phaser.GameObjects.GameObject, x: number, y: number) => boolean,
        children?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject;
}