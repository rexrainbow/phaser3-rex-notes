const GetValue = Phaser.Utils.Objects.GetValue;

var AddToBitmapFont = function (config) {
    var lineSpacing = GetValue(config, 'lineSpacing', 0);

    var textureKey = this.texture.key;
    var letters = this.frameNames;

    var data = {
        retroFont: true,
        font: textureKey,
        size: this.cellWidth,
        lineHeight: this.cellHeight + lineSpacing,
        chars: {}
    };

    for (var i = 0, cnt = letters.length; i < cnt; i++) {
        var char = letters[i];
        if (char === undefined) {
            continue;
        }

        var frame = this.texture.get(char);
        var x = frame.cutX,
            y = frame.cutY,
            width = frame.cutWidth,
            height = frame.cutHeight;

        data.chars[char.charCodeAt(0)] = {
            x: x, y: y,
            width: width, height: height,
            centerX: x + (width / 2),
            centerY: y + (height / 2),
            xOffset: 0,
            yOffset: 0,
            xAdvance: width,
            data: {},
            kerning: {},
            u0: frame.u0,
            v0: frame.v0,
            u1: frame.u1,
            v1: frame.v1
        }
    }

    this.bitmapFontCache.add(
        textureKey,
        {
            data: data,
            texture: textureKey,
            frame: null
        }
    );
    return this;
}
export default AddToBitmapFont;