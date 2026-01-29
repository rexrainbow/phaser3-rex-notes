import Scale from './Scale';

/**
 * Scale up a game object with a pop-up effect.
 * @param gameObject - Target game object.
 * @param duration - Duration in ms.
 * @param orientation - Orientation mode.
 * @param ease - Ease name.
 * @param scale - Optional Scale instance.
 * @returns Scale instance.
 */
export default function PopUp(
    gameObject: Phaser.GameObjects.GameObject,
    duration: number,
    orientation?: number | string,
    ease?: string,
    scale?: Scale
): Scale;
