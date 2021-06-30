import Text from '../textbase/Text';
import { TextStyle as TextStyleBase } from '../textbase/Text';

export interface TagProg {
    color?: string,

    stroke: {
        color?: string,
        thinkness?: number,
    },

    fontSize?: string,
    fontFamily?: string,
    fontStyle?: string,

    shadow?: {
        color?: string,
        offsetX?: number,
        offsetY?: number,
        blur?: number,
    },

    underline?: {
        color?: string,
        thinkness?: number,
        offset?: number,
    },

    y?: number,

    img?: string,

    area?: string
}

export interface TextStyle extends TextStyleBase { 
    tags?: {
        [name: string]: TagProg
    }
}

export default class TagText extends Text {
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        content?: string,
        style?: TextStyle
    );

    addTag(
        name: string,
        prop: TagProg
    ): this;

    addTags(
        tags: { [name: string]: TagProg }
    ): this;
}