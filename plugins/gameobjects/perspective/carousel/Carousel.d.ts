// import * as Phaser from 'phaser';
import FaceContainer from '../utils/FaceContainer';
import Card from '../card/Card';
import Image from '../image/Image';
import RenderTexture from '../rendertexture/RenderTexture';


export interface IConfigRoll {
    duration?: number,
    ease?: string,
    delay?: number,
}

export interface IConfig {
    x?: number,
    y?: number,

    faces?: (Card | Image | RenderTexture)[],
    face?: number,
    rtl?: boolean,

    width?: number,
    height?: number,

    faceWidth?: number,
    faceSpace?: number,

    z?: number,
    zEnd?: number,

    roll?: IConfigRoll | false,
}

export default class Carousel extends FaceContainer {
    constructor(
        scene: Phaser.Scene,
        config?: IConfig
    );

    faces: (Card | Image | RenderTexture)[];

    setFace(face: number): this;
    face: number;

    roll: Roll | undefined;
}

export class Roll extends Phaser.Events.EventEmitter {
    toNext(duration?: number): this;
    toPrevious(duration?: number): this;
    toRight(duration?: number): this;
    toLeft(duration?: number): this;
    to(faceIndex: number, duration?: number): this;
    stop(): this;

    setDuration(duration: number): this;
    duration: this;

    setEase(ease: string): this
    ease: string;

    readonly isRunning: boolean;
}