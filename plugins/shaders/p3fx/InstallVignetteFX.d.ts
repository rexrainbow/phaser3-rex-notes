import VignetteController from '../vignette/VignetteController';

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            /**
             * Add a Phaser 3 style vignette effect controller.
             */
            addP3Vignette: (
                /**
                 * Vignette center x coordinate.
                 */
                x?: number,
                /**
                 * Vignette center y coordinate.
                 */
                y?: number,
                /**
                 * Vignette radius.
                 */
                radius?: number,
                /**
                 * Vignette strength.
                 */
                strength?: number
            ) => VignetteController,
        }
    }
}

/**
 * Install Phaser 3 style vignette FX support.
 *
 * @param scene - Scene or game instance used for installation.
 * @returns True if vignette FX was installed, false if already unavailable or not registered.
 */
declare function InstallVignetteFX(scene: Phaser.Scene | Phaser.Game): boolean;

export default InstallVignetteFX;

export { VignetteController };
