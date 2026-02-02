import WipeController from '../wipe/WipeController';

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            /**
             * Add a Phaser 3 style wipe effect controller.
             */
            addP3Wipe: (
                /**
                 * Width of the wipe band in range 0 to 1.
                 */
                wipeWidth?: number,
                /**
                 * Wipe direction.
                 */
                direction?: number,
                /**
                 * Wipe axis.
                 */
                axis?: number
            ) => WipeController,
            /**
             * Add a Phaser 3 style reveal effect controller.
             */
            addP3Reveal: (
                /**
                 * Width of the reveal band in range 0 to 1.
                 */
                wipeWidth?: number,
                /**
                 * Reveal direction.
                 */
                direction?: number,
                /**
                 * Reveal axis.
                 */
                axis?: number
            ) => WipeController,
        }
    }
}

/**
 * Install Phaser 3 style wipe FX support.
 *
 * @param scene - Scene or game instance used for installation.
 * @returns True if wipe FX was installed, false if already unavailable or not registered.
 */
declare function InstallWipeFX(scene: Phaser.Scene | Phaser.Game): boolean;

export default InstallWipeFX;

export { WipeController };
