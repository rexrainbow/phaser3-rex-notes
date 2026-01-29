import Scale from './Scale';

/**
 * Scale down a game object and destroy on complete.
 * @param gameObject - Target game object.
 * @param duration - Duration in ms.
 * @param orientation - Orientation mode.
 * @param ease - Ease name.
 * @param scale - Optional Scale instance.
 * @returns Scale instance.
 */
export default function ScaleDownDestroy(
    gameObject: Phaser.GameObjects.GameObject,
    duration: number,
    orientation?: number | string,
    ease?: string,
    scale?: Scale
): Scale;

/**
 * Scale down a game object with optional destroy mode.
 * @param gameObject - Target game object.
 * @param duration - Duration in ms.
 * @param orientation - Orientation mode.
 * @param ease - Ease name.
 * @param destroyMode - True to destroy on complete.
 * @param scale - Optional Scale instance.
 * @returns Scale instance.
 */
export default function ScaleDownDestroy(
    gameObject: Phaser.GameObjects.GameObject,
    duration: number,
    orientation?: number | string,
    ease?: string,
    destroyMode?: boolean,
    scale?: Scale
): Scale;
