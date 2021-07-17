import TweenTask from "../../utils/behaviorbase/TweenTask";

export default EaseMove;

declare namespace EaseMove {
    type ModeType = 0 | 1 | 2 | 'stop' | 'destroy' | 'yoyo';

    interface IConfig {
        mode?: ModeType,

        x?: number, y?: number,
        startX?: number, startY?: number,
        endX?: number, endY?: number,

        duration?: number,
        delay?: number,
        ease?: string
    }
}

declare class EaseMove extends TweenTask {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: EaseMove.IConfig
    )

    setMode(mode: EaseMove.ModeType): this;
    mode: number;

    setTargetPosition(x: number, y: number): this;
    setTargetPosition(
        config?: {
            startX?: number, startY?: number,
            endX?: number, endY?: number,
        }
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