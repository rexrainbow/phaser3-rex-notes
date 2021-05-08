const CharTypeName = 'text';
const ImageTypeName = 'image';
const CmdTypeName = 'command';

var IsTypeable = function (bob) {
    var bobType = bob.type;
    return (bobType === CharTypeName) || (bobType === ImageTypeName);
}

var IsNewLineChar = function (bob) {
    return (bob.type === CharTypeName) && (bob.text === '\n');
}

export {
    CharTypeName,
    ImageTypeName,
    CmdTypeName,
    IsTypeable,
    IsNewLineChar
}