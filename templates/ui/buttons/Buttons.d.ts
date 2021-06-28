import * as Phaser from 'phaser';
import Sizer from '../sizer/Sizer';

export default class Buttons extends Sizer {
    constructor(
        scene: Phaser.Scene,

        config?: {
            x?: number;
            y?: number;
            width?: number;
            height?: number;

            orientation?: 0 | 1 | 'x' | 'y' | 'h' | 'v' | 'horizontal' | 'vertical' | 'left-to-right' | 'top-to-bottom';

            space?: {
                left?: number,
                right?: number,
                top?: number,
                bottom?: number,

                item?: number
            };

            anchor?: {
                left?: string, right?: string, centerX?: string, x?: string,
                top?: string, bottom?: string, centerY?: string, y?: string
            },

            draggable?: boolean | string | Phaser.GameObjects.GameObject,

            name?: string,

            background?: Phaser.GameObjects.GameObject,

            buttons?: Phaser.GameObjects.GameObject[],

            expand?: boolean,

            align?: 'left' | 'top' | 'right' | 'bottom' | 'center',

            click?: {
                mode: 0 | 1 | 'pointerup' | 'pointerdown' | 'release' | 'press',
                clickInterval?: number
            },

            groupName?: string,

            eventEmitter?: Phaser.GameObjects.GameObject,

            type?: 'checkboxes' | 'radio',

            setValueCallback?: (button: Phaser.GameObjects.GameObject, value: boolean, previousValue: number | boolean) => void,

            setValueCallbackScope?: unknown
        }
    );

    emitButtonClick(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    setButtonEnable(
        index: number | Phaser.GameObjects.GameObject,
        enable?: boolean
    ): this;

    toggleButtonEnable(
        index?: number | Phaser.GameObjects.GameObject
    ): this;

    getButtonEnable(
        index: number | Phaser.GameObjects.GameObject
    ): boolean;

    addButton(
        gameObject: Phaser.GameObjects.GameObject
    ): this;

    removeButton(
        gameObject: Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    clearButtons(
        destroyChild?: boolean
    ): this;

    showButton(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    hideButton(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    forEachButtton(
        callback: (button: Phaser.GameObjects.GameObject, index: number, buttons: Phaser.GameObjects.GameObject[]) => void,
        scop?: unknown
    ): this;
}