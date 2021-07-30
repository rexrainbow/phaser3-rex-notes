import TweenTask from "../../utils/behaviorbase/TweenTask";

export default Fade;

declare namespace Fade {
    type ModeType = 0 | 1 | 2 | 'stop' | 'destroy' | 'yoyo';

    interface IConfig {
        mode?: ModeType,
        start?: number,
        end?: number,
        duration?: number,
        delay?: number
    }

    namespace Events {
        type CompleteCallbackType = (
            gameObject: Phaser.GameObjects.GameObject,
            fade: Fade
        ) => void;
    }
}

declare class Fade extends TweenTask {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Fade.IConfig
    )

    setMode(mode: Fade.ModeType): this;
    mode: number;

    setAlphaRange(start: number, end: number): this;
    alphaStart: number;
    alphaEnd: number;

    setDelay(time: number): this;
    delay: number;

    setDuration(time: number): this;
    duration: number;

    start(): this;
}