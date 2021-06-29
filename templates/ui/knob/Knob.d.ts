import * as Phaser from 'phaser';
import OverlapSizer from '../overlapsizer/OverlapSizer';
import { IConfig as IConfigBase } from '../overlapsizer/OverlapSizer';

export interface IConfig extends IConfigBase {
    background?: Phaser.GameObjects.GameObject,

    color?: number | string,
    trackColor?: number | string,
    centerColor?: number | string,
    thickness?: number,
    startAngle?: number,
    anticlockwise?: boolean,
    knobDepth?: number,

    text?: Phaser.GameObjects.GameObject,
    textFormatCallback?: (value: number) => string,
    textFormatCallbackScope?: unknown,

    input?: 0 | 1 | -1 | 'drag' | 'pan' | 'click' | 'none',

    value?: number,

    gap?: number,

    easeValue?: {
        duration?: number,
        ease?: string
    },

    valuechangeCallback: (newValue: number, oldValue: number, knob: Knob) => void,

    enable?: boolean,

}

export default class Knob extends OverlapSizer {
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