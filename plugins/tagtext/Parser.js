import TextStyle from './../utils/text/TextStyle.js';

var GETPROP_RESULT = {
    rawText: null,
    prevProp: null
};

var STYLE_RESULT = new TextStyle();
var PROPLIST = [];

class parser {
    constructor(tags) {
        if (tags === undefined) {
            tags = {};
        }
        this.tags = tags;
    }

    addTag(name, prop) {
        this.tags[name] = prop;
    }

    splitText(text, mode) {
        var result = [];
        var arr, m, charIdx = 0,
            totalLen = text.length,
            matchStart = totalLen;
        var innerMatch;
        while (true) {
            arr = RE_SPLITTEXT.exec(text);
            if (!arr) {
                break;
            }


            m = arr[0];
            matchStart = RE_SPLITTEXT.lastIndex - m.length;

            if (charIdx < matchStart) {
                result.push(text.substring(charIdx, matchStart));

            }
            if (mode === undefined) {
                result.push(m);
            } else if (mode === 1) { // RAWTEXTONLY_MODE
                if (RE_CLASS_HEADER.test(m)) {
                    innerMatch = m.match(RE_CLASS);
                    result.push(innerMatch[2]);
                }
            }

            charIdx = RE_SPLITTEXT.lastIndex;
        }


        if (charIdx < totalLen) {
            result.push(text.substring(charIdx, totalLen));
        }
        return result; // [text,...]
    }

    tagTextToProp(text, prevProp) {
        var rawText, propOut;
        if (RE_CLASS_HEADER.test(text)) {
            var innerMatch = text.match(RE_CLASS);
            if (innerMatch != null) {
                var name = innerMatch[1];
                var tags = this.tags;
                if (tags.hasOwnProperty(name)) {
                    propOut = tags[name];
                } else {
                    propOut = {};
                }                
                propOut.class = name;
                rawText = innerMatch[2];
            }
        }

        if (rawText == null) {
            rawText = text;
        }

        if (propOut == null) {
            propOut = {};
        }

        var result = GETPROP_RESULT;
        result.rawText = rawText;
        result.prop = propOut;
        return result;
    }

    propToContextStyle(defaultStyle, prop) {
        var result = STYLE_RESULT;
        if (!prop.hasOwnProperty('img')) {
            result.image = null;

            if (prop.hasOwnProperty('family') || prop.hasOwnProperty('font-family')) {
                var family = (prop.hasOwnProperty('family')) ? prop.family : prop['font-family'];
                result.fontFamily = prop.family;
            } else {
                result.fontFamily = defaultStyle.fontFamily;
            }

            if (prop.hasOwnProperty('size') || prop.hasOwnProperty('font-size')) {
                var size = (prop.hasOwnProperty('size')) ? prop.size : prop['font-size'];
                if (typeof (size) === 'number') {
                    size = size.toString() + 'px';
                }
                result.fontSize = size;
            } else {
                result.fontSize = defaultStyle.fontSize;
            }

            if (prop.hasOwnProperty('style') || prop.hasOwnProperty('fontStyle') || prop.hasOwnProperty('font-style')) {
                var fontStyle = (prop.hasOwnProperty('style')) ? prop.style :
                    (prop.hasOwnProperty('fontStyle')) ? prop.fontStyle :
                    prop['font-style'];
                result.fontStyle = fontStyle;
            } else {
                result.fontStyle = defaultStyle.fontStyle;
            }

            if (prop.hasOwnProperty('color') || prop.hasOwnProperty('font-color')) {
                var color = (prop.hasOwnProperty('color')) ? prop.color : prop['font-color'];
                result.color = prop.color;
            } else {
                result.color = defaultStyle.color;
            }

            if (prop.hasOwnProperty('stroke')) {
                var stroke = prop.stroke; // {color, thinkness}
                result.stroke = (stroke.hasOwnProperty('color')) ? stroke.color : defaultStyle.stroke;
                result.strokeThickness = (stroke.hasOwnProperty('thinkness')) ? stroke.thinkness : defaultStyle.strokeThickness;
            } else {
                result.stroke = defaultStyle.stroke;
                result.strokeThickness = defaultStyle.strokeThickness;
            }
        } else {
            result.image = prop.img;
        }

        if (prop.hasOwnProperty('shadow')) {
            var shadow = prop.shadow; // {color, offsetX, offsetY, blur}
            result.shadowColor = (shadow.hasOwnProperty('color')) ? shadow.color : defaultStyle.shadowColor;
            result.shadowOffsetX = (shadow.hasOwnProperty('offsetX')) ? shadow.offsetX : defaultStyle.shadowOffsetX;
            result.shadowOffsetY = (shadow.hasOwnProperty('offsetY')) ? shadow.offsetY : defaultStyle.shadowOffsetY;
            result.shadowBlur = (shadow.hasOwnProperty('blur')) ? shadow.blur : defaultStyle.shadowBlur;
            result.shadowStroke = true;
            result.shadowFill = true;
        } else {
            result.shadowColor = defaultStyle.shadowColor;
            result.shadowOffsetX = defaultStyle.shadowOffsetX;
            result.shadowOffsetY = defaultStyle.shadowOffsetY;
            result.shadowBlur = defaultStyle.shadowBlur;
            result.shadowStroke = defaultStyle.shadowStroke;
            result.shadowFill = defaultStyle.shadowFill;
        }

        if (prop.hasOwnProperty('u') || prop.hasOwnProperty('underline')) {
            var u = (prop.hasOwnProperty('u')) ? prop.u : prop.underline; // {color, thinkness, offset}
            result.underlineColor = (u.hasOwnProperty('color')) ? u.color : defaultStyle.underlineColor;
            result.underlineThickness = (u.hasOwnProperty('thinkness')) ? u.thinkness : defaultStyle.underlineThickness;
            result.underlineOffset = (u.hasOwnProperty('offset')) ? u.offset : defaultStyle.underlineOffset;
        } else {
            result.underlineColor = defaultStyle.underlineColor;
            result.underlineThickness = defaultStyle.underlineThickness;
            result.underlineOffset = defaultStyle.underlineOffset;
        }

        return result;
    }

    propToTagText(text, prop, prevProp) {
        if (prop.hasOwnProperty('class')) { // class mode
            text = "<class='" + prop.class + "'>" + text + "</class>";
        }
        return text;
    }

    destroy() {
        this.tags = undefined;
    }
};

var RE_SPLITTEXT = /<\s*class=["|']([^"|']+)["|']\s*\>([\s\S]*?)<\s*\/class\s*\>/g;
var RE_CLASS_HEADER = /<\s*class=/i;
var RE_CLASS = /<\s*class=["|']([^"|']+)["|']\s*\>([\s\S]*?)<\s*\/class\s*\>/;

export default parser;