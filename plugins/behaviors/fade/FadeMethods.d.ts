
declare function FadeIn(
    duration: number,
    alpha?: number
): Phaser.GameObjects.GameObject;

declare function FadeInPromise(
    duration: number,
    alpha?: number
): Promise<any>;

declare function IsRunningFadeIn(): boolean;

declare function FadeOutDestroy(
    duration: number
): Phaser.GameObjects.GameObject;

declare function FadeOutDestroyPromise(
    duration: number
): Promise<any>;

declare function FadeOut(
    duration: number
): Phaser.GameObjects.GameObject;

declare function FadeOutPromise(
    duration: number
): Promise<any>;

declare function IsRunningFadeOut(): boolean;

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