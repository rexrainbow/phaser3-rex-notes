import {
    ESC, RAW, BLOD, ITALICS, WEIGHT, SIZE, COLOR, UNDERLINE,
    SHADOW, STROKE, OFFSETY, IMAGE, AREA, ALIGN,
} from './tags.js';

var PropToTagText = function (text, prop, prevProp) {
    if (prevProp == null) {
        prevProp = EMPTYPROP;
    }

    var headers = [];

    for (var k in prevProp) {
        if (!prop.hasOwnProperty(k)) {
            headers.push(`[/${k}]`);
        }
    }

    for (var k in prop) {
        var value = prop[k];

        if (prevProp[k] === value) {
            continue;
        }

        switch (k) {
            case SIZE:
                headers.push(`[size=${value.replace('px', '')}]`);
                break;

            case COLOR:
            case WEIGHT:
            case STROKE:
            case OFFSETY:
            case IMAGE:
            case AREA:
            case ALIGN:
                headers.push(`[${k}=${value}]`);
                break;

            case UNDERLINE:
                if (value === true) {
                    headers.push('[u]');
                } else {
                    headers.push(`[u=${value}]`)
                }
                break;

            default:
                headers.push(`[${k}]`);
                break;
        }
    }

    headers.push(text);

    return headers.join('');
}

var EMPTYPROP = {};


export default PropToTagText;