import GradientController from '../gradient/GradientController';

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            /**
             * Add a Phaser 3 style gradient effect controller.
             */
            addP3Gradient: (
                /**
                 * First gradient color as a hex number.
                 */
                color1?: number,
                /**
                 * Second gradient color as a hex number.
                 */
                color2?: number,
                /**
                 * Overall gradient alpha.
                 */
                alpha?: number,
                /**
                 * Gradient start x coordinate.
                 */
                fromX?: number,
                /**
                 * Gradient start y coordinate.
                 */
                fromY?: number,
                /**
                 * Gradient end x coordinate.
                 */
                toX?: number,
                /**
                 * Gradient end y coordinate.
                 */
                toY?: number,
                /**
                 * Gradient size parameter.
                 */
                size?: number
            ) => GradientController,
        }
    }
}

/**
 * Install Phaser 3 style gradient FX support.
 *
 * @param scene - Scene or game instance used for installation.
 * @returns True if gradient FX was installed, false if already unavailable or not registered.
 */
declare function InstallGradientFX(scene: Phaser.Scene | Phaser.Game): boolean;

export default InstallGradientFX;

export { GradientController };
