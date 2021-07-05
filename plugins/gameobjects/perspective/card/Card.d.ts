// import * as Phaser from 'phaser';
import FaceContainer from '../utils/FaceContainer';
import Image from '../image/Image';
import RenderTexture from '../rendertexture/RenderTexture';


type FaceTypes = 0 | 1 | 'front' | 'back';

type FaceDefType = { key: string, frame?: string } |
{ width: number, height: number } |
    Image |
    RenderTexture;

type OrientationTypes = 0 | 1 | 'x' | 'y' | 'horizontal' | 'vertical';

type FlipDirTypes = 0 | 1 | 'right' | 'left' | 'left-to-right' | 'right-to-left';
interface IConfigFlip {
    frontToBack?: FlipDirTypes,
    backToFront?: FlipDirTypes,
    duration?: number,
    ease?: string,
    delay?: number,
}


export interface IConfig {
    x?: number,
    y?: number,
    width?: number,
    height?: number,

    face?: FaceTypes,
    back?: FaceDefType,
    front?: FaceDefType,

    orientation?: OrientationTypes,

    flip?: IConfigFlip | false,
}

export default class Card extends FaceContainer {
    constructor(
        scene: Phaser.Scene,
        config?: IConfig
    );

    setFace(face: FaceTypes): this;
    toggleFace(): this;
    face: number;

    frontFace: Image | RenderTexture;
    backFace: Image | RenderTexture;
    faces: {
        front: Image | RenderTexture,
        back: Image | RenderTexture,
    };

    flip: Flip | undefined;
}

declare class Flip extends Phaser.Events.EventEmitter {
    flip(duration?: number): this;
    flipRight(duration?: number): this;
    flipLeft(duration?: number): this;
    stop(): this;

    setDuration(duration: number): this;
    duration: number;

    setEase(ease: string): this;
    ease: string;

    readonly isRunning: boolean;
}