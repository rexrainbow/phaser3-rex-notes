import * as Phaser from 'phaser';
import Buttons from '../buttons/Buttons';
import { IConfig as IConfigBase } from '../buttons/Buttons';

export interface IConfig extends IConfigBase {
    items: any[],

    createBackgroundCallback?: (items: any[]) => Phaser.GameObjects.GameObject,

    createBackgroundCallbackScope?: unknown,

    createButtonCallback?: (item: any, index: number, items: any[]) => Phaser.GameObjects.GameObject,

    createButtonCallbackScope?: unknown,

    easeIn?: number |
    {
        duration?: number,
        orientation?: 0 | 1 | 'x' | 'y' | 'h' | 'v',
        ease?: string
    },

    easeOut?: number |
    {
        duration?: number,
        orientation?: 0 | 1 | 'x' | 'y' | 'h' | 'v',
        ease?: string
    },

    expandEvent?: 'button.click' | 'button.over',

    subMenuSide?: 0 | 1 | 2 | 3 | 'right' | 'down' | 'left' | 'up',
}

export default class Menu extends Buttons {
    constructor(
        scene: Phaser.Scene,
        config?: IConfig
    );

    collapse(): this;

    collapseSubMenu(): this;
}