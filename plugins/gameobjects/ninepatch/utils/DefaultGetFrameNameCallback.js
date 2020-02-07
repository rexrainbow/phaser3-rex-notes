const DefaultBaseFrameName = '__BASE';

var GetFrameNameCallback = function (colIndex, rowIndex, baseFrameName) {
    if (baseFrameName === DefaultBaseFrameName) {
        return `${colIndex},${rowIndex}`;
    } else {
        return `${baseFrameName}_${colIndex},${rowIndex}`;
    }
}

export default GetFrameNameCallback;