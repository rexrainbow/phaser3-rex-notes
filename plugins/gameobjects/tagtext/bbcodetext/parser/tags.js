export const GetOpenTagRegString = function (tagName, param) {
    if (param === undefined) {
        return `\\[${tagName}\\]`;
    } else {
        return `\\[${tagName}=(${param})\\]`;
    }
}
export const GetCloseTagRegString = function (tagName) {
    return `\\[\/${tagName}\\]`;
}

export const NUMBER_PARAM = '[-.0-9]+';
export const COLOR_PARAM = '[a-z]+|#[0-9abcdef]+';
export const STR_PARAM = '[^\\]]+';

export const ESC = 'esc';
const ESC_OPEN = GetOpenTagRegString(ESC);
const ESC_CLOSE = GetCloseTagRegString(ESC);

export const RAW = 'raw';
const RAW_OPEN = GetOpenTagRegString(RAW);
const RAW_CLOSE = GetCloseTagRegString(RAW);

export const BLOD = 'b';
const BLOD_OPEN = GetOpenTagRegString(BLOD);
const BLOD_CLOSE = GetCloseTagRegString(BLOD);

export const ITALICS = 'i';
const ITALICS_OPEN = GetOpenTagRegString(ITALICS);
const ITALICS_CLOSE = GetCloseTagRegString(ITALICS);

export const WEIGHT = 'weight';
const WEIGHT_OPEN = GetOpenTagRegString(WEIGHT, NUMBER_PARAM);
const WEIGHT_CLOSE = GetCloseTagRegString(WEIGHT);

export const SIZE = 'size';
const SIZE_OPEN = GetOpenTagRegString(SIZE, NUMBER_PARAM);
const SIZE_CLOSE = GetCloseTagRegString(SIZE);

export const COLOR = 'color';
const COLOR_OPEN = GetOpenTagRegString(COLOR, COLOR_PARAM);
const COLOR_CLOSE = GetCloseTagRegString(COLOR);

export const UNDERLINE = 'u';
const UNDERLINE_OPEN = GetOpenTagRegString(UNDERLINE);
const UNDERLINE_OPENC = GetOpenTagRegString(UNDERLINE, COLOR_PARAM);
const UNDERLINE_CLOSE = GetCloseTagRegString(UNDERLINE);

export const SHADOW = 'shadow';
const SHADOW_OPEN = GetOpenTagRegString(SHADOW);
const SHADOW_CLOSE = GetCloseTagRegString(SHADOW);

export const STROKE = 'stroke';
const STROKE_OPEN = GetOpenTagRegString(STROKE);
const STROKE_OPENC = GetOpenTagRegString(STROKE, COLOR_PARAM);
const STROKE_CLOSE = GetCloseTagRegString(STROKE);

export const OFFSETY = 'y';
const OFFSETY_OPEN = GetOpenTagRegString(OFFSETY, NUMBER_PARAM);
const OFFSETY_CLOSE = GetCloseTagRegString(OFFSETY);

export const IMAGE = 'img';
const IMAGE_OPEN = GetOpenTagRegString(IMAGE, STR_PARAM);
const IMAGE_CLOSE = GetCloseTagRegString(IMAGE);

export const AREA = 'area';
const AREA_OPEN = GetOpenTagRegString(AREA, STR_PARAM);
const AREA_CLOSE = GetCloseTagRegString(AREA);

export const ALIGN = 'align';
const ALIGN_OPEN = GetOpenTagRegString(ALIGN, STR_PARAM);
const ALIGN_CLOSE = GetCloseTagRegString(ALIGN);


export const RE_ESC_OPEN = new RegExp(ESC_OPEN, 'i');
export const RE_ESC_CLOSE = new RegExp(ESC_CLOSE, 'i');

export const RE_RAW_OPEN = new RegExp(RAW_OPEN, 'i');
export const RE_RAW_CLOSE = new RegExp(RAW_CLOSE, 'i');

export const RE_BLOD_OPEN = new RegExp(BLOD_OPEN, 'i');
export const RE_BLOD_CLOSE = new RegExp(BLOD_CLOSE, 'i');

export const RE_ITALICS_OPEN = new RegExp(ITALICS_OPEN, 'i');
export const RE_ITALICS_CLOSE = new RegExp(ITALICS_CLOSE, 'i');

export const RE_WEIGHT_OPEN = new RegExp(WEIGHT_OPEN, 'i');
export const RE_WEIGHT_CLOSE = new RegExp(WEIGHT_CLOSE, 'i');

export const RE_SIZE_OPEN = new RegExp(SIZE_OPEN, 'i');
export const RE_SIZE_CLOSE = new RegExp(SIZE_CLOSE, 'i');

export const RE_COLOR_OPEN = new RegExp(COLOR_OPEN, 'i');
export const RE_COLOR_CLOSE = new RegExp(COLOR_CLOSE, 'i');

export const RE_UNDERLINE_OPEN = new RegExp(UNDERLINE_OPEN, 'i');
export const RE_UNDERLINE_OPENC = new RegExp(UNDERLINE_OPENC, 'i');
export const RE_UNDERLINE_CLOSE = new RegExp(UNDERLINE_CLOSE, 'i');

export const RE_SHADOW_OPEN = new RegExp(SHADOW_OPEN, 'i');
export const RE_SHADOW_CLOSE = new RegExp(SHADOW_CLOSE, 'i');

export const RE_STROKE_OPEN = new RegExp(STROKE_OPEN, 'i');
export const RE_STROKE_OPENC = new RegExp(STROKE_OPENC, 'i');
export const RE_STROKE_CLOSE = new RegExp(STROKE_CLOSE, 'i');

export const RE_OFFSETY_OPEN = new RegExp(OFFSETY_OPEN, 'i');
export const RE_OFFSETY_CLOSE = new RegExp(OFFSETY_CLOSE, 'i');

export const RE_IMAGE_OPEN = new RegExp(IMAGE_OPEN, 'i');
export const RE_IMAGE_CLOSE = new RegExp(IMAGE_CLOSE, 'i');

export const RE_AREA_OPEN = new RegExp(AREA_OPEN, 'i')
export const RE_AREA_CLOSE = new RegExp(AREA_CLOSE, 'i');

export const RE_ALIGN_OPEN = new RegExp(ALIGN_OPEN, 'i')
export const RE_ALIGN_CLOSE = new RegExp(ALIGN_CLOSE, 'i');

export const RE_SPLITTEXT = new RegExp([
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
