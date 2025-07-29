interface TextStyle {
    fontFamily?: string,
    fontSize?: string | number,
    fontStyle?: string,

    backgroundColor?: null | string | number,
    backgroundColor2?: null | string | number,
    backgroundHorizontalGradient?: boolean,
    backgroundStrokeColor?: null | string | number,
    backgroundStrokeLineWidth?: number,
    backgroundCornerRadius?: number,
    backgroundCornerIteration?: null | number,

    color?: null | string | number,
    fill?: null | string | number,

    stroke?: null | string | number,
    strokeThickness?: number,

    shadow?: {
        offsetX?: number,
        offsetY?: number,
        color?: number | string,
        blur?: number,
        stroke?: boolean,
        fill?: boolean
    },

    underline?: {
        color?: number | string,
        thickness?: number,
        offset?: number,
    },

    strikethrough?: {
        color?: number | string,
        thickness?: number,
        offset?: number,
    },

    align?: 'left' | 'center' | 'right',
    halign?: 'left' | 'center' | 'right',
    valign?: 'top' | 'center' | 'bottom',

    padding?: {
        left?: number,
        right?: number,
        top?: number,
        bottom?: number,
    },

    maxLines?: number,
    lineSpacing?: number,
    letterSpacing?: number,

    fixedWidth?: number,
    fixedHeight?: number,

    resolution?: number,

    testString?: string,

    wrap?: {
        mode?: 0 | 1 | 2 | 3 | 'none' | 'word' | 'char' | 'character' | 'mix'
        width?: null | number,
    },

    wordWrap?: {
        width?: number,
    },

    metrics?: boolean |
    {
        ascent: number,
        descent: number,
        fontSize: number
    },
}

export default TextStyle;
