import Scale from './Scale';

/**
 * Scale down a game object.
 * @param gameObject - Target game object.
 * @param duration - Duration in ms.
 * @param orientation - Orientation mode.
 * @param ease - Ease name.
 * @param scale - Optional Scale instance.
 * @returns Scale instance.
 */
export default function ScaleDown(
    gameObject: Phaser.GameObjects.GameObject,
    duration: number,
    orientation?: number | string,
    ease?: string,
    scale?: Scale
): Scale;
