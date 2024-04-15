import EaseValueTaskBase from "../../utils/componentbase/tweentask/EaseValueTaskBase";

export default Fade;

declare namespace Fade {
    type ModeType = 0 | 1 | 'stop' | 'destroy';

    interface IConfig {
        mode?: ModeType,
        enable?: boolean,
        volume?: {
            start?: number,
            end?: number,
        }

        start?: number,
        end?: number,
        duration?: number,
        delay?: number
    }
}

declare class Fade extends EaseValueTaskBase {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Fade.IConfig
    )

    setMode(mode: Fade.ModeType):this;

    setVolumeRange(start: number, end: number):this;
}