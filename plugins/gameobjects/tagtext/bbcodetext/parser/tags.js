var GetOpenTagRegString = function (tagName, param) {
    if (param === undefined) {
        return `\\[${tagName}\\]`;
    } else {
        return `\\[${tagName}=(${param})\\]`;
    }
}
var GetCloseTagRegString = function (tagName) {
    return `\\[\/${tagName}\\]`;
}

const NUMBER_PARAM = '[-.0-9]+';
const COLOR_PARAM = '[a-z]+|#[0-9abcdef]+';
const STR_PARAM = '[^\\]]+';

const ESC = 'esc';
const ESC_OPEN = GetOpenTagRegString(ESC);
const ESC_CLOSE = GetCloseTagRegString(ESC);

const RAW = 'raw';
const RAW_OPEN = GetOpenTagRegString(RAW);
const RAW_CLOSE = GetCloseTagRegString(RAW);

const BLOD = 'b';
const BLOD_OPEN = GetOpenTagRegString(BLOD);
const BLOD_CLOSE = GetCloseTagRegString(BLOD);

const ITALICS = 'i';
const ITALICS_OPEN = GetOpenTagRegString(ITALICS);
const ITALICS_CLOSE = GetCloseTagRegString(ITALICS);

const WEIGHT = 'weight';
const WEIGHT_OPEN = GetOpenTagRegString(WEIGHT, NUMBER_PARAM);
const WEIGHT_CLOSE = GetCloseTagRegString(WEIGHT);

const SIZE = 'size';
const SIZE_OPEN = GetOpenTagRegString(SIZE, NUMBER_PARAM);
const SIZE_CLOSE = GetCloseTagRegString(SIZE);

const COLOR = 'color';
const COLOR_OPEN = GetOpenTagRegString(COLOR, COLOR_PARAM);
const COLOR_CLOSE = GetCloseTagRegString(COLOR);

const UNDERLINE = 'u';
const UNDERLINE_OPEN = GetOpenTagRegString(UNDERLINE);
const UNDERLINE_OPENC = GetOpenTagRegString(UNDERLINE, COLOR_PARAM);
const UNDERLINE_CLOSE = GetCloseTagRegString(UNDERLINE);

const SHADOW = 'shadow';
const SHADOW_OPEN = GetOpenTagRegString(SHADOW);
const SHADOW_CLOSE = GetCloseTagRegString(SHADOW);

const STROKE = 'stroke';
const STROKE_OPEN = GetOpenTagRegString(STROKE);
const STROKE_OPENC = GetOpenTagRegString(STROKE, COLOR_PARAM);
const STROKE_CLOSE = GetCloseTagRegString(STROKE);

const OFFSETY = 'y';
const OFFSETY_OPEN = GetOpenTagRegString(OFFSETY, NUMBER_PARAM);
const OFFSETY_CLOSE = GetCloseTagRegString(OFFSETY);

const IMAGE = 'img';
const IMAGE_OPEN = GetOpenTagRegString(IMAGE, STR_PARAM);
const IMAGE_CLOSE = GetCloseTagRegString(IMAGE);

const AREA = 'area';
const AREA_OPEN = GetOpenTagRegString(AREA, STR_PARAM);
const AREA_CLOSE = GetCloseTagRegString(AREA);

const ALIGN = 'align';
const ALIGN_OPEN = GetOpenTagRegString(ALIGN, STR_PARAM);
const ALIGN_CLOSE = GetCloseTagRegString(ALIGN);


const RE_ESC_OPEN = new RegExp(ESC_OPEN, 'i');
const RE_ESC_CLOSE = new RegExp(ESC_CLOSE, 'i');

const RE_RAW_OPEN = new RegExp(RAW_OPEN, 'i');
const RE_RAW_CLOSE = new RegExp(RAW_CLOSE, 'i');

const RE_BLOD_OPEN = new RegExp(BLOD_OPEN, 'i');
const RE_BLOD_CLOSE = new RegExp(BLOD_CLOSE, 'i');

const RE_ITALICS_OPEN = new RegExp(ITALICS_OPEN, 'i');
const RE_ITALICS_CLOSE = new RegExp(ITALICS_CLOSE, 'i');

const RE_WEIGHT_OPEN = new RegExp(WEIGHT_OPEN, 'i');
const RE_WEIGHT_CLOSE = new RegExp(WEIGHT_CLOSE, 'i');

const RE_SIZE_OPEN = new RegExp(SIZE_OPEN, 'i');
const RE_SIZE_CLOSE = new RegExp(SIZE_CLOSE, 'i');

const RE_COLOR_OPEN = new RegExp(COLOR_OPEN, 'i');
const RE_COLOR_CLOSE = new RegExp(COLOR_CLOSE, 'i');

const RE_UNDERLINE_OPEN = new RegExp(UNDERLINE_OPEN, 'i');
const RE_UNDERLINE_OPENC = new RegExp(UNDERLINE_OPENC, 'i');
const RE_UNDERLINE_CLOSE = new RegExp(UNDERLINE_CLOSE, 'i');

const RE_SHADOW_OPEN = new RegExp(SHADOW_OPEN, 'i');
const RE_SHADOW_CLOSE = new RegExp(SHADOW_CLOSE, 'i');

const RE_STROKE_OPEN = new RegExp(STROKE_OPEN, 'i');
const RE_STROKE_OPENC = new RegExp(STROKE_OPENC, 'i');
const RE_STROKE_CLOSE = new RegExp(STROKE_CLOSE, 'i');

const RE_OFFSETY_OPEN = new RegExp(OFFSETY_OPEN, 'i');
const RE_OFFSETY_CLOSE = new RegExp(OFFSETY_CLOSE, 'i');

const RE_IMAGE_OPEN = new RegExp(IMAGE_OPEN, 'i');
const RE_IMAGE_CLOSE = new RegExp(IMAGE_CLOSE, 'i');

const RE_AREA_OPEN = new RegExp(AREA_OPEN, 'i')
const RE_AREA_CLOSE = new RegExp(AREA_CLOSE, 'i');

const RE_ALIGN_OPEN = new RegExp(ALIGN_OPEN, 'i')
const RE_ALIGN_CLOSE = new RegExp(ALIGN_CLOSE, 'i');

const RE_SPLITTEXT = new RegExp([
    RAW_OPEN, RAW_CLOSE,
    ESC_OPEN, ESC_CLOSE,

    BLOD_OPEN, BLOD_CLOSE,
    ITALICS_OPEN, ITALICS_CLOSE,
    WEIGHT_OPEN, WEIGHT_CLOSE,

    SIZE_OPEN, SIZE_CLOSE,
    COLOR_OPEN, COLOR_CLOSE,
    UNDERLINE_OPEN, UNDERLINE_OPENC, UNDERLINE_CLOSE,
    SHADOW_OPEN, SHADOW_CLOSE,
    STROKE_OPEN, STROKE_OPENC, STROKE_CLOSE,
    OFFSETY_OPEN, OFFSETY_CLOSE,
    IMAGE_OPEN, IMAGE_CLOSE,
    AREA_OPEN, AREA_CLOSE,
    ALIGN_OPEN, ALIGN_CLOSE
].join('|'), 'ig');


export {
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
    RE_ALIGN_OPEN, RE_ALIGN_CLOSE,

    RE_SPLITTEXT,

    GetOpenTagRegString, GetCloseTagRegString,
    NUMBER_PARAM, COLOR_PARAM, STR_PARAM
}