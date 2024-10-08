import EscapeRegex from '../../../../utils/string/EscapeRegex.js';

var DelimiterLeftSave;
var DelimiterRightSave;
var TagRegexSave = {};

var GetOpenTagRegString = function (delimiterLeft, delimiterRight, tagName, param) {
    if (param === undefined) {
        return `${delimiterLeft}${tagName}${delimiterRight}`;
    } else {
        return `${delimiterLeft}${tagName}=(${param})${delimiterRight}`;
    }
}
var GetCloseTagRegString = function (delimiterLeft, delimiterRight, tagName) {
    return `${delimiterLeft}\/${tagName}${delimiterRight}`;
}

var GenerateStringRegEx = function (delimiterRight) {
    return `[^${delimiterRight}]+`
}
var NUMBER_PARAM = '[-.0-9]+';

var colorParameterList = [
    '[a-zA-Z]+',      // 'white'
    '#[0-9abcdef]+',  // '#FFFFFF'
    'rgba?\\(\s*[.0-9]+\s*(,\s*[.0-9]+\s*){2,3}\\)',  // rgb(255,255,255), or rgba(255,255,255,1)
]
var COLOR_PARAM = colorParameterList.join('|');  // '[a-z]+|#[0-9abcdef]+'

var SetDelimiters = function (delimiterLeft, delimiterRight) {
    if (delimiterRight === undefined) {
        var delimeters = delimiterLeft;
        delimiterLeft = delimeters[0];
        delimiterRight = delimeters[1];
    }

    if ((DelimiterLeftSave === delimiterLeft) && (DelimiterRightSave === delimiterRight)) {
        return false;
    }

    DelimiterLeftSave = delimiterLeft;
    DelimiterRightSave = delimiterRight;

    delimiterLeft = EscapeRegex(delimiterLeft);
    delimiterRight = EscapeRegex(delimiterRight);

    var STR_PARAM = GenerateStringRegEx(delimiterRight);

    var ESC = 'esc';
    var ESC_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, ESC);
    var ESC_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, ESC);

    var RAW = 'raw';
    var RAW_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, RAW);
    var RAW_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, RAW);

    var BLOD = 'b';
    var BLOD_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, BLOD);
    var BLOD_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, BLOD);

    var ITALICS = 'i';
    var ITALICS_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, ITALICS);
    var ITALICS_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, ITALICS);

    var WEIGHT = 'weight';
    var WEIGHT_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, WEIGHT, NUMBER_PARAM);
    var WEIGHT_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, WEIGHT);

    var SIZE = 'size';
    var SIZE_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, SIZE, NUMBER_PARAM);
    var SIZE_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, SIZE);

    var FAMILY = 'family';
    var FAMILY_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, FAMILY, STR_PARAM);
    var FAMILY_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, FAMILY);

    var COLOR = 'color';
    var COLOR_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, COLOR, COLOR_PARAM);
    var COLOR_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, COLOR);

    var UNDERLINE = 'u';
    var UNDERLINE_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, UNDERLINE);
    var UNDERLINE_OPENC = GetOpenTagRegString(delimiterLeft, delimiterRight, UNDERLINE, COLOR_PARAM);
    var UNDERLINE_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, UNDERLINE);

    var STRIKETHROUGH = 's';
    var STRIKETHROUGH_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, STRIKETHROUGH);
    var STRIKETHROUGH_OPENC = GetOpenTagRegString(delimiterLeft, delimiterRight, STRIKETHROUGH, COLOR_PARAM);
    var STRIKETHROUGH_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, STRIKETHROUGH);

    var SHADOW = 'shadow';
    var SHADOW_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, SHADOW);
    var SHADOW_OPENC = GetOpenTagRegString(delimiterLeft, delimiterRight, SHADOW, COLOR_PARAM);
    var SHADOW_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, SHADOW);

    var STROKE = 'stroke';
    var STROKE_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, STROKE);
    var STROKE_OPENC = GetOpenTagRegString(delimiterLeft, delimiterRight, STROKE, COLOR_PARAM);
    var STROKE_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, STROKE);

    var BGCOLOR = 'bgcolor';
    var BGCOLOR_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, BGCOLOR, COLOR_PARAM);
    var BGCOLOR_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, BGCOLOR);

    var OFFSETY = 'y';
    var OFFSETY_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, OFFSETY, NUMBER_PARAM);
    var OFFSETY_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, OFFSETY);

    var IMAGE = 'img';
    var IMAGE_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, IMAGE, STR_PARAM);
    var IMAGE_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, IMAGE);

    var AREA = 'area';
    var AREA_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, AREA, STR_PARAM);
    var AREA_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, AREA);

    var URL = 'url';
    var URL_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, URL, STR_PARAM);
    var URL_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, URL);

    var ALIGN = 'align';
    var ALIGN_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, ALIGN, STR_PARAM);
    var ALIGN_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, ALIGN);

    var ID = 'id';
    var ID_OPEN = GetOpenTagRegString(delimiterLeft, delimiterRight, ID, STR_PARAM);
    var ID_CLOSE = GetCloseTagRegString(delimiterLeft, delimiterRight, ID);

    TagRegexSave.RE_ESC_OPEN = new RegExp(ESC_OPEN, 'i');
    TagRegexSave.RE_ESC_CLOSE = new RegExp(ESC_CLOSE, 'i');

    TagRegexSave.RE_RAW_OPEN = new RegExp(RAW_OPEN, 'i');
    TagRegexSave.RE_RAW_CLOSE = new RegExp(RAW_CLOSE, 'i');

    TagRegexSave.RE_BLOD_OPEN = new RegExp(BLOD_OPEN, 'i');
    TagRegexSave.RE_BLOD_CLOSE = new RegExp(BLOD_CLOSE, 'i');

    TagRegexSave.RE_ITALICS_OPEN = new RegExp(ITALICS_OPEN, 'i');
    TagRegexSave.RE_ITALICS_CLOSE = new RegExp(ITALICS_CLOSE, 'i');

    TagRegexSave.RE_WEIGHT_OPEN = new RegExp(WEIGHT_OPEN, 'i');
    TagRegexSave.RE_WEIGHT_CLOSE = new RegExp(WEIGHT_CLOSE, 'i');

    TagRegexSave.RE_SIZE_OPEN = new RegExp(SIZE_OPEN, 'i');
    TagRegexSave.RE_SIZE_CLOSE = new RegExp(SIZE_CLOSE, 'i');

    TagRegexSave.RE_FAMILY_OPEN = new RegExp(FAMILY_OPEN, 'i');
    TagRegexSave.RE_FAMILY_CLOSE = new RegExp(FAMILY_CLOSE, 'i');

    TagRegexSave.RE_COLOR_OPEN = new RegExp(COLOR_OPEN, 'i');
    TagRegexSave.RE_COLOR_CLOSE = new RegExp(COLOR_CLOSE, 'i');

    TagRegexSave.RE_UNDERLINE_OPEN = new RegExp(UNDERLINE_OPEN, 'i');
    TagRegexSave.RE_UNDERLINE_OPENC = new RegExp(UNDERLINE_OPENC, 'i');
    TagRegexSave.RE_UNDERLINE_CLOSE = new RegExp(UNDERLINE_CLOSE, 'i');

    TagRegexSave.RE_STRIKETHROUGH_OPEN = new RegExp(STRIKETHROUGH_OPEN, 'i');
    TagRegexSave.RE_STRIKETHROUGH_OPENC = new RegExp(STRIKETHROUGH_OPENC, 'i');
    TagRegexSave.RE_STRIKETHROUGH_CLOSE = new RegExp(STRIKETHROUGH_CLOSE, 'i');

    TagRegexSave.RE_SHADOW_OPEN = new RegExp(SHADOW_OPEN, 'i');
    TagRegexSave.RE_SHADOW_OPENC = new RegExp(SHADOW_OPENC, 'i');
    TagRegexSave.RE_SHADOW_CLOSE = new RegExp(SHADOW_CLOSE, 'i');

    TagRegexSave.RE_STROKE_OPEN = new RegExp(STROKE_OPEN, 'i');
    TagRegexSave.RE_STROKE_OPENC = new RegExp(STROKE_OPENC, 'i');
    TagRegexSave.RE_STROKE_CLOSE = new RegExp(STROKE_CLOSE, 'i');

    TagRegexSave.RE_BGCOLOR_OPEN = new RegExp(BGCOLOR_OPEN, 'i');
    TagRegexSave.RE_BGCOLOR_CLOSE = new RegExp(BGCOLOR_CLOSE, 'i');

    TagRegexSave.RE_OFFSETY_OPEN = new RegExp(OFFSETY_OPEN, 'i');
    TagRegexSave.RE_OFFSETY_CLOSE = new RegExp(OFFSETY_CLOSE, 'i');

    TagRegexSave.RE_IMAGE_OPEN = new RegExp(IMAGE_OPEN, 'i');
    TagRegexSave.RE_IMAGE_CLOSE = new RegExp(IMAGE_CLOSE, 'i');

    TagRegexSave.RE_AREA_OPEN = new RegExp(AREA_OPEN, 'i')
    TagRegexSave.RE_AREA_CLOSE = new RegExp(AREA_CLOSE, 'i');

    TagRegexSave.RE_URL_OPEN = new RegExp(URL_OPEN, 'i')
    TagRegexSave.RE_URL_CLOSE = new RegExp(URL_CLOSE, 'i');

    TagRegexSave.RE_ALIGN_OPEN = new RegExp(ALIGN_OPEN, 'i')
    TagRegexSave.RE_ALIGN_CLOSE = new RegExp(ALIGN_CLOSE, 'i');

    TagRegexSave.RE_ID_OPEN = new RegExp(ID_OPEN, 'i')
    TagRegexSave.RE_ID_CLOSE = new RegExp(ID_CLOSE, 'i');

    TagRegexSave.RE_SPLITTEXT = new RegExp([
        RAW_OPEN, RAW_CLOSE,
        ESC_OPEN, ESC_CLOSE,

        BLOD_OPEN, BLOD_CLOSE,
        ITALICS_OPEN, ITALICS_CLOSE,
        WEIGHT_OPEN, WEIGHT_CLOSE,

        SIZE_OPEN, SIZE_CLOSE,
        FAMILY_OPEN, FAMILY_CLOSE,
        COLOR_OPEN, COLOR_CLOSE,
        UNDERLINE_OPEN, UNDERLINE_OPENC, UNDERLINE_CLOSE,
        STRIKETHROUGH_OPEN, STRIKETHROUGH_OPENC, STRIKETHROUGH_CLOSE,
        SHADOW_OPEN, SHADOW_OPENC, SHADOW_CLOSE,
        STROKE_OPEN, STROKE_OPENC, STROKE_CLOSE,
        BGCOLOR_OPEN, BGCOLOR_CLOSE,
        OFFSETY_OPEN, OFFSETY_CLOSE,
        IMAGE_OPEN, IMAGE_CLOSE,
        AREA_OPEN, AREA_CLOSE,
        URL_OPEN, URL_CLOSE,
        ALIGN_OPEN, ALIGN_CLOSE,
        ID_OPEN, ID_CLOSE
    ].join('|'), 'ig');

    return true;
}

var GetTagRegex = function (delimiterLeft, delimiterRight) {
    if (delimiterLeft !== undefined) {
        SetDelimiters(delimiterLeft, delimiterRight);
    }

    return Object.assign({}, TagRegexSave);
}

export {
    SetDelimiters,
    GetTagRegex,
}