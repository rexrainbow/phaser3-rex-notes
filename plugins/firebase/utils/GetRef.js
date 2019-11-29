var GetRef = function (rootPath, k) {
    if (k === undefined) {
        k = "";
    }
    var path;
    if (isFullPath(k)) {
        path = k;
    } else {
        path = `${rootPath}/${k}/`;
    }

    var fnName = (isFullPath(path)) ? 'refFromURL' : 'ref';
    return window.Firebase.database()[fnName](path);
}

var isFullPath = function (p) {
    return (p.substring(0, 8) === "https://");
};

export default GetRef;