import ContainerLite from '../../container/containerlite/ContainerLite';

export default TransitionImage;

declare namespace TransitionImage {

    type TransitionDirectionType = 0 | 1 | 'out' | 'in';

    type TransitionCallbackType = (
        parent: TransitionImage,
        currentImage: Phaser.GameObjects.Image,
        nextImage: Phaser.GameObjects.Image,
        t: number
    ) => void;

    interface ITransitConfigBase {
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

        mask?: boolean | Phaser.GameObjects.GameObject,
    }

    interface ITransitConfig {
        mode?: string | string[],
    }

    interface IConfig extends ITransitConfigBase {
        x?: number, y?: number,
        width?: number, height?: number,
        scaleMode?: 0 | 1 | 'fit' | 'FIT' | 2 | 'envelop' | 'ENVELOP',
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

    texture: Phaser.Textures.Texture;
    frame: Phaser.Textures.Frame;

    setTransitionDirection(
        dir: TransitionImage.TransitionDirectionType
    ): this;

    setTransitionStartCallback(
        callback: TransitionImage.TransitionCallbackType,
        scope?: object
    ): this;

    setTransitionProgressCallback(
        callback: TransitionImage.TransitionCallbackType,
        scope?: object
    ): this;

    setTransitionCompleteCallback(
        callback: TransitionImage.TransitionCallbackType,
        scope?: object
    ): this;

    setDuration(duration: number): this;

    setDuration(ease: string): this;

    setMaskEnable(enable?: boolean): this;

    transit(
        texture: string, frame?: string,
        mode?: string | string[]
    ): this;

    transit(
        config: TransitionImage.ITransitConfig
    ): this;

    readonly currentTransitionMode: string;

    addTransitionMode(
        name: string,
        config: TransitionImage.ITransitConfig
    ): this;

    addTransitionMode(
        config: TransitionImage.ITransitConfig
    ): this;

    pause(): this;
    resume(): this;
    stop(): this;

    setFlipX(value: boolean): this;
    setFlipY(value: boolean): this;
    toggleFlipX(): this;
    toggleFlipY(): this;
    setFlip(x: boolean, y: boolean): this;
    flipX: boolean;
    flipY: boolean;

    setTint(value: number): this;
    tint: number;
}