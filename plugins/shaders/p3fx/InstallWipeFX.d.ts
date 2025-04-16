import WipeController from '../wipe/WipeController';

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            addP3Wipe: (wipeWidth?: number, direction?: number, axis?: number) => WipeController,
            addP3Reveal: (wipeWidth?: number, direction?: number, axis?: number) => WipeController,
        }
    }
}

declare function InstallWipeFX(scene: Phaser.Scene | Phaser.Game): boolean;

export default InstallWipeFX;

export { WipeController };