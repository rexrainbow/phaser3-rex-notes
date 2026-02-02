import BloomController from '../bloom/BloomController';

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            /**
             * Add a Phaser 3 style bloom effect controller.
             */
            addP3Bloom: (
                /**
                 * Bloom tint color as a hex number.
                 */
                color?: number,
                /**
                 * Horizontal blur offset.
                 */
                offsetX?: number,
                /**
                 * Vertical blur offset.
                 */
                offsetY?: number,
                /**
                 * Per-step blur strength.
                 */
                blurStrength?: number,
                /**
                 * Final blend strength.
                 */
                strength?: number,
                /**
                 * Number of bloom step pairs.
                 */
                steps?: number
            ) => BloomController,
        }
    }
}

/**
 * Install Phaser 3 style bloom FX support.
 *
 * @param scene - Scene or game instance used for installation.
 * @returns True if bloom FX was installed, false if already unavailable or not registered.
 */
declare function InstallBloomFX(scene: Phaser.Scene | Phaser.Game): boolean;

export default InstallBloomFX;

export { BloomController };
