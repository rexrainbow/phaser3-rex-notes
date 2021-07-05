// import * as Phaser from 'phaser';
import OverlapSizer from '../overlapsizer/OverlapSizer';
import { IConfig as IConfigBase } from '../overlapsizer/OverlapSizer';

export interface IConfig extends IConfigBase {
    background?: Phaser.GameObjects.GameObject,
    main?: Phaser.GameObjects.GameObject,

    leftTop?: Phaser.GameObjects.GameObject,
    centerTop?: Phaser.GameObjects.GameObject,
    rightTop?: Phaser.GameObjects.GameObject,
    leftCenter?: Phaser.GameObjects.GameObject,
    center?: Phaser.GameObjects.GameObject,
    rightCenter?: Phaser.GameObjects.GameObject,
    leftBottom?: Phaser.GameObjects.GameObject,
    centerBottom?: Phaser.GameObjects.GameObject,
    rightBottom?: Phaser.GameObjects.GameObject,
}

export default class BadgeLabel extends OverlapSizer {

    constructor(
        scene: Phaser.Scene,
        config?: IConfig
    );
}