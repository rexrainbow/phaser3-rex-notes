// import * as Phaser from 'phaser';
import VirtualJoyStick from './virtualjoystick';
import VectorToCursorKeys from './vectortocursorkeys';

export default class VirtualJoyStickPlugin extends Phaser.Plugins.BasePlugin {
    add(
        scene: Phaser.Scene,
        config?: VirtualJoyStick.IConfig
    ): VirtualJoyStick;

    addVectorToCursorKeys(
        config?: VectorToCursorKeys.IConfig
    ): VectorToCursorKeys;

}