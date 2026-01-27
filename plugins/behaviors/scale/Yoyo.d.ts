import Scale from './Scale';

/**
 * Scale a game object with a yoyo effect.
 * @param gameObject - Target game object.
 * @param duration - Duration in ms.
 * @param peakValue - Peak scale value.
 * @param repeat - Repeat count.
 * @param orientation - Orientation mode.
 * @param ease - Ease name.
 * @param scale - Optional Scale instance.
 * @returns Scale instance.
 */
export default function Yoyo(
    gameObject: Phaser.GameObjects.GameObject,
    duration: number,
    peakValue?: number,
    repeat?: number,
    orientation?: number | string,
    ease?: string,
    scale?: Scale
): Scale;
