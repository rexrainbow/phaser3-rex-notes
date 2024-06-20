import {
    ControllerPack,
} from './cameracontroller';

export default class LifeTimePlugin extends Phaser.Plugins.BasePlugin {
    add(
        scene: Phaser.Scene,
        config?: ControllerPack.IConfig
    ): ControllerPack;

}