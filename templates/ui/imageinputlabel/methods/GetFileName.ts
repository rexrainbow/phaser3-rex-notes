var GetFileName = function(file?: any) {
    if (!file) {
        return null;
    }

    var name = file.name;
    return name.substr(0, name.lastIndexOf('.'));
}

export default GetFileName;