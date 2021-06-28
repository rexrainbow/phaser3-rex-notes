import * as Phaser from 'phaser';
import LabelFactory from './label/Factory';
import RoundRectangleFactory from './roundrectangle/Factory';

export default class UIFactories {
    constructor(scene: Phaser.Scene);

    add: {
        label: LabelFactory,
        roundRectangle: RoundRectangleFactory
    }
}