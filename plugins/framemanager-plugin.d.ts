import FrameManager from './framemanager';

export default class FrameManagerPlugin extends Phaser.Plugins.BasePlugin {
    add(
        scene: Phaser.Scene,
        key: string,
        width?: number,
        height?: number,
        cellWidth?: number,
        cellHeight?: number,
        fillColor?: string | number,
        useDynamicTexture?: boolean
    ): FrameManager;

    add(
        scene: Phaser.Scene,
        config: FrameManager.IConfig
    ): FrameManager;

}