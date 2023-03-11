import TickTask from '../../utils/componentbase/TickTask';

export default Step;

declare namespace Step {
    type StepModeType = 0 | 'linear' | 1 | 'x,y' | 'h,v' | 2 | 'y,x' | 'v,h';

    interface IConfig {
        enable?: boolean,
        mode?: StepModeType,
        step?: number,
    }
}

declare class Step extends TickTask {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Step.IConfig
    )

    setEnable(enable?: boolean): this;
    enable: boolean;

    setStepMode(mode?: Step.StepModeType): this;
    stepMode: number;

    setStepLength(stepLength: number): this;
    stepLength: number;

    cancelStep(): this;

}