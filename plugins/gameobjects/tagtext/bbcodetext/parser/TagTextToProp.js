import {
    ESC, RAW, BLOD, ITALICS, WEIGHT, SIZE, COLOR, UNDERLINE,
    SHADOW, STROKE, OFFSETY, IMAGE, AREA, ALIGN,

    RE_ESC_OPEN, RE_ESC_CLOSE,
    RE_RAW_OPEN, RE_RAW_CLOSE,

    RE_BLOD_OPEN, RE_BLOD_CLOSE,
    RE_ITALICS_OPEN, RE_ITALICS_CLOSE,
    RE_WEIGHT_OPEN, RE_WEIGHT_CLOSE,

    RE_SIZE_OPEN, RE_SIZE_CLOSE,
    RE_COLOR_OPEN, RE_COLOR_CLOSE,
    RE_UNDERLINE_OPEN, RE_UNDERLINE_OPENC, RE_UNDERLINE_CLOSE,
    RE_SHADOW_OPEN, RE_SHADOW_CLOSE,
    RE_STROKE_OPEN, RE_STROKE_OPENC, RE_STROKE_CLOSE,
    RE_OFFSETY_OPEN, RE_OFFSETY_CLOSE,
    RE_IMAGE_OPEN, RE_IMAGE_CLOSE,
    RE_AREA_OPEN, RE_AREA_CLOSE,
    RE_ALIGN_OPEN, RE_ALIGN_CLOSE
} from './tags.js';

const PROP_REMOVE = false;
const PROP_ADD = true;

var GETPROP_RESULT = {
    plainText: null,
    prevProp: null
};

var TagTextToProp = function (text, prevProp) {
    // text : result of splitText()
    if (prevProp == null) {
        prevProp = {};
    }

    var plainText = '';

    // close image tag
    if (prevProp.img) {
        UpdateProp(prevProp, PROP_REMOVE, 'img');
    }

    if (prevProp.esc) {
        if (RE_ESC_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, 'esc');
        } else {
            plainText = text;
        }

    } else if (prevProp.raw) {
        if (RE_RAW_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, 'raw');
        } else {
            plainText = text;
        }

    } else {
        if (RE_ESC_OPEN.test(text)) {
            UpdateProp(prevProp, PROP_ADD, ESC, true);
        } else if (RE_ESC_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, ESC);

        } else if (RE_RAW_OPEN.test(text)) {
            UpdateProp(prevProp, PROP_ADD, RAW, true);
        } else if (RE_RAW_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, RAW);

        } else if (RE_BLOD_OPEN.test(text)) {
            UpdateProp(prevProp, PROP_ADD, BLOD, true);
        } else if (RE_BLOD_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, BLOD);

        } else if (RE_ITALICS_OPEN.test(text)) {
            UpdateProp(prevProp, PROP_ADD, ITALICS, true);
        } else if (RE_ITALICS_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, ITALICS);

        } else if (RE_WEIGHT_OPEN.test(text)) {
            var innerMatch = text.match(RE_WEIGHT_OPEN);
            UpdateProp(prevProp, PROP_ADD, WEIGHT, innerMatch[1]);
        } else if (RE_WEIGHT_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, WEIGHT);

        } else if (RE_SIZE_OPEN.test(text)) {
            var innerMatch = text.match(RE_SIZE_OPEN);
            UpdateProp(prevProp, PROP_ADD, SIZE, `${innerMatch[1]}px`);
        } else if (RE_SIZE_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, SIZE);

        } else if (RE_COLOR_OPEN.test(text)) {
            var innerMatch = text.match(RE_COLOR_OPEN);
            UpdateProp(prevProp, PROP_ADD, COLOR, innerMatch[1]);
        } else if (RE_COLOR_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, COLOR);

        } else if (RE_UNDERLINE_OPEN.test(text)) {
            UpdateProp(prevProp, PROP_ADD, UNDERLINE, true);
        } else if (RE_UNDERLINE_OPENC.test(text)) {
            var innerMatch = text.match(RE_UNDERLINE_OPENC);
            UpdateProp(prevProp, PROP_ADD, UNDERLINE, innerMatch[1]);
        } else if (RE_UNDERLINE_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, UNDERLINE);

        } else if (RE_SHADOW_OPEN.test(text)) {
            UpdateProp(prevProp, PROP_ADD, SHADOW, true);
        } else if (RE_SHADOW_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, SHADOW);

        } else if (RE_STROKE_OPEN.test(text)) {
            UpdateProp(prevProp, PROP_ADD, STROKE, true);
        } else if (RE_STROKE_OPENC.test(text)) {
            var innerMatch = text.match(RE_STROKE_OPENC);
            UpdateProp(prevProp, PROP_ADD, STROKE, innerMatch[1]);
        } else if (RE_STROKE_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, STROKE);

        } else if (RE_OFFSETY_OPEN.test(text)) {
            var innerMatch = text.match(RE_OFFSETY_OPEN);
            UpdateProp(prevProp, PROP_ADD, OFFSETY, parseFloat(innerMatch[1]));
        } else if (RE_OFFSETY_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, OFFSETY);

        } else if (RE_IMAGE_OPEN.test(text)) {
            var innerMatch = text.match(RE_IMAGE_OPEN);
            UpdateProp(prevProp, PROP_ADD, IMAGE, innerMatch[1]);
        } else if (RE_IMAGE_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, IMAGE);

        } else if (RE_AREA_OPEN.test(text)) {
            var innerMatch = text.match(RE_AREA_OPEN);
            UpdateProp(prevProp, PROP_ADD, AREA, innerMatch[1]);
        } else if (RE_AREA_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, AREA);

        } else if (RE_ALIGN_OPEN.test(text)) {
            var innerMatch = text.match(RE_ALIGN_OPEN);
            UpdateProp(prevProp, PROP_ADD, ALIGN, innerMatch[1]);
        } else if (RE_ALIGN_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, ALIGN);

        } else {
            plainText = text;
        }
    }

    var result = GETPROP_RESULT;
    result.plainText = plainText;
    result.prop = prevProp;
    return result;
}

var UpdateProp = function (prop, op, key, value) {
    if (op === PROP_ADD) {
        // PROP_ADD     
        prop[key] = value;
    } else {
        // PROP_REMOVE        
        if (prop.hasOwnProperty(key)) {
            delete prop[key];
        }
    }

    return prop;
};

export default TagTextToProp;