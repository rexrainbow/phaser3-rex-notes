const Pad = Phaser.Utils.String.Pad;
var GetStyle = function (style, canvas, context) {
    switch (typeof (style)) {
        case 'number': return `#${Pad(Math.floor(style).toString(16), 6, '0', 1)}`;
        case 'function': return style(canvas, context);
        default: return style;
    }
}

export default GetStyle;