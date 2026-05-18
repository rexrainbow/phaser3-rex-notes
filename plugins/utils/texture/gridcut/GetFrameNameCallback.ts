var GetFrameNameCallback = function(baseFrameName?: any, delimiter?: any) {
    if (typeof (baseFrameName) === 'object') {
        baseFrameName = baseFrameName.name;
    }

    if (delimiter === undefined) {
        delimiter = ',';
    }

    var callback;
    if (baseFrameName === '__BASE') {
        callback = function(colIndex?: any, rowIndex?: any) {
            return `${colIndex}${delimiter}${rowIndex}`;
        }
    } else {
        callback = function(colIndex?: any, rowIndex?: any) {
            return `${baseFrameName}_${colIndex}${delimiter}${rowIndex}`;
        }
    }

    return callback;
}
export default GetFrameNameCallback;