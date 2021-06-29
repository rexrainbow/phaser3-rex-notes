import * as Phaser from 'phaser';
import Sizer from '../sizer/Sizer';
import { IConfig as IConfigBase } from '../sizer/Sizer';

export interface IConfig extends IConfigBase {
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

export default class Buttons extends Sizer {
    constructor(
        scene: Phaser.Scene,
        config?: IConfig
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