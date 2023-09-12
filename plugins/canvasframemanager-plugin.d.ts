import FrameManager from './canvasframemanager';

export default class CanvasFrameManagerPlugin extends Phaser.Plugins.BasePlugin {
    add(
        scene: Phaser.Scene,
        key: string,
        width?: number,
        height?: number,
        cellWidth?: number,
        cellHeight?: number,
        fillColor?: string
    ): FrameManager;

    add(
        scene: Phaser.Scene,
        config: FrameManager.IConfig
    ): FrameManager;

}