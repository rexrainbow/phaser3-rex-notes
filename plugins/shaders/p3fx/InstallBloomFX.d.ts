import BloomController from '../bloom/BloomController';

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            addP3Bloom: (color?: number, offsetX?: number, offsetY?: number, blurStrength?: number, strength?: number, steps?: number) => BloomController,
        }
    }
}

declare function InstallBloomFX(scene: Phaser.Scene | Phaser.Game): boolean;

export default InstallBloomFX;

export { BloomController };