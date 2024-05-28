import Fade from './fade';
import FadeOutDestroy from './fade-out-destroy';
import {
    FadeIn, FadeInPromise,
    FadeOutDestroy as FadeOutDestroy_,
    FadeOutDestroyPromise,
    FadeOut, FadeOutPromise,
    IsRunningFadeIn, IsRunningFadeOut, IsRunningEaseFade
} from './behaviors/fade/FadeMethods';

declare namespace FadePlugin {
    interface FadeMethodsGameObject extends Phaser.GameObjects.GameObject {
        fadeIn: typeof FadeIn,
        fadeInPromise: typeof FadeInPromise,
        fadeOutDestroy: typeof FadeOutDestroy_,
        fadeOutDestroyPromise: typeof FadeOutDestroyPromise,
        fadeOut: typeof FadeOut,
        fadeOutPromise: typeof FadeOutPromise,

        isRunningFadeIn: typeof IsRunningFadeIn,
        isRunningFadeOut: typeof IsRunningFadeOut,
        isRunningEaseFade: typeof IsRunningEaseFade,
    }
}

export default class FadePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Fade.IConfig
    ): Fade;

    fadeOutDestroy: typeof FadeOutDestroy;

    injectMethods(
        gameObject: Phaser.GameObjects.GameObject
    ): FadePlugin.FadeMethodsGameObject;

    injectMethodsToRootClass(): this;
}