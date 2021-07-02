import * as Phaser from 'phaser';
import Sizer from '../sizer/Sizer';
import { IConfig as IConfigBase } from '../sizer/Sizer';

type InputTypes = 0 | 1 | -1 | 'drag' | 'pan' | 'click' | 'none';

export interface IConfig extends IConfigBase {
    background?: Phaser.GameObjects.GameObject,
    track?: Phaser.GameObjects.GameObject,
    indicator?: Phaser.GameObjects.GameObject,
    thumb?: Phaser.GameObjects.GameObject,

    input?: InputTypes,

    gap?: number,

    easeValue?: {
        duration?: number,
        ease?: string
    },

    valuechangeCallback: (newValue: number, oldValue: number, slider: Slider) => void

    enable?: boolean,
}

export default class Slider extends Sizer {
    constructor(
        scene: Phaser.Scene,
        config?: IConfig
    );

    value: number;
    getValue(min?: number, max?: number): number;
    setValue(value?: number, min?: number, max?: number): this;
    addValue(inc?: number, min?: number, max?: number): this;
    easeValueTo(value?: number, min?: number, max?: number): this;
    stopEaseValue(): this;
    setEaseValueDuration(duration: number): this;
    setEaseValueFunction(ease: string): this;

    setEnable(enable?: boolean): this;
    enable: boolean;
}