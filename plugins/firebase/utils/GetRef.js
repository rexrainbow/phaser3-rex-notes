var GetRef = function (database, rootPath, k) {
    return database.ref(`${rootPath}/${k}`);
}
export default GetRef;