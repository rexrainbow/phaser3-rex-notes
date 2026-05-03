import { CircleController } from './InstallCircleFX';
import { GradientController } from './InstallGradientFX';
import { ShineController } from './InstallShineFX';

/**
 * Install all Phaser 3 style FX helpers.
 *
 * @param scene - Scene or game instance used for installation.
 * @returns True if at least one FX installer succeeded.
 */
declare function InstallP3FX(scene: Phaser.Scene | Phaser.Game): boolean;

export default InstallP3FX;

export {
    CircleController, GradientController, ShineController,
}
