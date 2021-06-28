import * as Phaser from 'phaser';
import Sizer from '../sizer/Sizer';

export default class Dialog extends Sizer {
    constructor(
        scene: Phaser.Scene,

        config?: {
            x?: number;
            y?: number;
            width?: number;
            height?: number;

            space?: {
                left?: number,
                right?: number,
                top?: number,
                bottom?: number,

                title?: number,
                titleLeft?: number,
                titleRight?: number,
                content?: number,
                contentLeft?: number,
                contentRight?: number,
                description?: number,
                descriptionLeft?: number,
                descriptionRight?: number,
                choices?: number,
                choicesLeft?: number,
                choicesRight?: number,
                actionsLeft?: number,
                actionsRight?: number,

                toolbarItem?: number,
                leftToolbarItem?: number,
                choice?: number,
                action?: number,
            };

            anchor?: {
                left?: string, right?: string, centerX?: string, x?: string,
                top?: string, bottom?: string, centerY?: string, y?: string
            },

            draggable?: boolean | string | Phaser.GameObjects.GameObject,

            name?: string,

            background?: Phaser.GameObjects.GameObject,

            title?: Phaser.GameObjects.GameObject,

            toolbar?: Phaser.GameObjects.GameObject[],

            toolbarBackground?: Phaser.GameObjects.GameObject,

            leftToolbar?: Phaser.GameObjects.GameObject[],

            leftToolbarBackground?: Phaser.GameObjects.GameObject,

            content?: Phaser.GameObjects.GameObject,

            description?: Phaser.GameObjects.GameObject,

            choices?: Phaser.GameObjects.GameObject[],

            choicesBackground?: Phaser.GameObjects.GameObject,

            actions?: Phaser.GameObjects.GameObject[],

            actionsBackground?: Phaser.GameObjects.GameObject,

            expand?: {
                title?: boolean,
                content?: boolean,
                description?: boolean,
                choices?: boolean,
                actions?: boolean,
            },

            align?: {
                title?: number | 'left' | 'center' | 'right',
                content?: number | 'left' | 'center' | 'right',
                description?: number | 'left' | 'center' | 'right',
                choices?: number | 'left' | 'center' | 'right',
                actions?: number | 'left' | 'center' | 'right',
            },

            click?: {
                mode: 0 | 1 | 'pointerup' | 'pointerdown' | 'release' | 'press',
                clickInterval?: number
            }
        }
    );

    emitChoiceClick(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    emitActionClick(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    emitToolbarClick(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    emitLeftToolbarClick(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    setChoiceEnable(
        index: number | Phaser.GameObjects.GameObject,
        enable?: boolean
    ): this;

    setActionEnable(
        index: number | Phaser.GameObjects.GameObject,
        enable?: boolean
    ): this;

    setToolbarEnable(
        index: number | Phaser.GameObjects.GameObject,
        enable?: boolean
    ): this;

    setLeftToolbarEnable(
        index: number | Phaser.GameObjects.GameObject,
        enable?: boolean
    ): this;

    toggleChoiceEnable(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    toggleActionEnable(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    toggleToolbarEnable(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    toggleLeftToolbarEnable(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    getChoiceEnable(
        index: number | Phaser.GameObjects.GameObject
    ): boolean;

    getActionEnable(
        index: number | Phaser.GameObjects.GameObject
    ): boolean;

    getToolbarEnable(
        index: number | Phaser.GameObjects.GameObject
    ): boolean;

    getLeftToolbarEnable(
        index: number | Phaser.GameObjects.GameObject
    ): boolean;

    addChoice(gameObject: Phaser.GameObjects.GameObject): this;

    addAction(gameObject: Phaser.GameObjects.GameObject): this;

    addToolbar(gameObject: Phaser.GameObjects.GameObject): this;

    addLeftToolbar(gameObject: Phaser.GameObjects.GameObject): this;

    removeChoice(
        index: number | Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    removeAction(
        index: number | Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    removeToolbar(
        index: number | Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    removeLeftToolbar(
        index: number | Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    clearChoices(destroyChild?: boolean): this;

    clearActions(destroyChild?: boolean): this;

    clearToolbar(destroyChild?: boolean): this;

    clearLeftToolbar(destroyChild?: boolean): this;

    showChoice(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    showAction(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    showToolbar(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    showLeftToolbar(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    hideChoice(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    hideAction(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    hideToolbar(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    hideLeftToolbar(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    forEachChoice(
        callback: (button: Phaser.GameObjects.GameObject, index: number, buttons: Phaser.GameObjects.GameObject[]) => void,
        scop?: unknown
    ): this;

    forEachAction(
        callback: (button: Phaser.GameObjects.GameObject, index: number, buttons: Phaser.GameObjects.GameObject[]) => void,
        scop?: unknown
    ): this;

    forEachToolbar(
        callback: (button: Phaser.GameObjects.GameObject, index: number, buttons: Phaser.GameObjects.GameObject[]) => void,
        scop?: unknown
    ): this;

    forEachLeftToolbar(
        callback: (button: Phaser.GameObjects.GameObject, index: number, buttons: Phaser.GameObjects.GameObject[]) => void,
        scop?: unknown
    ): this;
}