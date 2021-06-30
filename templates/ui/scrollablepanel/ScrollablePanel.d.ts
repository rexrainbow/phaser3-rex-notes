import * as Phaser from 'phaser';
import Scrollable from '../utils/scrollable/Scrollable';
import { IConfig as IConfigBase } from '../utils/scrollable/Scrollable';

export interface IConfig extends IConfigBase {
    space?: {
        left?: number, right?: number, top?: number, bottom?: number,

        panel?: number | {
            left?: number, right?: number, top?: number, bottom?: number,
        },

        header?: number,
        footer?: number,
    },

    panel: {
        child: Phaser.GameObjects.GameObject,
        mask?: {
            padding?: 0,
            updateMode?: 0 | 1 | 'update' | 'everyTick'
        } |
        boolean,
    },
}

export default class ScrollablePanel extends Scrollable {
    constructor(
        scene: Phaser.Scene,
        config?: IConfig
    );

}