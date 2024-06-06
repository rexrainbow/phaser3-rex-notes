var EventKeyCodeToP3Key = function (event) {
    var code = event.code.toUpperCase();

    if (code in KeyCodeMap) {
        return KeyCodeMap[code];
    }

    if (code.startsWith('KEY')) {
        code = code.substring('KEY'.length);
        return code;
    }
    if (code.startsWith('ARROW')) {
        code = code.substring('ARROW'.length);
        return code;
    }
    if (code.startsWith('DIGIT')) {
        code = code.substring('DIGIT'.length);
        code = KeyCodeMap[code];
        return code;
    }
    if (code.startsWith('NUMPAD')) {
        code = code.substring('NUMPAD'.length);
        if (code in KeyCodeMap) {
            code = KeyCodeMap[code];
        }
        return `NUMPAD_${code}`
    }
    if (code.startsWith('SHIFT')) {
        return 'SHIFT';
    }
    if (code.startsWith('CONTROL')) {
        return 'CTRL';
    }
    if (code.startsWith('ALT')) {
        return 'ALT';
    }

    return code;
}

const KeyCodeMap = {
    '0': 'ZERO', '1': 'ONE', '2': 'TWO', '3': 'THREE', '4': 'FOUR',
    '5': 'FIVE', '6': 'SIX', '7': 'SEVEN', '8': 'EIGHT', '9': 'NINE',

    'CAPSLOCK': 'CAPS_LOCK',
    'ESCAPE': 'ESC',
    'PAGEUP': 'PAGE_UP', 'PAGEDOWN': 'PAGE_DOWN',

    'QUOTE': 'QUOTES', 'BACKQUOTE': 'BACKTICK',
    'BRACKETLEFT': 'OPEN_BRACKET', 'BRACKETRIGHT': 'CLOSED_BRACKET',
    'SEMICOLON': 'COLON',
    'SLASH': 'FORWARD_SLASH', 'BACKSLASH': 'BACK_SLASH',


}

export default EventKeyCodeToP3Key;