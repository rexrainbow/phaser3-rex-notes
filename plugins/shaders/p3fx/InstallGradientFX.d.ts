import GradientController from '../gradient/GradientController';

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            addP3Gradient: (color1?: number, color2?: number, alpha?: number, fromX?: number, fromY?: number, toX?: number, toY?: number, size?: number) => GradientController,
        }
    }
}

declare function InstallGradientFX(scene: Phaser.Scene | Phaser.Game): boolean;

export default InstallGradientFX;

export { GradientController };