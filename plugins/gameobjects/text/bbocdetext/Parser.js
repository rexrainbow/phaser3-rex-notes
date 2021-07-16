import TextStyle from '../textbase/textstyle/TextStyle.js';

var GETPROP_RESULT = {
    plainText: null,
    prevProp: null
};

var STYLE_RESULT = new TextStyle();
var EMPTYPROP = {};

var parser = {
    splitText: function (text, mode) {
        var result = [];
        var charIdx = 0;
        while (true) {
            var regexResult = RE_SPLITTEXT.exec(text);
            if (!regexResult) {
                var totalLen = text.length;
                if (charIdx < totalLen) { // Push remainder string
                    result.push(text.substring(charIdx, totalLen));
                }
                return result; // [text,...]
            }

            var match = regexResult[0];
            var matchStart = RE_SPLITTEXT.lastIndex - match.length;

            if (charIdx < matchStart) {
                result.push(text.substring(charIdx, matchStart));
            }

            if (mode === undefined) {
                result.push(match);
            }

            charIdx = RE_SPLITTEXT.lastIndex;
        }
    },

    tagTextToProp: function (text, prevProp) {
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
            plainText = text
        }

        var result = GETPROP_RESULT;
        result.plainText = plainText;
        result.prop = prevProp;
        return result;
    },

    propToContextStyle: function (defaultStyle, prop) {
        var result = STYLE_RESULT;
        if (!prop.hasOwnProperty('img')) {
            result.image = null;

            if (prop.hasOwnProperty('family')) {
                result.fontFamily = prop.family;
            } else {
                result.fontFamily = defaultStyle.fontFamily;
            }

            if (prop.hasOwnProperty('size')) {
                var size = prop.size;
                if (typeof (size) === 'number') {
                    size = `${size}px`;
                }
                result.fontSize = size;
            } else {
                result.fontSize = defaultStyle.fontSize;
            }
            result.fontStyle = GetFontStyle(prop.b, prop.i);

            if (prop.hasOwnProperty('color')) {
                result.color = prop.color;
            } else {
                result.color = defaultStyle.color;
            }

            if (prop.hasOwnProperty('stroke')) {
                if (prop.stroke === true) {
                    result.stroke = defaultStyle.stroke;
                    result.strokeThickness = defaultStyle.strokeThickness;
                } else {
                    result.stroke = prop.stroke;
                    result.strokeThickness = defaultStyle.strokeThickness;
                }
            } else {
                result.stroke = defaultStyle.stroke;
                result.strokeThickness = 0;
            }
        } else {
            result.image = prop.img;
        }

        if (prop.hasOwnProperty('shadow')) {
            if (prop.shadow === true) {
                result.shadowColor = defaultStyle.shadowColor;
                result.shadowOffsetX = defaultStyle.shadowOffsetX;
                result.shadowOffsetY = defaultStyle.shadowOffsetY;
                result.shadowBlur = defaultStyle.shadowBlur;
                result.shadowStroke = true;
                result.shadowFill = true;
            } else {
                result.shadowColor = prop.shadow;
                result.shadowOffsetX = defaultStyle.shadowOffsetX;
                result.shadowOffsetY = defaultStyle.shadowOffsetY;
                result.shadowBlur = defaultStyle.shadowBlur;
                result.shadowStroke = true;
                result.shadowFill = true;
            }
        } else {
            result.shadowColor = '#000';
            result.shadowOffsetX = 0;
            result.shadowOffsetY = 0;
            result.shadowBlur = 0;
            result.shadowStroke = false;
            result.shadowFill = false;
        }

        if (prop.hasOwnProperty('u')) {
            if (prop.u === true) {
                result.underlineColor = defaultStyle.underlineColor;
                result.underlineThickness = defaultStyle.underlineThickness;
                result.underlineOffset = defaultStyle.underlineOffset;
            } else {
                result.underlineColor = prop.u;
                result.underlineThickness = defaultStyle.underlineThickness;
                result.underlineOffset = defaultStyle.underlineOffset;
            }
        } else {
            result.underlineColor = '#000';
            result.underlineThickness = 0;
            result.underlineOffset = 0;
        }

        return result;
    },

    propToTagText: function (text, prop, prevProp) {
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
                case 'size':
                    headers.push(`[size=${value.replace('px', '')}]`);
                    break;

                case 'color':
                case 'stroke':
                case 'y':
                case 'img':
                case 'area':
                case 'align':
                    headers.push(`[${k}=${value}]`);
                    break;

                case 'u':
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
};

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

var GetFontStyle = function (isBold, isItalic) {
    if (isBold && isItalic) {
        return 'bold italic';
    } else if (isBold) {
        return 'bold';
    } else if (isItalic) {
        return 'italic';
    } else {
        return '';
    }
};

var RE_SPLITTEXT = /\[b\]|\[\/b\]|\[i\]|\[\/i\]|\[size=(\d+)\]|\[\/size\]|\[color=([a-z]+|#[0-9abcdef]+)\]|\[\/color\]|\[u\]|\[u=([a-z]+|#[0-9abcdef]+)\]|\[\/u\]|\[shadow\]|\[\/shadow\]|\[stroke\]|\[stroke=([a-z]+|#[0-9abcdef]+)\]|\[\/stroke\]|\[y=([-.0-9]+)\]|\[\/y\]|\[img=([^\]]+)\]|\[\/img\]|\[area=([^\]]+)\]|\[\/area\]|\[align=([^\]]+)\]|\[\/align\]/ig;

var RE_BLOD_OPEN = /\[b\]/i;
var RE_BLOD_CLOSE = /\[\/b\]/i;
var RE_ITALICS_OPEN = /\[i\]/i;
var RE_ITALICS_CLOSE = /\[\/i\]/i;
var RE_SIZE_OPEN = /\[size=(\d+)\]/i;
var RE_SIZE_CLOSE = /\[\/size\]/i;
var RE_COLOR_OPEN = /\[color=([a-z]+|#[0-9abcdef]+)\]/i;
var RE_COLOR_CLOSE = /\[\/color\]/i;
var RE_UNDERLINE_OPEN = /\[u\]/i;
var RE_UNDERLINE_OPENC = /\[u=([a-z]+|#[0-9abcdef]+)\]/i;
var RE_UNDERLINE_CLOSE = /\[\/u\]/i;
var RE_SHADOW_OPEN = /\[shadow\]/i;
var RE_SHADOW_CLOSE = /\[\/shadow\]/i;
var RE_STROKE_OPEN = /\[stroke\]/i;
var RE_STROKE_OPENC = /\[stroke=([a-z]+|#[0-9abcdef]+)\]/i;
var RE_STROKE_CLOSE = /\[\/stroke\]/i;
var RE_OFFSETY_OPEN = /\[y=([-.0-9]+)\]/i;
var RE_OFFSETY_CLOSE = /\[\/y\]/i;
var RE_IMAGE_OPEN = /\[img=([^\]]+)\]/i;
var RE_IMAGE_CLOSE = /\[\/img\]/i;
var RE_AREA_OPEN = /\[area=([^\]]+)\]/i;
var RE_AREA_CLOSE = /\[\/area\]/i;
var RE_ALIGN_OPEN = /\[align=([^\]]+)\]/i;
var RE_ALIGN_CLOSE = /\[\/align\]/i;
const PROP_REMOVE = false;
const PROP_ADD = true;

export default parser;