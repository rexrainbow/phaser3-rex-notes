import ShineController from '../shine/ShineController';

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            /**
             * Add a Phaser 3 style shine effect controller.
             */
            addP3Shine: (
                /**
                 * Shine animation speed.
                 */
                speed?: number,
                /**
                 * Width of the shine line.
                 */
                lineWidth?: number,
                /**
                 * Gradient falloff of the shine line.
                 */
                gradient?: number,
                /**
                 * Reveal mode toggle.
                 */
                reveal?: boolean
            ) => ShineController,
        }
    }
}

/**
 * Install Phaser 3 style shine FX support.
 *
 * @param scene - Scene or game instance used for installation.
 * @returns True if shine FX was installed, false if already unavailable or not registered.
 */
declare function InstallShineFX(scene: Phaser.Scene | Phaser.Game): boolean;

export default InstallShineFX;

export { ShineController };
