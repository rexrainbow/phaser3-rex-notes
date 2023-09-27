var GetFileName = function (file) {
    if (!file) {
        return null;
    }

    var name = file.name;
    return name.substr(0, name.lastIndexOf('.'));
}

export default GetFileName;