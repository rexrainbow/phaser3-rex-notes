import ShineController from '../shine/ShineController';

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            addP3Shine: (speed?: number, lineWidth?: number, gradient?: number, reveal?: boolean) => ShineController,
        }
    }
}

declare function InstallShineFX(scene: Phaser.Scene | Phaser.Game): boolean;

export default InstallShineFX;

export { ShineController };