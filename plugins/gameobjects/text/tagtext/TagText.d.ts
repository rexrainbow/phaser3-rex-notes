import Text from '../textbase/Text';

export default TagText;

declare namespace TagText {

    interface TagProg {
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

    interface TextStyle extends Text.TextStyle {
        tags?: {
            [name: string]: TagProg
        }
    }

}

declare class TagText extends Text {
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        content?: string,
        style?: TagText.TextStyle
    );

    addTag(
        name: string,
        prop: TagText.TagProg
    ): this;

    addTags(
        tags: { [name: string]: TagText.TagProg }
    ): this;
}