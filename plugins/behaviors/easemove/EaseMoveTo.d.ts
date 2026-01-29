import EaseMove from './EaseMove';

/**
 * Ease a game object to an end position.
 * @param gameObject - Target game object.
 * @param duration - Duration in ms.
 * @param endX - End x.
 * @param endY - End y.
 * @param ease - Ease name.
 * @param destroyMode - True to destroy on complete.
 * @param easeMove - Optional EaseMove instance.
 * @returns EaseMove instance.
 */
declare function EaseMoveTo(
    gameObject: Phaser.GameObjects.GameObject,
    duration: number,
    endX: number | string | undefined,
    endY: number | string | undefined,
    ease?: string,
    destroyMode?: boolean,
    easeMove?: EaseMove
): EaseMove;

/**
 * Ease a game object to an end position.
 * @param gameObject - Target game object.
 * @param duration - Duration in ms.
 * @param endX - End x.
 * @param endY - End y.
 * @param ease - Ease name.
 * @param easeMove - Optional EaseMove instance.
 * @returns EaseMove instance.
 */
declare function EaseMoveTo(
    gameObject: Phaser.GameObjects.GameObject,
    duration: number,
    endX: number | string | undefined,
    endY: number | string | undefined,
    ease?: string,
    easeMove?: EaseMove
): EaseMove;

export default EaseMoveTo;
