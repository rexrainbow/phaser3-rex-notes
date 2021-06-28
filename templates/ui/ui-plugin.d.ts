import * as Phaser from 'phaser';

import ContainerFactory from './container/Factory';
import DialogFactory from './dialog/Factory';
import LabelFactory from './label/Factory';
import RoundRectangleFactory from './roundrectangle/Factory';

export default class UIFactories {
    constructor(scene: Phaser.Scene);

    add: {
        container: ContainerFactory,
        dialog: DialogFactory,
        label: LabelFactory,
        roundRectangle: RoundRectangleFactory
    }
}