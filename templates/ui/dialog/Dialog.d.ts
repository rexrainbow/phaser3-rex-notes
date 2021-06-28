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

    emitChoiceClick(index: number): this;

    emitActionClick(index: number): this;

    emitToolbarClick(index: number): this;

    emitLeftToolbarClick(index: number): this;

    setChoiceEnable(index: number, enable?: boolean): this;

    setActionEnable(index: number, enable?: boolean): this;

    setToolbarEnable(index: number, enable?: boolean): this;

    setLeftToolbarEnable(index: number, enable?: boolean): this;

    toggleChoiceEnable(index: number): this;

    toggleActionEnable(index: number): this;

    toggleToolbarEnable(index: number): this;

    toggleLeftToolbarEnable(index: number): this;

    getChoiceEnable(index: number): boolean;

    getActionEnable(index: number): boolean;

    getToolbarEnable(index: number): boolean;

    getLeftToolbarEnable(index: number): boolean;

    addChoice(gameObject: Phaser.GameObjects.GameObject): this;

    addAction(gameObject: Phaser.GameObjects.GameObject): this;

    addToolbar(gameObject: Phaser.GameObjects.GameObject): this;

    addLeftToolbar(gameObject: Phaser.GameObjects.GameObject): this;

    removeChoice(index: number, destroyChild?: boolean): this;

    removeAction(index: number, destroyChild?: boolean): this;

    removeToolbar(index: number, destroyChild?: boolean): this;

    removeLeftToolbar(index: number, destroyChild?: boolean): this;

    clearChoices(destroyChild?: boolean): this;

    clearActions(destroyChild?: boolean): this;

    clearToolbar(destroyChild?: boolean): this;

    clearLeftToolbar(destroyChild?: boolean): this;

    showChoice(index: number): this;

    showAction(index: number): this;

    showToolbar(index: number): this;

    showLeftToolbar(index: number): this;

    hideChoice(index: number): this;

    hideAction(index: number): this;

    hideToolbar(index: number): this;

    hideLeftToolbar(index: number): this;

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