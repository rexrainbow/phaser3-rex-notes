
/**
 * Scale up a game object with a pop-up effect.
 * @param duration - Duration in ms.
 * @param orientation - Orientation mode.
 * @param ease - Ease name.
 * @returns Target game object.
 */
declare function PopUp(
    duration: number,
    orientation?: 0 | 1 | 'x' | 'y',
    ease?: string
): Phaser.GameObjects.GameObject;

/**
 * Scale up a game object with a pop-up effect and return a promise.
 * @param duration - Duration in ms.
 * @param orientation - Orientation mode.
 * @param ease - Ease name.
 * @returns Promise resolved on complete.
 */
declare function PopUpPromise(
    duration: number,
    orientation?: 0 | 1 | 'x' | 'y',
    ease?: string
): Promise<any>;

/**
 * Test if a pop-up is running.
 * @returns True if running.
 */
declare function IsRunningPopUp(): boolean;

/**
 * Scale down a game object and destroy on complete.
 * @param duration - Duration in ms.
 * @param orientation - Orientation mode.
 * @param ease - Ease name.
 * @returns Target game object.
 */
declare function ScaleDownDestroy(
    duration: number,
    orientation?: 0 | 1 | 'x' | 'y',
    ease?: string
): Phaser.GameObjects.GameObject;

/**
 * Scale down a game object and destroy on complete, returning a promise.
 * @param duration - Duration in ms.
 * @param orientation - Orientation mode.
 * @param ease - Ease name.
 * @returns Promise resolved on complete.
 */
declare function ScaleDownDestroyPromise(
    duration: number,
    orientation?: 0 | 1 | 'x' | 'y',
    ease?: string
): Promise<any>;

/**
 * Scale down a game object.
 * @param duration - Duration in ms.
 * @param orientation - Orientation mode.
 * @param ease - Ease name.
 * @returns Target game object.
 */
declare function ScaleDown(
    duration: number,
    orientation?: 0 | 1 | 'x' | 'y',
    ease?: string
): Phaser.GameObjects.GameObject;

/**
 * Scale down a game object and return a promise.
 * @param duration - Duration in ms.
 * @param orientation - Orientation mode.
 * @param ease - Ease name.
 * @returns Promise resolved on complete.
 */
declare function ScaleDownPromise(
    duration: number,
    orientation?: 0 | 1 | 'x' | 'y',
    ease?: string
): Promise<any>;

/**
 * Test if a scale-down is running.
 * @returns True if running.
 */
declare function IsRunningScaleDown(): boolean;

/**
 * Scale a game object with a yoyo effect.
 * @param duration - Duration in ms.
 * @param peakValue - Peak scale value.
 * @param repeat - Repeat count.
 * @param orientation - Orientation mode.
 * @param ease - Ease name.
 * @returns Target game object.
 */
declare function ScaleYoyo(
    duration: number,
    peakValue?: number,
    repeat?: number,
    orientation?: 0 | 1 | 'x' | 'y',
    ease?: string
): Phaser.GameObjects.GameObject;

/**
 * Scale a game object with a yoyo effect and return a promise.
 * @param duration - Duration in ms.
 * @param peakValue - Peak scale value.
 * @param repeat - Repeat count.
 * @param orientation - Orientation mode.
 * @param ease - Ease name.
 * @returns Promise resolved on complete.
 */
declare function ScaleYoyoPromise(
    duration: number,
    peakValue?: number,
    repeat?: number,
    orientation?: 0 | 1 | 'x' | 'y',
    ease?: string
): Promise<any>;

/**
 * Test if a scale-yoyo is running.
 * @returns True if running.
 */
declare function IsRunningScaleYoyo(): boolean;

/**
 * Test if any ease scale is running.
 * @returns True if running.
 */
declare function IsRunningEaseScale(): boolean;

declare const ScaleMethods: {
    popUp: typeof PopUp,
    popUpPromise: typeof PopUpPromise,
    scaleDownDestroyPromise: typeof ScaleDownDestroyPromise,
    scaleDown: typeof ScaleDown,
    scaleDownDestroy: typeof ScaleDownDestroy,
    scaleDownPromise: typeof ScaleDownPromise,
    scaleYoyo: typeof ScaleYoyo,
    scaleYoyoPromise: typeof ScaleYoyoPromise,

    isRunningPopUp: typeof IsRunningPopUp,
    isRunningScaleDown: typeof IsRunningScaleDown,
    isRunningScaleYoyo: typeof IsRunningScaleYoyo,
    isRunningEaseScale: typeof IsRunningEaseScale,

}

export default ScaleMethods;
export {
    PopUp, PopUpPromise,
    ScaleDown, ScaleDownPromise,
    ScaleDownDestroy, ScaleDownDestroyPromise,
    ScaleYoyo, ScaleYoyoPromise,

    IsRunningPopUp, IsRunningScaleDown, IsRunningScaleYoyo, IsRunningEaseScale,
}
