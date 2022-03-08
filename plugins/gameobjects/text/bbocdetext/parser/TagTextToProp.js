import {
    RE_BLOD_OPEN, RE_BLOD_CLOSE,
    RE_ITALICS_OPEN, RE_ITALICS_CLOSE,
    RE_SIZE_OPEN, RE_SIZE_CLOSE,
    RE_COLOR_OPEN, RE_COLOR_CLOSE,
    RE_UNDERLINE_OPEN, RE_UNDERLINE_OPENC, RE_UNDERLINE_CLOSE,
    RE_SHADOW_OPEN, RE_SHADOW_CLOSE,
    RE_STROKE_OPEN, RE_STROKE_OPENC, RE_STROKE_CLOSE,
    RE_OFFSETY_OPEN, RE_OFFSETY_CLOSE,
    RE_IMAGE_OPEN, RE_IMAGE_CLOSE,
    RE_AREA_OPEN, RE_AREA_CLOSE,
    RE_ALIGN_OPEN, RE_ALIGN_CLOSE
} from './const.js';

const PROP_REMOVE = false;
const PROP_ADD = true;

var GETPROP_RESULT = {
    plainText: null,
    prevProp: null
};

var TagTextToProp = function (text, prevProp) {
    // text : result of splitText()
    var plainText, innerMatch;

    if (prevProp == null) {
        prevProp = {};
    }

    // close image tag
    if (prevProp.img) {
        UpdateProp(prevProp, PROP_REMOVE, 'img');
    }
    // Check if current fragment is a class tag
    if (RE_BLOD_OPEN.test(text)) {
        UpdateProp(prevProp, PROP_ADD, 'b', true);
        plainText = '';
    } else if (RE_BLOD_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'b');
        plainText = '';
    } else if (RE_ITALICS_OPEN.test(text)) {
        UpdateProp(prevProp, PROP_ADD, 'i', true);
        plainText = '';
    } else if (RE_ITALICS_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'i');
        plainText = '';
    } else if (RE_SIZE_OPEN.test(text)) {
        innerMatch = text.match(RE_SIZE_OPEN);
        UpdateProp(prevProp, PROP_ADD, 'size', `${innerMatch[1]}px`);
        plainText = '';
    } else if (RE_SIZE_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'size');
        plainText = '';
    } else if (RE_COLOR_OPEN.test(text)) {
        innerMatch = text.match(RE_COLOR_OPEN);
        UpdateProp(prevProp, PROP_ADD, 'color', innerMatch[1]);
        plainText = '';
    } else if (RE_COLOR_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'color');
        plainText = '';
    } else if (RE_UNDERLINE_OPEN.test(text)) {
        innerMatch = text.match(RE_UNDERLINE_OPEN);
        UpdateProp(prevProp, PROP_ADD, 'u', true);
        plainText = '';
    } else if (RE_UNDERLINE_OPENC.test(text)) {
        innerMatch = text.match(RE_UNDERLINE_OPENC);
        UpdateProp(prevProp, PROP_ADD, 'u', innerMatch[1]);
        plainText = '';
    } else if (RE_UNDERLINE_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'u');
        plainText = '';
    } else if (RE_SHADOW_OPEN.test(text)) {
        UpdateProp(prevProp, PROP_ADD, 'shadow', true);
        plainText = '';
    } else if (RE_SHADOW_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'shadow');
        plainText = '';
    } else if (RE_STROKE_OPEN.test(text)) {
        UpdateProp(prevProp, PROP_ADD, 'stroke', true);
        plainText = '';
    } else if (RE_STROKE_OPENC.test(text)) {
        innerMatch = text.match(RE_STROKE_OPENC);
        UpdateProp(prevProp, PROP_ADD, 'stroke', innerMatch[1]);
        plainText = '';
    } else if (RE_STROKE_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'stroke');
        plainText = '';
    } else if (RE_OFFSETY_OPEN.test(text)) {
        innerMatch = text.match(RE_OFFSETY_OPEN);
        UpdateProp(prevProp, PROP_ADD, 'y', parseFloat(innerMatch[1]));
        plainText = '';
    } else if (RE_OFFSETY_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'y');
        plainText = '';
    } else if (RE_IMAGE_OPEN.test(text)) {
        innerMatch = text.match(RE_IMAGE_OPEN);
        UpdateProp(prevProp, PROP_ADD, 'img', innerMatch[1]);
        plainText = '';
    } else if (RE_IMAGE_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'img');
        plainText = '';
    } else if (RE_AREA_OPEN.test(text)) {
        innerMatch = text.match(RE_AREA_OPEN);
        UpdateProp(prevProp, PROP_ADD, 'area', innerMatch[1]);
        plainText = '';
    } else if (RE_AREA_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'area');
        plainText = '';
    } else if (RE_ALIGN_OPEN.test(text)) {
        innerMatch = text.match(RE_ALIGN_OPEN);
        UpdateProp(prevProp, PROP_ADD, 'align', innerMatch[1]);
        plainText = '';
    } else if (RE_ALIGN_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'align');
        plainText = '';
    } else {
        plainText = text;
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