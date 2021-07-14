// import * as Phaser from 'phaser';
export default CircularProgress;

declare namespace CircularProgress {

    interface IConfig {
        x?: number, y?: number,
        radius?: number,

        barColor?: string | number,
        trackColor?: string | number,
        centerColor?: string | number,
        thickness?: number,
        startAngle?: number,
        anticlockwise?: boolean,

        value?: number,
    }
}

declare class CircularProgress extends Phaser.GameObjects.Shape {
    constructor(
        scene: Phaser.Scene,
        config?: CircularProgress.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        radius?: number,
        barColor?: string | number,
        value?: number,
        config?: CircularProgress.IConfig
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