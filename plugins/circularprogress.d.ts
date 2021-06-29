import * as Phaser from 'phaser';

export interface IConfig {
    x?: number, y?: number,
    radius?: number,

    color?: string | number,
    trackColor?: string | number,
    centerColor?: string | number,
    thickness?: number,
    startAngle?: number,
    anticlockwise?: boolean,

    value?: number,
}

export default class CircularProgress extends Phaser.GameObjects.Shape {
    constructor(
        scene: Phaser.Scene,
        config?: IConfig
    );

    value: number;
    setValue(value: number): this;

    radius: number;
    setRadius(radius: number): this;

    trackColor: string;
    setTrackColor(trackColor?: string | number): this;

    setThickness(thickness: number): this;

    barColor: string;
    setBarColor(barColor?: string | number): this;

    startAngle: number;
    setStartAngle(startAngle: number): this;

    anticlockwise: boolean;
    setAnticlockwise(anticlockwise: boolean): this;

    centerColor: string;
    setCenterColor(centerColor?: string | number): this;
}