import * as Phaser from 'phaser';
import DialogFactory from './dialog/Factory';
import LabelFactory from './label/Factory';
import RoundRectangleFactory from './roundrectangle/Factory';

export default class UIFactories {
    constructor(scene: Phaser.Scene);

    add: {
        dialog: DialogFactory,
        label: LabelFactory,
        roundRectangle: RoundRectangleFactory
    }
}