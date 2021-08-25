import ContainerLite from "../containerlite/ContainerLite";

export default TransitionImage;

declare namespace TransitionImage {

    type TransitionDirectionType = 0 | 1 | 'out' | 'in';

    type TransitionCallbackType = (
        parent: TransitionImage,
        currentImage: Phaser.GameObjects.Image,
        nextImage: Phaser.GameObjects.Image,
        t: number
    ) => void;

    interface ITransitConfig {
        texture?: string, frame?: string,

        dir?: TransitionDirectionType,

        onStart?: TransitionCallbackType,
        onStartScope?: unknown,

        onProgress?: TransitionCallbackType,
        onProgressScope?: unknown,

        onComplete?: TransitionCallbackType,
        onCompleteScope?: unknown,

        duration?: number,
        ease?: string,
        mask?: boolean,
    }

    interface IConfig extends ITransitConfig {
        x?: number, y?: number
    }
}

declare class TransitionImage extends ContainerLite {
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        texture?: string, frame?: string,
        config?: TransitionImage.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        config?: TransitionImage.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        config?: TransitionImage.IConfig
    );

    setTransitionDirection(
        dir: TransitionImage.TransitionDirectionType
    ): this;

    setTransitionStartCallback(
        callback: TransitionImage.TransitionCallbackType,
        scope?: unknown
    ): this;

    setTransitionProgressCallback(
        callback: TransitionImage.TransitionCallbackType,
        scope?: unknown
    ): this;

    setTransitionCompleteCallback(
        callback: TransitionImage.TransitionCallbackType,
        scope?: unknown
    ): this;

    setDuration(duration: number): this;

    setDuration(ease: string): this;

    setMaskEnable(enable?: boolean): this;

    transit(texture: string, frame?: string): this;

    transit(
        config: TransitionImage.ITransitConfig
    ): this;

    pause(): this;
    resume(): this;
    stop(): this;
}