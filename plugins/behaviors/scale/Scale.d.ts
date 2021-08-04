import TweenTask from "../../utils/subsystembase/TweenTask";

export default Scale;

declare namespace Scale {
    type ModeType = 0 | 1 | 2 | 'stop' | 'destroy' | 'yoyo';

    interface IConfig {
        mode?: ModeType,
        start?: number,
        end?: number,
        duration?: number,
        delay?: number,
        ease?: string
    }

    namespace Events {
        type CompleteCallbackType = (
            gameObject: Phaser.GameObjects.GameObject,
            scale: Scale
        ) => void;
    }
}

declare class Scale extends TweenTask {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Scale.IConfig
    )

    setMode(mode: Scale.ModeType): this;
    mode: number;

    setScaleRange(
        start: number | { x: number, y: number },
        end: number | { x: number, y: number }
    ): this;
    startX: number;
    startY: number;
    endX: number;
    endY: number;

    setDelay(time: number): this;
    delay: number;

    setDuration(time: number): this;
    duration: number;

    setEase(ease: string): this;
    ease: string;

    start(): this;
}