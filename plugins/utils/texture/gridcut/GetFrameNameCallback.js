var GetFrameNameCallback = function (baseFrameName, delimiter) {
    if (typeof (baseFrameName) === 'object') {
        baseFrameName = baseFrameName.name;
    }

    if (delimiter === undefined) {
        delimiter = ',';
    }

    var callback;
    if (baseFrameName === '__BASE') {
        callback = function (colIndex, rowIndex) {
            return `${colIndex}${delimiter}${rowIndex}`;
        }
    } else {
        callback = function (colIndex, rowIndex) {
            return `${baseFrameName}_${colIndex}${delimiter}${rowIndex}`;
        }
    }

    return callback;
}
export default GetFrameNameCallback;