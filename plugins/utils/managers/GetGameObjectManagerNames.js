var GetGameObjectManagerNames = function () {
    var names = [];
    for (var name in this.gameObjectManagers) {
        names.push(name);
    }
    return names;
}

export default GetGameObjectManagerNames;