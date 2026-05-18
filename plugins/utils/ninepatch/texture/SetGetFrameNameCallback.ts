var SetGetFrameNameCallback = function(callback?: any) {
    if (callback === undefined) {
        callback = DefaultGetFrameNameCallback;
    }
    this.getFrameNameCallback = callback;
    return this;
}

var DefaultGetFrameNameCallback = function(colIndex?: any, rowIndex?: any, baseFrameName?: any) {
    if (baseFrameName === '__BASE') {
        return `${colIndex},${rowIndex}`;
    } else {
        return `${baseFrameName}:${colIndex},${rowIndex}`;
    }
}

export default SetGetFrameNameCallback;