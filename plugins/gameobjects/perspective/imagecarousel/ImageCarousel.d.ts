import Carousel from "../carousel/Carousel";
import { IConfigRoll, Roll } from '../carousel/Carousel';

export interface IConfig {
    x?: number,
    y?: number,

    images?: ({ key: string, frame?: string })[],
    index?: number,
    rtl?: boolean,
    repeat?: boolean,

    width?: number,
    height?: number,
    faceCount?: number,

    z?: number,
    zEnd?: number,

    roll?: IConfigRoll | false,
}

export default class ImageCarousel extends Carousel {
    constructor(
        scene: Phaser.Scene,
        config?: IConfig
    );
}