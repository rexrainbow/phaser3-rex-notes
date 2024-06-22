import {
    ControllerPack,
    PanScroll,
    PinchZoom,
    BoundsScroll,
    MouseWheelZoom
} from './cameracontroller';

export default class LifeTimePlugin extends Phaser.Plugins.BasePlugin {
    add(
        scene: Phaser.Scene,
        config?: ControllerPack.IConfig
    ): ControllerPack;

    
    addPanScroll(
        scene: Phaser.Scene,
        config?: PanScroll.IConfig
    ): PanScroll;

    addPinchZoom(
        scene: Phaser.Scene,
        config?: PinchZoom.IConfig
    ): PinchZoom;

    addBoundsScroll(
        scene: Phaser.Scene,
        config?: BoundsScroll.IConfig
    ): BoundsScroll;

    addMouseWheelZoom(
        scene: Phaser.Scene,
        config?: MouseWheelZoom.IConfig
    ): MouseWheelZoom;
}