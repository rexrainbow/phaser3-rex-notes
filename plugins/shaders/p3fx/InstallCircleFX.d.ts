import CircleController from '../circle/CircleController';

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            /**
             * Add a Phaser 3 style circle effect controller.
             */
            addP3Circle: (
                /**
                 * Ring thickness.
                 */
                thickness?: number,
                /**
                 * Ring color as a hex number.
                 */
                color?: number,
                /**
                 * Background color as a hex number.
                 */
                backgroundColor?: number,
                /**
                 * Ring scale factor.
                 */
                scale?: number,
                /**
                 * Edge feather amount.
                 */
                feather?: number
            ) => CircleController,
        }
    }
}

/**
 * Install Phaser 3 style circle FX support.
 *
 * @param scene - Scene or game instance used for installation.
 * @returns True if circle FX was installed, false if already unavailable or not registered.
 */
declare function InstallCircleFX(scene: Phaser.Scene | Phaser.Game): boolean;

export default InstallCircleFX;

export { CircleController };
