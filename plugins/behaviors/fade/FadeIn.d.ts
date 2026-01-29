import Fade from './Fade';

/**
 * Fade in a game object.
 * @param gameObject - Target game object.
 * @param duration - Duration in ms.
 * @param alpha - Alpha value or range.
 * @param fade - Optional Fade instance.
 * @returns Fade instance.
 */
export default function FadeIn(
    gameObject: Phaser.GameObjects.GameObject,
    duration: number,
    alpha?: number | { start: number, end: number },
    fade?: Fade
): Fade;
