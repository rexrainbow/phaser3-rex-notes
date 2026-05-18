const CharTypeName = 'text';
const ImageTypeName = 'image';
const DrawerTypeName = 'drawer';
const SpaceTypeName = 'space';
const CmdTypeName = 'command';

var IsNewLineChar = function(bob?: any) {
    return (bob.type === CharTypeName) && (bob.text === '\n');
}

var IsPageBreakChar = function(bob?: any) {
    return (bob.type === CharTypeName) && (bob.text === '\f');
}

var IsSpaceChar = function(bob?: any) {
    return (bob.type === CharTypeName) && (bob.text === ' ');
}

var IsChar = function(bob?: any) {
    return (bob.type === CharTypeName);
}

var IsCommand = function(bob?: any) {
    return bob.type === CmdTypeName;
}

export {
    CharTypeName,
    ImageTypeName,
    DrawerTypeName,
    SpaceTypeName,
    CmdTypeName,
    IsNewLineChar,
    IsPageBreakChar,
    IsSpaceChar,
    IsChar,
    IsCommand
}