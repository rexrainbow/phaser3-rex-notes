import VignetteController from '../vignette/VignetteController';

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            addP3Vignette: (x?: number, y?: number, radius?: number, strength?: number) => VignetteController,
        }
    }
}

declare function InstallVignetteFX(scene: Phaser.Scene | Phaser.Game): boolean;

export default InstallVignetteFX;

export { VignetteController };