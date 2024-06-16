import {
    ControllerPack,
    PinchController,
    BoundsWheelController
} from './cameracontroller';

export default class LifeTimePlugin extends Phaser.Plugins.BasePlugin {
    add(
        scene: Phaser.Scene,
        config?: ControllerPack.IConfig
    ): ControllerPack;

    addPinchController(
        scene: Phaser.Scene,
        config?: PinchController.IConfig
    ): PinchController;


    addBoundsWheelController(
        scene: Phaser.Scene,
        config?: BoundsWheelController.IConfig
    ): BoundsWheelController;

}