import EaseMove from './EaseMove';

/**
 * Ease a game object from a start position.
 * @param gameObject - Target game object.
 * @param duration - Duration in ms.
 * @param startX - Start x.
 * @param startY - Start y.
 * @param ease - Ease name.
 * @param destroyMode - True to destroy on complete.
 * @param easeMove - Optional EaseMove instance.
 * @returns EaseMove instance.
 */
declare function EaseMoveFrom(
    gameObject: Phaser.GameObjects.GameObject,
    duration: number,
    startX: number | string | undefined,
    startY: number | string | undefined,
    ease?: string,
    destroyMode?: boolean,
    easeMove?: EaseMove
): EaseMove;

/**
 * Ease a game object from a start position.
 * @param gameObject - Target game object.
 * @param duration - Duration in ms.
 * @param startX - Start x.
 * @param startY - Start y.
 * @param ease - Ease name.
 * @param easeMove - Optional EaseMove instance.
 * @returns EaseMove instance.
 */
declare function EaseMoveFrom(
    gameObject: Phaser.GameObjects.GameObject,
    duration: number,
    startX: number | string | undefined,
    startY: number | string | undefined,
    ease?: string,
    easeMove?: EaseMove
): EaseMove;

export default EaseMoveFrom;
