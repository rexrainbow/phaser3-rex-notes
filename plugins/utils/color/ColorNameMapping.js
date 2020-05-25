import { ColorNames, ColorNameToInteger, IntegerToColorName } from './ColorNameToInteger.js';

const ValueToColor = Phaser.Display.Color.ValueToColor;

var NameToColor = function (name, color) {
    var colorValue = ColorNameToInteger(name);
    if (colorValue !== null) {
        if (color === undefined) {
            color = ValueToColor(colorValue);
        } else {
            color.setTo(
                ((colorValue >> 16) & 0xff), // r
                ((colorValue >> 8) & 0xff), // g
                (colorValue & 0xff) // b
            )
        }
        return color;
    } else {
        return null;
    }
}

var ColorToName = function (color) {
    return IntegerToColorName[color.color];
}

export { NameToColor, ColorToName, ColorNames };