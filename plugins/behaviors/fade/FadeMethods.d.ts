
/**
 * Fade in a game object.
 * @param duration - Duration in ms.
 * @param alpha - Alpha value.
 * @returns Target game object.
 */
declare function FadeIn(
    duration: number,
    alpha?: number
): Phaser.GameObjects.GameObject;

/**
 * Fade in a game object and return a promise.
 * @param duration - Duration in ms.
 * @param alpha - Alpha value.
 * @returns Promise resolved on complete.
 */
declare function FadeInPromise(
    duration: number,
    alpha?: number
): Promise<any>;

/**
 * Test if a fade-in is running.
 * @returns True if running.
 */
declare function IsRunningFadeIn(): boolean;

/**
 * Fade out a game object and destroy on complete.
 * @param duration - Duration in ms.
 * @returns Target game object.
 */
declare function FadeOutDestroy(
    duration: number
): Phaser.GameObjects.GameObject;

/**
 * Fade out a game object and destroy on complete, returning a promise.
 * @param duration - Duration in ms.
 * @returns Promise resolved on complete.
 */
declare function FadeOutDestroyPromise(
    duration: number
): Promise<any>;

/**
 * Fade out a game object.
 * @param duration - Duration in ms.
 * @returns Target game object.
 */
declare function FadeOut(
    duration: number
): Phaser.GameObjects.GameObject;

/**
 * Fade out a game object and return a promise.
 * @param duration - Duration in ms.
 * @returns Promise resolved on complete.
 */
declare function FadeOutPromise(
    duration: number
): Promise<any>;

/**
 * Test if a fade-out is running.
 * @returns True if running.
 */
declare function IsRunningFadeOut(): boolean;

/**
 * Test if any ease fade is running.
 * @returns True if running.
 */
declare function IsRunningEaseFade(): boolean;

declare const FadeMethods: {
    fadeIn: typeof FadeIn,
    fadeInPromise: typeof FadeInPromise,
    fadeOutDestroy: typeof FadeOutDestroy,
    fadeOutDestroyPromise: typeof FadeOutDestroyPromise,
    fadeOut: typeof FadeOut,
    fadeOutPromise: typeof FadeOutPromise,

    isRunningFadeIn: typeof IsRunningFadeIn,
    isRunningFadeOut: typeof IsRunningFadeOut,
    isRunningEaseFade: typeof IsRunningEaseFade,
}

export default FadeMethods;
export {
    FadeIn, FadeInPromise,
    FadeOutDestroy, FadeOutDestroyPromise,
    FadeOut, FadeOutPromise,

    IsRunningFadeIn, IsRunningFadeOut, IsRunningEaseFade
}
