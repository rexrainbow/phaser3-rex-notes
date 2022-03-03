import CanvasFrameManager from './CanvasFrameManager';

export default class CanvasDataPlugin extends Phaser.Plugins.BasePlugin {
    add(
        scene: Phaser.Scene,
        key: string,
        width?: number,
        height?: number,
        cellWidth?: number,
        cellHeight?: number,
        fillColor?: string
    ): CanvasFrameManager;

    add(
        scene: Phaser.Scene,
        config: CanvasFrameManager.IConfig
    ): CanvasFrameManager;

}