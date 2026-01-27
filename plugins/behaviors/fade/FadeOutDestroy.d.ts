import Fade from './Fade';

/**
 * Fade out a game object and destroy on complete.
 * @param gameObject - Target game object.
 * @param duration - Duration in ms.
 * @param fade - Optional Fade instance.
 * @returns Fade instance.
 */
export default function FadeOutDestroy(
    gameObject: Phaser.GameObjects.GameObject,
    duration: number,
    fade?: Fade
): Fade;

/**
 * Fade out a game object with optional destroy mode.
 * @param gameObject - Target game object.
 * @param duration - Duration in ms.
 * @param destroyMode - True to destroy on complete.
 * @param fade - Optional Fade instance.
 * @returns Fade instance.
 */
export default function FadeOutDestroy(
    gameObject: Phaser.GameObjects.GameObject,
    duration: number,
    destroyMode?: boolean,
    fade?: Fade
): Fade;
