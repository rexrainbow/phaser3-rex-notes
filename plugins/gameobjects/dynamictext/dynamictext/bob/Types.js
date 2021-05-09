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

var IsCommand = function (bob) {
    return bob.type === CmdTypeName;
}

export {
    CharTypeName,
    ImageTypeName,
    CmdTypeName,
    IsTypeable,
    IsNewLineChar,
    IsCommand
}