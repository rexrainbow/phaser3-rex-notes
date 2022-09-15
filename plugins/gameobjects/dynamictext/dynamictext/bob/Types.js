const CharTypeName = 'text';
const ImageTypeName = 'image';
const CmdTypeName = 'command';

var IsNewLineChar = function (bob) {
    return (bob.type === CharTypeName) && (bob.text === '\n');
}

var IsSpaceChar = function (bob) {
    return (bob.type === CharTypeName) && (bob.text === ' ');
}

var IsCommand = function (bob) {
    return bob.type === CmdTypeName;
}

export {
    CharTypeName,
    ImageTypeName,
    CmdTypeName,
    IsNewLineChar,
    IsSpaceChar,
    IsCommand
}