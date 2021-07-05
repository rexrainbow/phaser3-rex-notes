// import * as Phaser from 'phaser';

type FaceTypes = 0 | 1 | 'front' | 'back';

type FaceDefTypes = string |
{ key?: string, frame?: string } |
    ((gameObject: Phaser.GameObjects.GameObject) => void);

type OrientationTypes = 0 | 1 | 'x' | 'y' | 'horizontal' | 'vertical';

export interface IConfig {
    face?: FaceTypes,
    front?: FaceDefTypes,
    back?: FaceDefTypes,

    orientation?: OrientationTypes,
    duration?: number,
    delay?: number,
    ease?: string,

    eventEmitter?: boolean | Phaser.Events.EventEmitter
}

export default class Buttons extends Phaser.Events.EventEmitter {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: IConfig
    )

    flip(duration?: number): this;
    stop(): this;

    setDuration(duration: number): this;
    duratiion: number;

    setEase(ease: string): this;
    ease: string;

    setFace(
        face: 0 | 1 | 'front' | 'back'
    ): this;
    toggleFace(): this;
    face: number;

    setFrontFace(
        key: string |
            ((gameObject: Phaser.GameObjects.GameObject) => void),
        frame?: string
    ): this;
    setBackFace(
        key: string |
            ((gameObject: Phaser.GameObjects.GameObject) => void),
        frame?: string
    ): this;


    readonly isRunning: boolean;
}