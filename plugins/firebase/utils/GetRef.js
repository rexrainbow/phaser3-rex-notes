var GetRef = function (database, rootPath, k) {
    var path = (k === undefined) ? rootPath : `${rootPath}/${k}`;
    return database.ref(path);
}
export default GetRef;