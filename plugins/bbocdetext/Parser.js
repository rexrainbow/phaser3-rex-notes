import TextStyle from './../utils/text/TextStyle.js';

var SPLITTEXT_RESULT = [];
var GETPROP_RESULT = {
    rawText: null,
    prevProp: null
};

var STYLE_RESULT = new TextStyle();
STYLE_RESULT.underline = [null, null, null];
var EMPTYPROP = {};

class Parser {
    splitText(txt, mode) {
        var result = SPLITTEXT_RESULT;
        var arr, m, charIdx = 0,
            totalLen = txt.length,
            matchStart = totalLen;

        while (true) {
            arr = RE_SPLITTEXT.exec(txt);
            if (!arr) {
                break;
            }

            m = arr[0];
            matchStart = RE_SPLITTEXT.lastIndex - m.length;

            if (charIdx < matchStart) {
                result.push(txt.substring(charIdx, matchStart));

            }

            if (mode == null)
                result.push(m);

            charIdx = RE_SPLITTEXT.lastIndex;
        }

        if (charIdx < totalLen) {
            result.push(txt.substring(charIdx, totalLen));
        }
        return result; // [txt,...]
    }

    tagTextToProp(txt, prevProp) {
        var rawText, innerMatch;

        if (prevProp == null) {
            prevProp = {};
        }

        // close image tag
        if (prevProp.img) {
            updateProp(prevProp, PROP_REMOVE, "img");
        }
        // Check if current fragment is a class tag
        if (RE_BLOD_OPEN.test(txt)) {
            updateProp(prevProp, PROP_ADD, "b", true);
            rawText = "";
        } else if (RE_BLOD_CLOSE.test(txt)) {
            updateProp(prevProp, PROP_REMOVE, "b");
            rawText = "";
        } else if (RE_ITALICS_OPEN.test(txt)) {
            updateProp(prevProp, PROP_ADD, "i", true);
            rawText = "";
        } else if (RE_ITALICS_CLOSE.test(txt)) {
            updateProp(prevProp, PROP_REMOVE, "i");
            rawText = "";
        } else if (RE_SIZE_OPEN.test(txt)) {
            innerMatch = txt.match(RE_SIZE_OPEN);
            updateProp(prevProp, PROP_ADD, "size", innerMatch[1] + "pt");
            rawText = "";
        } else if (RE_SIZE_CLOSE.test(txt)) {
            updateProp(prevProp, PROP_REMOVE, "size");
            rawText = "";
        } else if (RE_COLOR_OPEN.test(txt)) {
            innerMatch = txt.match(RE_COLOR_OPEN);
            updateProp(prevProp, PROP_ADD, "color", innerMatch[1]);
            rawText = "";
        } else if (RE_COLOR_CLOSE.test(txt)) {
            updateProp(prevProp, PROP_REMOVE, "color");
            rawText = "";
        } else if (RE_UNDERLINE_OPEN.test(txt)) {
            innerMatch = txt.match(RE_UNDERLINE_OPEN);
            updateProp(prevProp, PROP_ADD, "u", true);
            rawText = "";
        } else if (RE_UNDERLINE_OPENC.test(txt)) {
            innerMatch = txt.match(RE_UNDERLINE_OPENC);
            updateProp(prevProp, PROP_ADD, "u", innerMatch[1]);
            rawText = "";
        } else if (RE_UNDERLINE_CLOSE.test(txt)) {
            updateProp(prevProp, PROP_REMOVE, "u");
            rawText = "";
        } else if (RE_SHADOW_OPEN.test(txt)) {
            updateProp(prevProp, PROP_ADD, "shadow", true);
            rawText = "";
        } else if (RE_SHADOW_CLOSE.test(txt)) {
            updateProp(prevProp, PROP_REMOVE, "shadow");
            rawText = "";
        } else if (RE_STROKE_OPEN.test(txt)) {
            innerMatch = txt.match(RE_STROKE_OPEN);
            updateProp(prevProp, PROP_ADD, "stroke", innerMatch[1]);
            rawText = "";
        } else if (RE_STROKE_CLOSE.test(txt)) {
            updateProp(prevProp, PROP_REMOVE, "stroke");
            rawText = "";
        } else if (RE_IMAGE_OPEN.test(txt)) {
            innerMatch = txt.match(RE_IMAGE_OPEN);
            updateProp(prevProp, PROP_ADD, "img", innerMatch[1]);
            rawText = "";
        } else if (RE_IMAGE_CLOSE.test(txt)) {
            updateProp(prevProp, PROP_REMOVE, "img");
            rawText = "";
        } else {
            rawText = txt
        }

        var result = GETPROP_RESULT;
        result.rawText = rawText;
        result.prop = prevProp;
        return result;
    }

    updateProp(prop, op, key, value) {
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
    }

    propToContextStyle(defaultStyle, prop, noRawText) {
        var result = STYLE_RESULT;
        if (!prop.hasOwnProperty('img')) {
            result.image = null;

            if (prop.hasOwnProperty('family')) {
                result.fontFamily = prop.family;
            } else {
                result.fontFamily = defaultStyle.fontFamily;
            }

            if (prop.hasOwnProperty('size')) {
                result.fontSize = prop.size;
            } else {
                result.fontSize = defaultStyle.fontSize;
            }
            result.fontStyle = getFontStyle(prop.b, prop.i);

            if (prop.hasOwnProperty('color')) {
                result.color = prop.color;
            } else {
                result.color = defaultStyle.color;
            }

            if (prop.hasOwnProperty('stroke')) {
                var stroke = prop.stroke.split(' '); // yellow 1px
                result.stroke = stroke[0];
                result.strokeThickness = parseFloat(stroke[1].replace("px", ""));
            } else {
                result.stroke = defaultStyle.stroke;
                result.strokeThickness = defaultStyle.strokeThickness;
            }
        } else {
            result.image = prop.img;
        }

        if (prop.hasOwnProperty('shadow')) {
            if (prop.shadow === true) {
                result.shadowOffsetX = defaultStyle.shadowOffsetX;
                result.shadowOffsetY = defaultStyle.shadowOffsetY;
                result.shadowColor = defaultStyle.shadowColor;
                result.shadowBlur = defaultStyle.shadowBlur;
                result.shadowStroke = true;
                result.shadowFill = true;    
            } else {
                var shadow = prop.shadow.split(' ');  // 2px 2px 2px #000
                result.shadowOffsetX = parseFloat(shadow[0].replace("px", ""));
                result.shadowOffsetY = parseFloat(shadow[1].replace("px", ""));
                result.shadowColor = shadow[3];
                result.shadowBlur = parseFloat(shadow[2].replace("px", ""));
                result.shadowStroke = true;
                result.shadowFill = true;                   
            }
        } else {
            result.shadowOffsetX = 0;
            result.shadowOffsetY = 0;
            result.shadowColor = '#000';
            result.shadowBlur = 0;            
            result.shadowStroke = false;
            result.shadowFill = false;              
        }

        if (prop.hasOwnProperty('u')) {
            var underline = prop.u.split(' '); // [color, thickness, offset]
            var len = underline.length;
            result.underline[0] = (len >= 1)? underline[0] : defaultStyle.underline[0];
            result.underline[1] = (len >= 2)? parseFloat(underline[1].replace("px", "")) : defaultStyle.underline[1];
            result.underline[2] = (len >= 3)? parseFloat(underline[2].replace("px", "")) : defaultStyle.underline[2];
        } else {
            result.underline[0] = null;
        }
    }

    propToTagText(txt, prop, prevProp) {
        if (prevProp == null)
            prevProp = EMPTYPROP;

        for (var k in prevProp) {
            if (prop.hasOwnProperty(k))
                continue;

            txt = "[/" + k + "]" + txt;
        }

        var header = "";
        for (var k in prop) {
            if (prevProp[k] === prop[k])
                continue;

            if (k === "size")
                header += ("[size=" + prop[k].replace("pt", "") + "]");
            else if ((k === "color") || (k === "stroke") || (k === "img"))
                header += ("[" + k + "=" + prop[k] + "]");

            else if (k === "u") {
                if (prop[k] === true)
                    header += "[u]";
                else
                    header += ("[u=" + prop[k] + "]");
            } else
                header += ("[" + k + "]");
        }
        txt = header + txt;

        return txt;
    }
}

var getFontStyle = function (isBold, isItalic) {
    if (isBold && isItalic)
        return "bold italic";
    else if (isBold)
        return "bold";
    else if (isItalic)
        return "italic";
    else
        return "";
};

var RE_SPLITTEXT = /\[b\]|\[\/b\]|\[i\]|\[\/i\]|\[size=(\d+)\]|\[\/size\]|\[color=([a-z]+|#[0-9abcdef]+)\]|\[\/color\]|\[u\]|\[u=([a-z]+|#[0-9abcdef]+)\]|\[\/u\]|\[shadow\]|\[\/shadow\]|\[stroke=([a-z]+|#[0-9abcdef]+)\]|\[\/stroke\]|\[img=([^\]]+)\]|\[\/img\]/ig;

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
var RE_STROKE_OPEN = /\[stroke=([a-z]+|#[0-9abcdef]+)\]/i;
var RE_STROKE_CLOSE = /\[\/stroke\]/i;
var RE_IMAGE_OPEN = /\[img=([^\]]+)\]/i;
var RE_IMAGE_CLOSE = /\[\/img\]/i;
const PROP_REMOVE = false;
const PROP_ADD = true;

export default Parser;