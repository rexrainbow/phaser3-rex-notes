import * as Phaser from 'phaser';
import ContainerLite from '../../../plugins/containerlite.js';

export interface IConfig {
    space?: {
        left?: number, right?: number, top?: number, bottom?: number,
    },

    anchor?: {
        left?: string, right?: string, centerX?: string, x?: string,
        top?: string, bottom?: string, centerY?: string, y?: string
    },

    draggable?: boolean | string | Phaser.GameObjects.GameObject,
    
    name?: string
}

export default class BaseSizer extends ContainerLite {
    isRexSizer: true;

    space: { [name: string]: number };

    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        minWidth?: number, minHeight?: number,
        config?: IConfig
    );

    setMinSize(minWidth: number, minHeight: number): this;

    setMinWidth(minWidth: number): this;

    setMinHeight(minHeight: number): this;

    setDirty(dirty?: boolean): this;

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

    get innerLeft(): number;

    get innerRight(): number;

    get innerTop(): number;

    get innerBottom(): number;

    get innerWidth(): number;

    get innerHeight(): number;

    get minInnerWidth(): number;

    get minInnerHeigt(): number;

    pin(
        gameObject: Phaser.GameObjects.GameObject
    ): this;

    addBackground(
        gameObject: Phaser.GameObjects.GameObject,
        padding?: number |
        {
            left?: number,
            right?: number,
            top?: number,
            bottom?: number
        },
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
                createTextCallbackScope?: any,
                align?: number | 'center' | 'left' | 'right' | 'top' | 'bottom' |
                'left-top' | 'left-center' | 'left-bottom' |
                'center-top' | 'center-center' | 'center-bottom' |
                'right-top' | 'right-center' | 'right-bottom'
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

    isInTouching(): boolean;

    moveFrom(
        duration: number,
        x: number,
        y: number,
        ease?: string
    ): this;

    moveFromPromise(
        duration: number,
        x: number,
        y: number,
        ease?: string
    ): Promise<any>;

    moveFromDestroy(
        duration: number,
        x: number,
        y: number,
        ease?: string
    ): this;

    moveFromDestroyPromise(
        duration: number,
        x: number,
        y: number,
        ease?: string
    ): Promise<any>;

    moveTo(
        duration: number,
        x: number,
        y: number,
        ease?: string
    ): this;

    moveToPromise(
        duration: number,
        x: number,
        y: number,
        ease?: string
    ): Promise<any>;

    moveToDestroy(
        duration: number,
        x: number,
        y: number,
        ease?: string
    ): this;

    moveToDestroyPromise(
        duration: number,
        x: number,
        y: number,
        ease?: string
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

    pointToChild(
        x: number,
        y: number,
        preTest?: (gameObject: Phaser.GameObjects.GameObject, x: number, y: number) => boolean,
        postTest?: (gameObject: Phaser.GameObjects.GameObject, x: number, y: number) => boolean,
        children?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject;
}