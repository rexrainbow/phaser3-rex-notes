import { BloomController } from './InstallBloomFX';
import { CircleController } from './InstallCircleFX';
import { GradientController } from './InstallGradientFX';
import { ShineController } from './InstallShineFX';
import { VignetteController } from './InstallVignetteFX';
import { WipeController } from './InstallWipeFX';

/**
 * Install all Phaser 3 style FX helpers.
 *
 * @param scene - Scene or game instance used for installation.
 * @returns True if at least one FX installer succeeded.
 */
declare function InstallP3FX(scene: Phaser.Scene | Phaser.Game): boolean;

export default InstallP3FX;

export {
    BloomController, CircleController, GradientController, ShineController, VignetteController, WipeController
}
