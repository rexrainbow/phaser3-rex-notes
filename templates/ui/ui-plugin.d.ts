import * as Phaser from 'phaser';
import LabelFactory from './label/Factory';

export default class UIFactories {
    constructor(scene: Phaser.Scene);

    add: {
        label: LabelFactory
    }
}