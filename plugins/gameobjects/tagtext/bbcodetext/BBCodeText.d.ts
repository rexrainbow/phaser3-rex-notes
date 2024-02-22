import Text from '../textbase/Text';

export default BBCodeText;

declare namespace BBCodeText {

    interface TextStyle extends Text.TextStyle {
        delimiters?: string | string[];
    }
}

declare class BBCodeText extends Text {
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        content?: string,
        style?: BBCodeText.TextStyle
    );

    setDelimiters(
        delimiterLeft: string | string[],
        delimiterRight?: string
    ): this;
}